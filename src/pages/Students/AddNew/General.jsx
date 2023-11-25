import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getPincodeData } from "apis/geography";
import {
	addStudent,
	getStudentGeneralInformation,
	updateStudentGeneralInformation,
} from "apis/student";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "../components/FieldInput/index";
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
import { generalValidation } from "../Validations/validations";
import Loader from "components/Loader";
const countryOfCitizenship =
	["Afghanistan", "Aland Islands", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d’Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People’s Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People’s Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Vietnam", "Virgin Islands, British", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
const General = ({
	studentId,
	setStudentId = () => { },
	staff = [],
	intakes = [],
	preferredCountries = [],
	nextStep = () => { },
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
			preferredCountry: [],
			intakePreferred: null,
			email: "",
		},

		demographicInformation: {
			haveMedicalHistory: null,
			medicalHistoryDetails: "NIL",
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
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 10000);

		const applicantAge = differenceInYears(
			new Date(),
			values.demographicInformation.dateOfBirth
		);

		if (applicantAge >= 17) {
			if (studentId) {
				updateStudentGeneralInformation({ studentId, data: values }).then(
					() => {
						toast.success("Updated Successfully");
						setIsLoading(false)
						nextStep();
					}
				);

				return;
			}

			addStudent(values).then(({ id }) => {
				setStudentId(id);
				setIsLoading(false)
				nextStep();
			});
		} else {
			toast.error("Age cannot be less than 17");
		}


	};

	// let debounceTimer;

	if (isLoading) { return <Loader /> }

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
					{/* <Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'> */}

					<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'>
							Student Information
						</Typography>

						<Grid container spacing={1} mt={1}>
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

							<Grid item xs={6}>
								<Field name='studentInformation.preferredCountry'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												multiple
												disableCloseOnSelect
												name={field.name}
												value={field.value}
												placeholder='Preferred Country'
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

						</Grid>
					</Box>


					{/* <<< Demographic Information >>> */}
					<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'>
							Demographic Information
						</Typography>

						<Grid container spacing={1} mt={1}>
							<Grid item xs={6}>
								<FieldInput
									name='demographicInformation.medicalHistoryDetails'
									label='Medical History Details'
								/>
							</Grid>
							<Grid item xs={6}>
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

							{/* {props?.values?.demographicInformation?.haveMedicalHistory ? (
								<Grid item xs={12}>
									<FieldInput
										name='demographicInformation.medicalHistoryDetails'
										label='Medical History Details'
									/>
								</Grid>
							) : null} */}

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
												options={countryOfCitizenship?.map((name) => name)}
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
					<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'>
							Address Information
						</Typography>

						<Grid container spacing={1} mt={1}>
							<Grid item xs={12}>
								<FieldInput name='address.address' label='Address' />
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									type='number'
									name='address.zipCode'
									placeholder='Postal Code'
									label='Postal Code'
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
												options={preferredCountries?.map((name) => name)}
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
					<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'>
							Emergency Contact Information
						</Typography>

						<Grid container spacing={1} mt={1}>
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
												options={preferredCountries?.map((name) => name)}
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
					<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem'>
						<Typography
							fontSize='1rem'
							fontWeight={500}
							color='#f37b21'
						>
							Background Information
						</Typography>

						<Grid container spacing={1} mt={1}>
							<Grid item xs={6} sm={6} >
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
								{props?.values?.backgroundInformation?.isRefusedVisa ? (
									<div style={{ marginTop: 10 }} >
										<FieldInput
											name='backgroundInformation.visaRefusalInformation'
											label='Visa Refusal Reason'
										/>
									</div>
								) : null}
							</Grid>

							{/* {props?.values?.backgroundInformation?.isRefusedVisa ? (
								<Grid item xs={6}>
									<FieldInput
										name='backgroundInformation.visaRefusalInformation'
										label='Visa Refusal Reason'
									/>
								</Grid>
							) : null} */}

							<Grid item xs={6} sm={6}>
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

							<Grid item xs={6} sm={6}>
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
							sx={{ bgcolor: "#f37b21 !important", textTransform: "none", borderRadius: 99, marginRight: "1%" }}>
							Next
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default General;