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
import FieldInput from "components/FieldInput";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { workValidation } from "utils/validations";

const initialValues = {
	employerName: "",
	designation: "",
	doj: "",
	dor: "",
	contactInfo: "",
	email: "",
	signingAuthority: {
		name: "",
		email: "",
		phone: "",
	},
};

const tableHead = [
	"",
	"Employer Name",
	"Designation",
	"Date of Joining",
	"Date of Relieving",
	"Contact Info",
	"Email",
	"Action",
];

const WorkHistory = ({ studentId }) => {
	const [workHistory, setWorkHistory] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedWork, setSelectedWork] = useState(null);

	useEffect(() => {
		_fetchWorkHistory();
	}, []);

	const _fetchWorkHistory = () => {
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

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem' overflow='auto'>
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

										<TableCell>{row.designation}</TableCell>

										<TableCell>{format(new Date(row.doj), "PP")}</TableCell>

										<TableCell>{format(new Date(row.dor), "PP")}</TableCell>

										<TableCell>{row.contactInfo}</TableCell>

										<TableCell>{row.email}</TableCell>

										<TableCell>
											<IconButton
												sx={{ p: 0 }}
												disabled={row?.isLocked}
												onClick={() => {
													setSelectedWork(row);
													setOpen(true);
												}}>
												<Edit />
											</IconButton>
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

									<Grid item xs={12} sm={6}>
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
									</Grid>
								</Grid>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default WorkHistory;
