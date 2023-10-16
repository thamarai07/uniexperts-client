import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
	Box,
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
import {
	addStudentWorkHistory,
	getStudentWorkHistory,
	updateStudentWorkHistory,
} from "apis/student";
import FieldInput from "../components/FieldInput/index";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { workValidation } from "../Validations/validations";

const initialValues = {
	employerName: "",
	designation: "",
	doj: "",
	dor: "",
	contactInfo: "",
	email: "",
	signedPersonName: "",
	signedPersonPhone: "",
	signedPersonEmail: "",
	// signingAuthority: {
	// 	name: "",
	// 	email: "",
	// 	phone: "",
	// },
};

const tableHead = [
	"",
	"Company",
	// "Country",
	"Designation",
	"Date of Joining",
	"Date of Relieving",
	"Company Email",
	"Contact number",
];

const WorkHistory = ({ studentId, nextStep = () => { } }) => {
	const [workHistory, setWorkHistory] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedWork, setSelectedWork] = useState(null);
	const [isOptional, setIsOptional] = useState(false)

	useEffect(() => {
		_fetchWorkHistory();
	}, []);

	const _fetchWorkHistory = () => {
		if (!studentId) return;

		getStudentWorkHistory(studentId).then((wh = []) => setWorkHistory(wh));
	};

	const onSubmit = (values, { resetForm }) => {
		if (selectedWork?.id) {
			updateStudentWorkHistory({
				studentId,
				workHistoryId: selectedWork?.id,
				data: {
					...values,
					doj: new Date(values.doj),
					dor: new Date(values.dor),
				},
			}).then(() => {
				resetForm();
				setWorkHistory([]);
				setOpen(false);
				toast.success("Work Experience Updated Successfully");
				_fetchWorkHistory();
			});

			return;
		}

		addStudentWorkHistory({
			studentId,
			data: {
				...values,
				doj: new Date(values.doj),
				dor: new Date(values.dor),
			},
		}).then(() => {
			resetForm();
			setWorkHistory([]);
			setOpen(false);
			toast.success("Work Experience Added Successfully");
			_fetchWorkHistory();
		});
	};

	// const onFinish = () => {
	// 	history.push(RouteNames.edit_student?.replace(":id", studentId));
	// };

	return (
		<>
			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection='column'
				gap='1rem'>


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
							{workHistory?.length ? (
								workHistory.map((row, index) => (
									<TableRow key={row.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row.employerName}</TableCell>

										{/* <TableCell>{row.designation}</TableCell> */}
										<TableCell>{row.designation}</TableCell>


										<TableCell>{format(new Date(row.doj), "PP")}</TableCell>

										<TableCell>{format(new Date(row.dor), "PP")}</TableCell>

										<TableCell>{row.email}</TableCell>
										<TableCell>{row.contactInfo}</TableCell>


										{/* <TableCell>
											<IconButton
												sx={{ p: 0 }}
												onClick={() => {
													setSelectedWork(row);
													setOpen(true);
												}}>
												<Edit />
											</IconButton>
										</TableCell> */}
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
				<Box display='flex' justifyContent='flex-end' columnGap={2}>
					<Button
						variant='contained'
						size='small'
						disabled={isOptional}
						type='button'
						sx={{ textTransform: "none", bgcolor: "#f37b21 !important", "&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" }, borderRadius: 99 }}
						onClick={() => setOpen(true)}
						startIcon={<AddIcon />}>
						Add
					</Button>
					<Button
						variant='contained'
						size='small'
						type='button'
						sx={{ textTransform: "none", bgcolor: "#f37b21 !important", borderRadius: 99, marginRight: "0.7%" }}
						onClick={() => setIsOptional(true)}
					>
						No Work History
					</Button>
				</Box>
			</Box>

			<Box display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					size='small'
					disabled={!isOptional && !workHistory?.length}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" },
						marginRight: "2%",
						borderRadius: 99
					}}
					onClick={nextStep}>
					Next
				</Button>
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
					setSelectedWork(null);
					setOpen(false);
				}}>
				<Box
					p='1rem 2rem'
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='100%'>
					<Formik
						initialValues={selectedWork ? selectedWork : initialValues}
						validationSchema={workValidation}
						onSubmit={onSubmit}>
						<Form>
							<Box
								display='flex'
								flexDirection='column'
								gap='1rem'
								height='100%'>
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
											Work History
										</Typography>


									</Box>

									<IconButton
										onClick={() => {
											setSelectedWork(null);
											setOpen(false);
										}}
										sx={{ p: 0 }}>
										<CloseIcon />
									</IconButton>
								</Box>

								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<FieldInput name='employerName' label='Employer Name' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput name='designation' label='Designation' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='doj'
											type='date'
											label='Date of Joining'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='dor'
											type='date'
											label='Date of Relieving'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput name='contactInfo' label='Contact info' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput name='email' label='Email' />
									</Grid>

									{/* <Grid item xs={12} sm={6}>
										<FieldInput
											name='signingAuthority.email'
											label='Signing Authority Email'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='signingAuthority.name'
											label='Signing Authority Name'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='signingAuthority.phone'
											label='Signing Authority Phone'
										/>
									</Grid> */}
								</Grid>

								<Typography
									fontSize='1.2rem'
									fontWeight={500}
									color='#f37b21'>
									Verification Information
								</Typography>


								<Grid item xs={12} sm={6}>
									<FieldInput name='signedPersonName' label='Name of the Signed Person' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='signedPersonPhone' label='Phone Number of the Signed Person' />
								</Grid>

								<Grid item xs={12} sm={6}>
									<FieldInput name='signedPersonEmail' label='Email ID of Signed Person' />
								</Grid>


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
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default WorkHistory;
