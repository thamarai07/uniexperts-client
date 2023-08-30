import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
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
import { addBranch, getBranch, updateBranchStatus } from "apis/branch";
import { getPincodeData } from "apis/geography";
import CustomSwitch from "components/CustomSwitch";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import * as Yup from "yup";

const initialValues = {
	name: "",
	email: "",
	phoneNumber: "",
	pincode: "",
	address: "",
	city: "",
	state: "",
	isActive: true,
};

const validationSchema = Yup.object({
	name: Yup.string().required("Required"),
	email: Yup.string().email("Please enter a valid email").required("Required"),
	phoneNumber: Yup.string()
		.min(10, "Enter valid phone number")
		.max(10, "Enter valid phone number")
		.required("Required"),
	pincode: Yup.string().required("Required"),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().nullable().required("Required"),
	isActive: Yup.boolean().nullable().required("Required"),
});

const AddBranchModal = ({ open, onClose, _fetchBranches }) => {
	const dispatch = useDispatch();

	const form = useRef(null);

	const onSubmit = values => {
		addBranch(values)
			.then(() => {
				_fetchBranches();
				onClose();
			})
			.finally(dispatch(setLoader(false)));
	};

	let debounceTimer;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "80vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box
				p='1rem 2rem'
				display='flex'
				flexDirection='column'
				gap='1rem'
				height='100%'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Add Branch
					</Typography>

					<IconButton onClick={onClose} sx={{ p: 0 }}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					innerRef={form}
					onSubmit={onSubmit}>
					<Form
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
						}}>
						<Box flexGrow={1}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									<FieldInput name='name' label='Branch Name' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='email' label='Email ID' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='phoneNumber' label='Phone Number' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput
										type='number'
										name='pincode'
										label='Pincode'
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("pincode", value);

											if (!value) return;

											if (debounceTimer) clearTimeout(debounceTimer);
											debounceTimer = setTimeout(() => {
												debounceTimer = null;
												getPincodeData(value).then(({ city, state }) => {
													setFieldValue("city", city);
													setFieldValue("state", state);
												});
											}, 2000);
										}}
									/>
								</Grid>

								<Grid item xs={12}>
									<FieldInput name='address' label='Address' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='city' label='City' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='state' label='State' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<Field name='isActive'>
										{props => {
											const { field, meta } = props || {};

											return (
												<DropdownWithSearch
													name={field.name}
													value={field.value}
													placeholder='Status'
													options={[true, false]}
													renderOption={(props, option) => {
														return (
															<li {...props}>
																<Typography fontSize='0.75rem'>
																	{option ? "Active" : "Inactive"}
																</Typography>
															</li>
														);
													}}
													getOptionLabel={option => {
														return option ? "Active" : "Inactive";
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
							</Grid>
						</Box>

						<Box display='flex' justifyContent='center'>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}>
								Save
							</Button>
						</Box>
					</Form>
				</Formik>
			</Box>
		</Dialog>
	);
};

const tableHead = [
	"",
	"Branch Name",
	"Contact Number",
	"Email ID",
	"Address",
	"City",
	"State",
	"Pincode",
	"Action",
];

const BranchManagement = () => {
	const dispatch = useDispatch();

	const [branches, setBranches] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		_fetchBranches();
	}, []);

	const _fetchBranches = () => {
		dispatch(setLoader(true));

		getBranch()
			.then(setBranches)
			.finally(dispatch(setLoader(false)));
	};

	const handleRoleChange = ({ key, value }) => {
		dispatch(setLoader(true));

		updateBranchStatus({ branchId: key, isActive: value })
			.then(_fetchBranches)
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

						<TableBody sx={{ backgroundColor: "#F5F5F5" }}>
							{branches?.length ? (
								branches.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.name ?? "N/A"}</TableCell>

										<TableCell>{row?.phoneNumber ?? "N/A"}</TableCell>

										<TableCell>{row?.email ?? "N/A"}</TableCell>

										<TableCell>{row?.address ?? "N/A"}</TableCell>

										<TableCell>{row?.city ?? "N/A"}</TableCell>

										<TableCell>{row?.state ?? "N/A"}</TableCell>

										<TableCell>{row?.pincode ?? "N/A"}</TableCell>

										<TableCell>
											<CustomSwitch
												name={row?.id}
												checked={row?.isActive}
												handleOnChange={handleRoleChange}
											/>
										</TableCell>
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
			</Box>

			<Box display='flex' justifyContent='flex-end' p='0 1.25rem'>
				<Button
					variant='contained'
					size='small'
					sx={{ textTransform: "none", bgcolor: "#f37b21 !important" }}
					startIcon={<AddIcon />}
					onClick={() => setIsModalOpen(true)}>
					Add Branch
				</Button>
			</Box>

			<AddBranchModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				_fetchBranches={_fetchBranches}
			/>
		</>
	);
};

export default BranchManagement;
