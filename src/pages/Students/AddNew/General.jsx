import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getPincodeData } from "apis/geography";
import {
	addStudent,
	getStudentGeneralInformation,
	updateStudentGeneralInformation,
} from "apis/student";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import {
	Gender,
	MaritalStatus,
	Relationship,
	Salutation,
	StudentSource,
	VisaOptions,
} from "constants";
import { differenceInYears, format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generalValidation } from "utils/validations";

const General = ({
	studentId,
	setStudentId = () => {},
	staff = [],
	intakes = [],
	preferredCountries = [],
	nextStep = () => {},
}) => {
	const {
		user: { staff: { id: userStaffId } = {} },
	} = useSelector(state => state);

	const initialValues = {
		studentInformation: {
			salutation: null,
			firstName: "",
			middleName: "",
			lastName: "",
			staffId: userStaffId ?? null,
			counsellorId: userStaffId ?? null,
			source: null,
			passportNumber: "",
			mobile: "",
			whatsappNumber: "",
			countryOfInterest: [],
			intakePreferred: null,
			email: "",
		},

		demographicInformation: {
			haveMedicalHistory: null,
			medicalHistoryDetails: "",
			maritalStatus: null,
			country: null,
			firstLanguage: "",
			dateOfBirth: "",
			gender: null,
		},

		address: {
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: null,
		},

		emergencyContact: {
			name: "",
			relationship: null,
			email: "",
			phoneNumber: "",
			address: "",
			country: null,
		},

		backgroundInformation: {
			isRefusedVisa: null,
			haveStudyPermit: null,
			studyPermitDetails: null,
		},
	};

	const { app: { countries = [] } = {} } = useSelector(state => state);

	const form = useRef(null);

	const [information, setInformation] = useState(null);

	useEffect(() => {
		if (studentId) {
			getStudentGeneralInformation(studentId).then(info =>
				setInformation({
					...info,
					demographicInformation: {
						...info?.demographicInformation,
						dateOfBirth: format(
							new Date(info?.demographicInformation?.dateOfBirth),
							"yyyy-MM-dd"
						),
					},
				})
			);
		}
	}, []);

	const onSubmit = values => {
		const applicantAge = differenceInYears(
			new Date(),
			values.demographicInformation.dateOfBirth
		);

		if (applicantAge >= 17) {
			if (studentId) {
				updateStudentGeneralInformation({ studentId, data: values }).then(
					() => {
						toast.success("Updated Successfully");
						nextStep();
					}
				);

				return;
			}

			addStudent(values).then(({ id }) => {
				setStudentId(id);
				nextStep();
			});
		} else {
			toast.error("Age cannot be less than 17");
		}
	};

	let debounceTimer;

	return (
		<Formik
			initialValues={information ? information : initialValues}
			enableReinitialize
			validationSchema={generalValidation}
			innerRef={form}
			onSubmit={onSubmit}>
			{props => (
				<Form style={{ display: "grid", gap: "1.25rem" }}>
					{/* <<< Student Information >>> */}
					<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
							textTransform='uppercase'>
							Student Information
						</Typography>

						<Grid container spacing={1} mt={0}>
							<Grid item xs={4} sm={3}>
								<Field name='studentInformation.salutation'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Salutation'
												options={Salutation}
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

							<Grid item xs={8} sm={3}>
								<FieldInput
									name='studentInformation.firstName'
									label='First Name'
								/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<FieldInput
									name='studentInformation.middleName'
									label='Middle Name'
								/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<FieldInput
									name='studentInformation.lastName'
									label='Last Name'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='studentInformation.staffId'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Agent Name'
												options={staff?.map(({ id }) => id)}
												renderOption={(props, option) => {
													const selectedOption = staff?.filter(
														({ id }) => id === option
													)[0];

													return (
														<li {...props}>
															<Typography fontSize='0.75rem'>
																{selectedOption?.name}
															</Typography>
														</li>
													);
												}}
												getOptionLabel={option => {
													const selectedBranch = staff?.filter(
														({ id }) => id === option
													)[0];

													return selectedBranch?.name;
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
								<Field name='studentInformation.counsellorId'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Counsellor Name'
												options={staff?.map(({ id }) => id)}
												renderOption={(props, option) => {
													const selectedOption = staff?.filter(
														({ id }) => id === option
													)[0];

													return (
														<li {...props}>
															<Typography fontSize='0.75rem'>
																{selectedOption?.name}
															</Typography>
														</li>
													);
												}}
												getOptionLabel={option => {
													const selectedBranch = staff?.filter(
														({ id }) => id === option
													)[0];

													return selectedBranch?.name;
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
								<Field name='studentInformation.source'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												placeholder='Source'
												options={StudentSource}
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
									name='studentInformation.passportNumber'
									label='Passport Number'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.mobile'
									label='Mobile'
									type='tel'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.whatsappNumber'
									label='Whatsapp Number'
									type='tel'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.email'
									label='Email'
									type='email'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='studentInformation.intakePreferred'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Intake Preferred'
												options={intakes?.map(({ id }) => id)}
												renderOption={(props, option) => {
													const selectedOption = intakes?.filter(
														({ id }) => id === option
													)[0];

													return (
														<li {...props}>
															<Typography fontSize='0.75rem'>
																{selectedOption?.name}
															</Typography>
														</li>
													);
												}}
												getOptionLabel={option => {
													const selectedBranch = intakes?.filter(
														({ id }) => id === option
													)[0];

													return selectedBranch?.name;
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

							<Grid item xs={12}>
								<Field name='studentInformation.countryOfInterest'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												multiple
												disableCloseOnSelect
												name={field.name}
												value={field.value}
												placeholder='Country of Interest'
												options={preferredCountries}
												renderTags={(value, getTagProps) =>
													value.map((option, index) => {
														return (
															<Chip
																key={index}
																variant='filled'
																size='small'
																label={option}
																sx={{ fontSize: "0.75rem" }}
																{...getTagProps({ index })}
															/>
														);
													})
												}
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

					{/* <<< Demographic Information >>> */}
					<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
							textTransform='uppercase'>
							Demographic Information
						</Typography>

						<Grid container spacing={1} mt={0}>
							<Grid item xs={12}>
								<Field name='demographicInformation.haveMedicalHistory'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Are you having any medical history ?'
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

							{props?.values?.demographicInformation?.haveMedicalHistory ? (
								<Grid item xs={12}>
									<FieldInput
										name='demographicInformation.medicalHistoryDetails'
										label='Medical History Details'
									/>
								</Grid>
							) : null}

							<Grid item xs={12} sm={6}>
								<Field name='demographicInformation.maritalStatus'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Marital Status'
												options={MaritalStatus}
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
								<Field name='demographicInformation.gender'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Gender'
												options={Gender}
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
									name='demographicInformation.dateOfBirth'
									label='Birth Date'
									type='date'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='demographicInformation.firstLanguage'
									label='First Language'
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='demographicInformation.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Country of Citizenship'
												options={countries?.map(({ name }) => name)}
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

					{/* <<< Address Information >>> */}
					<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
							textTransform='uppercase'>
							Address Information
						</Typography>

						<Grid container spacing={1} mt={0}>
							<Grid item xs={12}>
								<FieldInput name='address.address' label='Address' />
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									type='number'
									name='address.zipCode'
									placeholder='Postal Code'
									onChange={({ target: { value } }) => {
										const { current: { setFieldValue } = {} } = form || {};

										setFieldValue("address.zipCode", value);

										if (!value) return;

										if (debounceTimer) clearTimeout(debounceTimer);
										debounceTimer = setTimeout(() => {
											debounceTimer = null;
											getPincodeData(value).then(({ city, state, country }) => {
												setFieldValue("address.city", city);
												setFieldValue("address.state", state);
												setFieldValue("address.country", country);
											});
										}, 2000);
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<FieldInput name='address.city' label='City' />
							</Grid>
							<Grid item xs={6}>
								<FieldInput name='address.state' label='State' />
							</Grid>

							<Grid item xs={6}>
								<Field name='address.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Country'
												options={countries?.map(({ name }) => name)}
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

					{/* <<< Emergency Contact Information >>> */}
					<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
							textTransform='uppercase'>
							Emergency Contact Information
						</Typography>

						<Grid container spacing={1} mt={0}>
							<Grid item xs={6}>
								<FieldInput name='emergencyContact.name' label='Name' />
							</Grid>

							<Grid item xs={6}>
								<Field name='emergencyContact.relationship'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Relationship Status'
												options={Relationship}
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

							<Grid item xs={6}>
								<FieldInput
									name='emergencyContact.email'
									label='Email'
									type='email'
								/>
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									name='emergencyContact.phoneNumber'
									label='Phone Number'
									type='tel'
								/>
							</Grid>

							<Grid item xs={6}>
								<FieldInput name='emergencyContact.address' label='Address' />
							</Grid>

							<Grid item xs={6}>
								<Field name='emergencyContact.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Country'
												options={countries?.map(({ name }) => name)}
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

					{/* <<< Background Information >>> */}
					<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
							textTransform='uppercase'>
							Background Information
						</Typography>

						<Grid container spacing={1} mt={0}>
							<Grid item xs={6}>
								<Field name='backgroundInformation.isRefusedVisa'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Have you been refused a VISA?'
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

							{props?.values?.backgroundInformation?.isRefusedVisa ? (
								<Grid item xs={6}>
									<FieldInput
										name='backgroundInformation.visaRefusalInformation'
										label='Visa Refusal Reason'
									/>
								</Grid>
							) : null}

							<Grid item xs={6}>
								<Field name='backgroundInformation.haveStudyPermit'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Study Permit/ VISA Details'
												options={VisaOptions}
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

							<Grid item xs={6}>
								<Field name='backgroundInformation.studyPermitDetails'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Do you have a valid Study Permit/ VISA Details'
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
						</Grid>
					</Box>

					<Box display='flex' justifyContent='flex-end'>
						<Button
							variant='contained'
							size='small'
							type='submit'
							sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}>
							Next
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default General;
