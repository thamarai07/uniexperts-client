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
	addStudentEducation,
	getStudentEducations,
	updateStudentEducation,
} from "apis/student";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "../components/FieldInput/index";
import { SchoolTypes } from "constants";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { educationValidation } from "../Validations/validations";

const initialValues = {
	degree: "",
	isDegreeAwarded: null,
	level: null,
	country: "",
	institutionName: "",
	affiliatedUniversity: "",
	attendedFrom: "",
	attendedTo: "",
	degreeAwardedOn: "",
	class: "",
	cgpa: ""
};

const tableHead = [
	"",
	"Degree Attained",
	"Level of education",
	"Country of Institution",
	"Institution Name",
	"Attended Institute From",
	"Grades",
];

const Education = ({ studentId = null, nextStep = () => { },
	preferredCountries = [],
}) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);

	const [educations, setEducations] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedEducation, setSelectedEducation] = useState(null);

	useEffect(() => {
		_fetchEducationInformation();
	}, []);

	const _fetchEducationInformation = () => {
		if (!studentId) return;

		getStudentEducations(studentId).then((edu = []) => setEducations(edu));
	};

	const onSubmit = (values, { resetForm }) => {
		if (selectedEducation?.id) {
			updateStudentEducation({
				studentId,
				educationId: selectedEducation?.id,
				data: {
					...values,
					attendedFrom: new Date(values.attendedFrom),
					attendedTo: new Date(values.attendedTo),
					degreeAwardedOn: new Date(values.degreeAwardedOn),
				},
			}).then(() => {
				resetForm();
				setEducations([]);
				setOpen(false);
				toast.success("Education Updated Successfully");
				_fetchEducationInformation();
			});

			return;
		}

		addStudentEducation({
			studentId,
			data: {
				...values,
				attendedFrom: new Date(values.attendedFrom),
				attendedTo: new Date(values.attendedTo),
				degreeAwardedOn: new Date(values.degreeAwardedOn),
			},
		}).then(() => {
			resetForm();
			setEducations([]);
			setOpen(false);
			toast.success("Education Added Successfully");
			_fetchEducationInformation();
		});
	};

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
							{educations?.length ? (
								educations.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.degree}</TableCell>

										<TableCell>{row?.level}</TableCell>

										<TableCell>{row?.country}</TableCell>

										<TableCell>{row?.institutionName}</TableCell>

										<TableCell>
											{format(new Date(row?.attendedFrom), "PP")}
										</TableCell>

										<TableCell>{row?.cgpa}</TableCell>


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
						sx={{ textTransform: "none", bgcolor: "#f37b21 !important" }}
						onClick={() => setOpen(true)}
						startIcon={<AddIcon />}>
						Add More
					</Button>
				</Box>
			</Box>

			<Box display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					size='small'
					disabled={!educations?.length}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" },
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
					setSelectedEducation(null);
					setOpen(close);
				}}>
				<Box
					p='1rem 2rem'
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='100%'>
					<Formik
						initialValues={
							selectedEducation ? selectedEducation : initialValues
						}
						validationSchema={educationValidation}
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
											Education Details
										</Typography>


									</Box>

									<IconButton
										onClick={() => {
											setSelectedEducation(null);
											setOpen(close);
										}}
										sx={{ p: 0 }}>
										<CloseIcon />
									</IconButton>
								</Box>

								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<FieldInput name='degree' label='Degree Attained' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field name='level'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														name={field.name}
														placeholder='Level of education'
														options={SchoolTypes}
														value={field.value}
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
										<Field name='country'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														name={field.name}
														placeholder='Country of Institution'
														options={preferredCountries?.map((name) => name)}
														value={field.value}
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
										<FieldInput
											name='institutionName'
											label='Name of Institution'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='affiliatedUniversity'
											label='Affiliated University'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FieldInput name='class' label='Class' />
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field name='isDegreeAwarded'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														name={field.name}
														value={field.value}
														placeholder='Degree Awarded'
														options={[true, false]}
														renderOption={(props, option) => {
															return (
																<li {...props}>
																	<Typography fontSize='0.75rem'>
																		{option ? "Yes" : "No"}
																	</Typography>
																</li>
															);
														}}
														getOptionLabel={option => {
															return option ? "Yes" : "No";
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
										<FieldInput
											name='degreeAwardedOn'
											label='Degree Awarded On'
											type='date'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='attendedFrom'
											label='Attended Institute From'
											type='date'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FieldInput type='number' name='cgpa' label='CGPA' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='attendedTo'
											label='Attended Institute To'
											type='date'
										/>
									</Grid>








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

export default Education;
