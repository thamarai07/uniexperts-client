import SaveIcon from "@mui/icons-material/Save";
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import { getPincodeData } from "apis/geography";
import {
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
import { differenceInYears } from "date-fns";
import { format } from "date-fns/esm";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoader } from "store";
import { generalValidation } from "utils/validations";

const General = ({
	studentId,
	staff = [],
	intakes = [],
	preferredCountries = [],
}) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);

	const form = useRef(null);

	const dispatch = useDispatch();

	const [information, setInformation] = useState(null);

	useEffect(() => {
		dispatch(setLoader(true));

		getStudentGeneralInformation(studentId)
			.then(info => {
				setInformation({
					...info,
					demographicInformation: {
						...info?.demographicInformation,
						dateOfBirth: format(
							new Date(info?.demographicInformation?.dateOfBirth),
							"yyyy-MM-dd"
						),
					},
				});
			})
			.finally(dispatch(setLoader(false)));
	}, []);

	const onSubmit = values => {
		const applicantAge = differenceInYears(
			new Date(),
			values.demographicInformation.dateOfBirth
		);

		if (applicantAge >= 17) {
			updateStudentGeneralInformation({ studentId, data: values }).then(() => {
				toast.success("Updated Successfully");
			});
		} else {
			toast.error("Age cannot be less than 17");
		}
	};

	let debounceTimer;

	if (!information) return null;

	return (
		<Formik
			validationSchema={generalValidation}
			enableReinitialize
			initialValues={information}
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
												disabled={information?.studentInformation?.isLocked}
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
									disabled={information?.studentInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<FieldInput
									name='studentInformation.middleName'
									label='Middle Name'
									disabled={information?.studentInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<FieldInput
									name='studentInformation.lastName'
									label='Last Name'
									disabled={information?.studentInformation?.isLocked}
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
												disabled={information?.studentInformation?.isLocked}
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
												disabled={information?.studentInformation?.isLocked}
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
												value={field.value}
												disabled={information?.studentInformation?.isLocked}
												placeholder='Source'
												options={StudentSource}
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
									disabled={information?.studentInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.mobile'
									label='Mobile'
									type='tel'
									disabled={information?.studentInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.whatsappNumber'
									label='Whatsapp Number'
									type='tel'
									disabled={information?.studentInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='studentInformation.email'
									label='Email'
									type='email'
									disabled={information?.studentInformation?.isLocked}
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
												disabled={information?.studentInformation?.isLocked}
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
												name={field.name}
												value={field.value}
												disabled={information?.studentInformation?.isLocked}
												multiple
												disableCloseOnSelect
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
												disabled={information?.demographicInformation?.isLocked}
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
										disabled={information?.demographicInformation?.isLocked}
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
												disabled={information?.demographicInformation?.isLocked}
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
												disabled={information?.demographicInformation?.isLocked}
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
									disabled={information?.demographicInformation?.isLocked}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='demographicInformation.firstLanguage'
									label='First Language'
									disabled={information?.demographicInformation?.isLocked}
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
												disabled={information?.demographicInformation?.isLocked}
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
								<FieldInput
									name='address.address'
									label='Address'
									disabled={information?.address?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									name='address.zipCode'
									disabled={information?.address?.isLocked}
									type='number'
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
								<FieldInput
									name='address.city'
									label='City'
									disabled={information?.address?.isLocked}
								/>
							</Grid>
							<Grid item xs={6}>
								<FieldInput
									name='address.state'
									label='State'
									disabled={information?.address?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<Field name='address.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												disabled={information?.address?.isLocked}
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
								<FieldInput
									name='emergencyContact.name'
									label='Name'
									disabled={information?.emergencyContact?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<Field name='emergencyContact.relationship'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												disabled={information?.emergencyContact?.isLocked}
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
									disabled={information?.emergencyContact?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									name='emergencyContact.phoneNumber'
									label='Phone Number'
									type='tel'
									disabled={information?.emergencyContact?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<FieldInput
									name='emergencyContact.address'
									label='Address'
									disabled={information?.emergencyContact?.isLocked}
								/>
							</Grid>

							<Grid item xs={6}>
								<Field name='emergencyContact.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												disabled={information?.emergencyContact?.isLocked}
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
												disabled={information?.backgroundInformation?.isLocked}
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
										disabled={information?.backgroundInformation?.isLocked}
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
												disabled={information?.backgroundInformation?.isLocked}
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
												disabled={information?.backgroundInformation?.isLocked}
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

					<IconButton
						type='submit'
						sx={{
							position: "fixed !important",
							bottom: "2rem !important",
							right: "2rem !important",
							bgcolor: "#f37b21 !important",
							color: "#fff !important",
							height: "3rem !important",
							width: "3rem !important",
							display: "grid !important",
							placeItems: "center !important",
							borderRadius: "50% !important",
							cursor: "pointer !important",
							boxShadow: "1px 1px 4px 1px rgb(33 33 33 / 40%) !important",
							transitionDuration: "250ms !important",
						}}>
						<SaveIcon />
					</IconButton>
				</Form>
			)}
		</Formik>
	);
};

export default General;
