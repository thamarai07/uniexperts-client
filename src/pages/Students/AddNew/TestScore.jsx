import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Dialog,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Divider
} from "@mui/material";
import { addTestScore, getTestScore, updateTestScore } from "apis/student";
import { getExamFields, getExamTypes } from "apis/testScore";
import FieldInput from "../components/FieldInput/index";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import * as Yup from "yup";
import Loader from "components/Loader";

const initialValues = {
	examType: "",
	name: "",
	doe: "",
	certificateNo: "",
	url: "",
	username: "",
	password: "",
	englishMarks: "",
	percentile: ""
};

const tableHead = [
	"",
	"Certification ID",
	"Exam Type",
	"Date of Exam",
	"Total Score",
	"Result",
];

const TestScore = ({ studentId, nextStep = { nextStep } }) => {
	const history = useHistory();

	const [tests, setTests] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedTest, setSelectedTest] = useState(null);
	const [examTypes, setExamTypes] = useState([]);
	const [selectedExamType, setSelectedExamType] = useState(null);
	const [fieldList, setFieldList] = useState([]);
	const [showFields, setShowFields] = useState(false);
	const [validationSchema, setValidationSchema] = useState(null);
	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {
		_fetchTestScores();
		_fetchExamTypes();
	}, []);

	// useEffect(() => {
	// 	const temp = {};
	// 	fieldList?.forEach(key => {
	// 		initialValues[key] = "";
	// 		temp[key] = Yup.string().nullable().required("Required");
	// 	});

	// 	Object.keys(initialValues)?.forEach(key => {
	// 		temp[key] = Yup.string().nullable().required("Required");
	// 	});

	// 	setValidationSchema(Yup.object(temp));
	// }, [fieldList]);

	const _fetchTestScores = () => {
		getTestScore(studentId).then((ts = []) => setTests(ts));
	};

	const _fetchExamTypes = () => {
		// getExamTypes().then(setExamTypes);
		setExamTypes(["Duolingo", "12th Standard English Mark", "GMAT", "GRE", "TOFL / IELTS / PTE"])
	};

	const getFields = () => {
		setShowFields(true);
		setIsLoading(false)
		getExamFields(selectedExamType).then(fields => {
			setFieldList(fields);
			setShowFields(true);
		});
	};

	const onSubmit = values => {
		console.log("onSubmit")
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 5000);

		const temp = {};
		fieldList?.forEach(key => {
			initialValues[key] = "";
			temp[key] = Yup.string().nullable().required("Required");
		});

		Object.keys(initialValues)?.forEach(key => {
			temp[key] = Yup.string().nullable().required("Required");
		});

		setValidationSchema(Yup.object(temp));

		const requestData = {
			name: values?.name,
			doe: new Date(values?.doe),
			certificateNo: values?.certificateNo,
			examType: selectedExamType,
			scoreInformation: fieldList?.map(fld => ({
				key: fld,
				value: values[fld],
			})),
			verificationPortal: {
				url: values?.url,
				username: values?.username,
				password: values?.password,
			},
		};

		if (selectedTest?.id) {
			updateTestScore({
				studentId,
				testScoreId: selectedTest?.id,
				data: requestData,
			}).then(() => {
				setIsLoading(false)
				_fetchTestScores();
				toast.success("Test Score Updated SuccessFully");
				onClose();
			});

			return;
		}

		addTestScore({ studentId, data: requestData }).then(() => {
			_fetchTestScores();
			toast.success("Test Score Added SuccessFully");
			onClose();
			setIsLoading(false)
		});
	};

	const onClose = () => {
		setSelectedTest(null);
		setSelectedExamType(null);
		setOpen(close);
		setIsLoading(false)
		setShowFields(false);
		setFieldList([]);
	};

	// const onFinish = () => {
	// 	history.push(RouteNames.edit_student?.replace(":id", studentId));
	// };

	if (isLoading) return <Loader />

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
							{tests?.length ? (
								tests?.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.certificateNo}</TableCell>

										<TableCell>{row?.examType}</TableCell>

										<TableCell>{format(new Date(row?.doe), "PP")}</TableCell>

										<TableCell>
											{row?.scoreInformation?.filter(
												({ key }) => key?.toLowerCase() === "ts"
											)[0]?.value || "N/A"}
										</TableCell>

										<TableCell>{row?.examType}</TableCell>

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
				<Box display='flex' justifyContent='flex-end'>
					<Button
						variant='contained'
						size='small'
						type='button'
						sx={{ textTransform: "none", bgcolor: "#f37b21 !important", borderRadius: 99, marginRight: "0.7%" }}
						onClick={() => setOpen(true)}
						startIcon={<AddIcon />}>
						Add
					</Button>
				</Box>
			</Box>
			<Box display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					size='small'
					disabled={!tests?.length}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" },
						marginRight: "2%",
						borderRadius: 99,
					}}
					onClick={nextStep}>
					NEXT
				</Button>
			</Box>

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
					<Formik
						enableReinitialize
						initialValues={selectedTest ? selectedTest : initialValues}
						//validationSchema={validationSchema}
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
									<Typography
										fontSize='1.2rem'
										fontWeight={500}
										textAlign={"center"}
										width={"100%"}
										color='#f37b21'>
										{showFields && selectedExamType}
									</Typography>

									<IconButton onClick={onClose} sx={{ p: 0 }}>
										<CloseIcon />
									</IconButton>
								</Box>
								<Grid container spacing={1} mt={0}>
									{showFields ? (
										<>
											<Grid item xs={12} sm={12}>
												<Typography
													fontSize='1rem'
													fontWeight={500}
													color='#f37b21'>
													Information
												</Typography>
											</Grid>


											<Grid item xs={12} sm={6}>
												<FieldInput name='name' label='Student Name' />
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													type='date'
													name='doe'
													label='Date of Exam'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='certificateNo'
													label='ID/Certificate No.'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='url'
													label='Verification Portal URL'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='username'
													label='Verification Portal Username'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='password'
													label='Verification Portal Password'
												/>
											</Grid>
											<Divider />
											<Grid item xs={12} sm={12}>
												<Typography
													fontSize='1rem'
													fontWeight={500}
													color='#f37b21'>
													Score Information
												</Typography>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='percentile'
													label='Percentile'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='englishMarks'
													label='Total Marks of English'
												/>
											</Grid>

											{fieldList?.map(field => (
												<Grid key={field} item xs={12} sm={6}>
													<FieldInput name={field} label={field} />
												</Grid>
											))}
										</>
									) : (
										<Grid item xs={12} sm={12}>

											<Typography
												fontSize='1rem'
												fontWeight={500}
												color='#f37b21'>
												Select an Exam :
											</Typography>

											<Field name='examType'>
												{props => {
													const {
														field,
														form: { setFieldValue },
													} = props || {};

													return (
														<RadioGroup
															{...field}
															onChange={({ target: { name, value } }) => {
																setFieldValue(name, value);
																setSelectedExamType(value);
															}}>
															{examTypes?.map(exam => (
																<FormControlLabel
																	key={exam}
																	value={exam}
																	control={<Radio size='small' />}
																	label={exam}
																	sx={{
																		"& .Mui-checked": {
																			color: "#f37b21 !important",
																		},
																		"& .MuiFormControlLabel-label": {
																			fontSize: "0.825rem",
																		},
																	}}
																/>
															))}
														</RadioGroup>
													);
												}}
											</Field>
										</Grid>
									)}
								</Grid>
								<Box display='flex' justifyContent='flex-end'>
									{showFields ? (
										<Button
											type='submit'
											variant='contained'
											size='small'
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												"&:disabled": {
													bgcolor: "rgba(0, 0, 0, 0.12) !important",
												},
												borderRadius: 99
											}}>
											Submit
										</Button>
									) : (
										<Button
											variant='contained'
											size='small'
											type='button'
											disabled={!selectedExamType}
											onClick={getFields}
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												"&:disabled": {
													bgcolor: "rgba(0, 0, 0, 0.12) !important",
												},
												borderRadius: 99
											}}>
											Next
										</Button>
									)}
								</Box>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default TestScore;
