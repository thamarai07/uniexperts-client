import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
	Button,
	Dialog,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
	addApplicationPayments,
	getApplicationPayments,
} from "apis/application";
import { getCurrencies } from "apis/payment";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import * as Yup from "yup";

const tableHead = [
	"",
	"Payment Name",
	"Application ID",
	"Currency",
	"Amount",
	"Date",
];

const validationSchema = Yup.object({
	paymentName: Yup.string().required("Required"),
	currency: Yup.string().nullable().required("Required"),
	amount: Yup.number()
		.required("Required")
		.test("Is positive?", "Amount must be greater than 0", value => value > 0),
});

const Payment = ({ applicationId, selectedCurrency }) => {
	const initialValues = {
		paymentName: "",
		currency: selectedCurrency,
		amount: "",
	};

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [paymentList, setPaymentList] = useState([]);
	const [currencyList, setCurrencyList] = useState([]);

	useEffect(() => {
		_fetchData();
	}, []);

	useEffect(() => {
		getCurrencies().then(setCurrencyList);
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));
		getApplicationPayments(applicationId)
			.then(setPaymentList)
			.finally(dispatch(setLoader(false)));
	};

	const onSubmit = values => {
		dispatch(setLoader(true));

		const reqData = {
			paymentName: values?.paymentName,
			currency: values?.currency,
			amount: values?.amount,
			date: new Date(),
		};

		addApplicationPayments({ applicationId, data: reqData })
			.then(() => {
				_fetchData();
				setOpen(false);
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{tableHead?.map(label => (
									<TableCell key={label} sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{paymentList?.length ? (
								paymentList?.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.paymentName ?? "N/A"}</TableCell>

										<TableCell>{row?.application ?? "N/A"}</TableCell>

										<TableCell>{row?.currency?.symbol ?? "N/A"}</TableCell>

										<TableCell>{row?.amount ?? "N/A"}</TableCell>

										<TableCell>{format(new Date(row?.date), "PPp")}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow
									key='no-data'
									style={{
										height: "10rem",
									}}>
									<TableCell colSpan={tableHead.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<Box display='flex' justifyContent='flex-end' mt='1rem'>
					<Button
						variant='outlined'
						size='small'
						startIcon={<AddIcon />}
						onClick={() => setOpen(true)}
						sx={{
							borderColor: "#f37b21 !important",
							color: "#f37b21 !important",
							textTransform: "none",
						}}>
						Add More
					</Button>
				</Box>
			</Box>

			<Dialog
				open={open}
				PaperProps={{
					sx: {
						width: { xs: "100%", sm: "80vw" },
						height: { xs: "100%", sm: "auto" },
						maxWidth: "unset",
						maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
						m: 0,
					},
				}}
				onClose={() => {
					setOpen(close);
				}}>
				<Box
					p='1rem 2rem'
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='100%'>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						<Form>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								gap='1rem'>
								<Box display='flex' alignItems='center' gap='1rem'>
									<Typography
										fontSize='1.2rem'
										fontWeight={500}
										color='#f37b21'>
										Add Payment
									</Typography>

									<Button
										type='submit'
										sx={{
											bgcolor: "#F37B21 !important",
											textTransform: "none",
										}}
										variant='contained'
										size='small'
										startIcon={<SaveIcon />}>
										Save
									</Button>
								</Box>

								<IconButton
									onClick={() => {
										setOpen(close);
									}}
									sx={{ p: 0 }}>
									<CloseIcon />
								</IconButton>
							</Box>

							<Grid container spacing={1} mt={0}>
								<Grid item xs={12} sm={6}>
									<FieldInput name='paymentName' label='Payment Name' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<Field name='currency'>
										{props => {
											const { field, meta } = props || {};

											return (
												<DropdownWithSearch
													disabled
													name={field.name}
													value={field.value}
													placeholder='Currency'
													options={currencyList?.map(({ symbol }) => symbol)}
													renderOption={(props, option) => {
														const selectedOption = currencyList?.filter(
															({ symbol }) => symbol === option
														)[0];

														return (
															<li {...props}>
																<Typography fontSize='0.75rem'>
																	{`${selectedOption?.sign} ${selectedOption?.name}`}
																</Typography>
															</li>
														);
													}}
													getOptionLabel={option => {
														const selectedOption = currencyList?.filter(
															({ symbol }) => symbol === option
														)[0];

														return `${selectedOption?.sign} ${selectedOption?.name}`;
													}}
													handleOnChange={({ key, value }) => {
														field.onChange({ target: { name: key, value } });
													}}
													inputProps={{
														error: meta.touched && meta.error ? true : false,
														helperText:
															meta.touched && meta.error ? meta.error : null,
													}}
												/>
											);
										}}
									</Field>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput type='number' name='amount' label='Amount' />
								</Grid>
							</Grid>
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default Payment;
