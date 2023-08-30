import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { getAgentGeneralInfo, setAgentGeneralInfo } from "apis/agent";
import { s3Upload } from "apis/app";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { EntityType } from "constants";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";

const CompanyInformation = () => {
	const { app: { countries = [] } = {} } = useSelector(state => state);
	const dispatch = useDispatch();

	const [editEnabled, setEditEnabled] = useState(false);
	const [data, setData] = useState({});
	const [companyLogo, setCompanyLogo] = useState("");

	const formRef = useRef();
	const hiddenFileInput = useRef(null);

	useEffect(async () => {
		dispatch(setLoader(true));

		await getAgentGeneralInfo()
			.then(setData)
			.finally(() => dispatch(setLoader(false)));
	}, []);

	useEffect(() => {
		if (!formRef?.current) return;

		setCompanyLogo(
			formRef?.current?.values?.company?.companyLogo ??
				data?.company?.companyLogo
		);
	}, [
		formRef?.current?.values?.company?.companyLogo,
		data?.company?.companyLogo,
	]);

	const handleEdit = () => {
		setEditEnabled(true);
	};

	const handleSubmit = async values => {
		setEditEnabled(false);
		dispatch(setLoader(true));

		await setAgentGeneralInfo(values).finally(() => dispatch(setLoader(false)));
	};

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		const { current: { setFieldValue } = {} } = formRef;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);
			setFieldValue("company.companyLogo", fileURL);

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	if (!Object.keys(data ?? {})?.length) return null;

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
						Company Information
					</Typography>

					<Button
						variant='contained'
						size='small'
						sx={{
							backgroundColor: "#F37B21 !important",
							textTransform: "none",
						}}
						onClick={() => {
							if (editEnabled) {
								handleSubmit(formRef.current.values);
								return;
							}

							handleEdit();
						}}>
						{editEnabled ? "Save" : "Edit"}
					</Button>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					gap='1rem'
					mt='1rem'>
					<Avatar
						src={companyLogo}
						alt=''
						sx={{ height: "8rem", width: "8rem" }}
					/>

					<Button
						variant='text'
						size='small'
						disabled={!editEnabled}
						onClick={handleAttachClick}
						sx={{
							textTransform: "none",
							color: "#f37b21 !important",
							"&:disabled": { color: "rgba(0, 0, 0, 0.26) !important" },
						}}>
						Change Company Logo
					</Button>

					<input
						type='file'
						accept='image/*'
						ref={hiddenFileInput}
						onChange={handleFileAttachment}
						style={{ display: "none" }}
					/>
				</Box>

				<Formik
					enableReinitialize
					initialValues={data}
					onSubmit={handleSubmit}
					innerRef={formRef}>
					<Form>
						<Grid container spacing={1} mt={0}>
							<Grid item xs={12} sm={6}>
								<FieldInput
									name='company.companyName'
									label='Company Name'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='company.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												disabled={!editEnabled}
												placeholder='Country'
												options={countries?.map(({ name }) => name)}
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
								<Field name='company.entityType'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												disabled={!editEnabled}
												placeholder='Entity Type'
												options={EntityType}
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
									name='company.studentPerYear'
									type='number'
									label='Student Per Year'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='company.taxNumber'
									label='Tax Number'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='company.website'
									type='url'
									label='Website'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='company.whatsappId'
									label='WhatsApp Number'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='company.yearFounded'
									type='year'
									label='Year Founded'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography
									fontSize='1rem'
									fontWeight={500}
									color='#f37b21'
									m='1rem 0 0.5rem'>
									Contact Information
								</Typography>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='personalDetails.firstName'
									label='Legal First Name'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='personalDetails.lastName'
									label='Legal Last Name'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='personalDetails.countryCode'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												disabled={!editEnabled}
												placeholder='Country Code'
												options={countries?.map(({ phonecode }) => phonecode)}
												renderOption={(props, code) => {
													const selectedCode = countries?.filter(
														({ phonecode }) => phonecode === code
													)[0];

													return (
														<li {...props}>
															<Typography fontSize='0.75rem'>
																{`${selectedCode?.name} (${selectedCode?.phonecode})`}
															</Typography>
														</li>
													);
												}}
												getOptionLabel={code => {
													const selectedCode = countries?.filter(
														({ phonecode }) => phonecode === code
													)[0];

													return `${selectedCode?.name} (${selectedCode?.phonecode})`;
												}}
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
									name='personalDetails.phone'
									label='Phone'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='personalDetails.email'
									type='email'
									label='Email'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='personalDetails.jobTitle'
									label='Job Title'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='address.address'
									label='Address'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='address.city'
									label='City'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FieldInput
									name='address.state'
									label='State'
									disabled={!editEnabled}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Field name='address.country'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												disabled={!editEnabled}
												placeholder='Country'
												options={countries?.map(({ name }) => name)}
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
									name='address.zipCode'
									label='Zip Code'
									disabled={!editEnabled}
								/>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</Box>
		</>
	);
};

export default CompanyInformation;
