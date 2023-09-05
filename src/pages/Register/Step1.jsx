import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { config, signup, verifyEmail } from "apis/auth";
import { getPincodeData } from "apis/geography";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { EntityType } from "constants";
import { Field, Form, Formik } from "formik";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { phoneRegExp } from "utils/validations";
import * as Yup from "yup";

const initialValues = {
	personalDetails: {
		firstName: "",
		lastName: "",
		email: "",
		countryCode: null,
		phone: "",
		jobTitle: "",
		timezone: ""
	},

	company: {
		yearFounded: "",
		companyName: "",
		employeeCount: "",
		studentPerYear: "",
		entityType: null,
		taxNumber: "",
		country: null,
	},

	address: {
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: null,
	},

	bank: {
		name: "",
		bankName: "",
		accountNumber: "",
		confirmNumber: "",
		swiftCode: "",
		ifsc: ""
	},
};

const Step1 = ({ data, setData, nextStep }) => {
	const { app: { countries = [], timezone = [] } = {} } = useSelector(
		state => state
	);

	const [bankField, setBankField] = useState({});
	const [selectedCountry, setSelectedCountry] = useState("");

	const [errors, setErrors] = useState();

	const form = useRef(null);

	useEffect(() => {
		if (!selectedCountry) return;
		config(selectedCountry).then(({ bankFields }) => setBankField(bankFields));
	}, [selectedCountry]);

	let debounceTimer;

	const validationSchema = Yup.object({
		personalDetails: Yup.object({
			firstName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			lastName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			email: Yup.string()
				.email("Please enter a valid email")
				.required("Required"),
			countryCode: Yup.string().nullable().required("Required"),
			phone: Yup.string()
				.matches(phoneRegExp, "Phone number is not valid")
				.required("Required"),
			jobTitle: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			timezone: Yup.string().nullable().required("Required"),
		}),

		company: Yup.object({
			companyName: Yup.string().required("Required"),
			yearFounded: Yup.string().required("Required"),
			employeeCount: Yup.string().required("Required"),
			studentPerYear: Yup.string().required("Required"),
			entityType: Yup.string().nullable().required("Required"),
			taxNumber: Yup.string()
				.required("Required")
				.matches(/^[a-zA-Z0-9]+$/, "Special characters are not allowed"),
			country: Yup.string().nullable().required("Required"),
		}),

		address: Yup.object({
			address: Yup.string().required("Required"),
			city: Yup.string().required("Required"),
			state: Yup.string().required("Required"),
			zipCode: Yup.string().required("Required"),
			country: Yup.string().nullable().required("Required"),
		}),

		bank: Yup.object({
			name: Yup.string().required("Required"),
			bankName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			accountNumber: Yup.string()
				.required("Required")
				.matches(/^[a-zA-Z0-9]+$/, "Special characters are not allowed"),
			confirmNumber: Yup.string()
				.oneOf([Yup.ref("accountNumber"), null], "Account Numbers must match")
				.required("Required"),
			swiftCode: Yup.string()
				.required("Required")
				.matches(
					/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
					"Enter valid swift code"
				),
			extraField: Yup.string().required("Required"),
		}),
	});

	const validateForm = (values) => {
		const errors = {};
		// Check if all fields are required

		const pd ={ ...values.personalDetails, countryCode: "+91"}
		Object.keys(pd).forEach((key) => {
		  if (!pd[key]) {
			errors[key] = `${key} is required`;
		  }
		});

		Object.keys(values.company).forEach((key) => {
			if (!values.company[key] ) {
			  errors[key] = `${key} is required`;
			}
		  });

		  Object.keys(values.address).forEach((key) => {
			if (!values.address[key] ) {
			  errors[key] = `${key} is required`;
			}
		  });

		  Object.keys(values.bank).forEach((key) => {
			if (!values.bank[key] ) {
			  errors[key] = `${key} is required`;
			}
		  });

		  console.log("bank: ", values.bank);
	  
		// Check if email is valid
		if (values.personalDetails.email) {
		  if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.personalDetails.email)) {
			errors.email = "Please enter a valid email address";
		  }
		}

		// Check if phone number valid
		if (values.personalDetails.phone) {
			const regex = /^\d{10}$/;
			if (regex.test(values.personalDetails.phone)) {
			  errors.phone = "Please enter a valid phone number";
			}
		  }

		// Check if password is valid
		// if (values.personalDetails.password) {
		//   if (values.personalDetails.password.length < 8) {
		// 	errors.personalDetails.password = `Password must be at least 8 characters long`;
		//   }
		// }

		setErrors(errors);
		return errors;
	  };

	const onSubmit = values => {
		const countryCode = values?.personalDetails?.countryCode
			?.split("(")[1]
			?.split(")")[0];

		verifyEmail(values?.personalDetails?.email).then(res => {
			if (!res) {
				let requestData = {
					...data,
					...values,
					personalDetails: {
						...values.personalDetails,
						timezone: timezone?.filter(
							({ name }) => name === values.personalDetails.timezone
						)[0],
						countryCode,
					},
					bank: {
						name: values?.bank?.name,
						bankName: values?.bank?.bankName,
						accountNumber: values?.bank?.accountNumber,
						confirmNumber: values?.bank?.confirmNumber,
						swiftCode: values?.bank?.swiftCode,
					},
				};

				if (bankField?.key) {
					requestData = {
						...requestData,
						bank: {
							...requestData?.bank,
							extraField: {
								key: bankField?.key,
								value: bankField?.value,
								data: values?.bank?.extraField,
							},
						},
					};
				}

				setData(requestData);

				
			} else {
				toast.error("Email Already Exists");
			}
		});

		console.log("validate form ", validateForm(values))

		if(_.isEmpty(validateForm(values))){
			let requestData = {
				...data,
				...values,
				personalDetails: {
					...values.personalDetails,
					countryCode: "+91",
					timezone: {
						time_zone: "sunt",
						utc_offset: "est ea Lorem",
						name: "ut"
					  },
				},
				bank: {
					name: values?.bank?.name,
					bankName: values?.bank?.bankName,
					accountNumber: values?.bank?.accountNumber,
					confirmNumber: values?.bank?.confirmNumber,
					swiftCode: values?.bank?.swiftCode,
					extraField: {
						"key": "ifsc",
						"value": "IFSC Code",
						"data": values?.bank?.ifsc
					  }
				},
			};

			setData(requestData);
			nextStep();
			
		}

		
		
	};

	return (
		<Box width={{ xs: "unset", sm: "60vw" }} maxHeight='80vh' overflow='auto'>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={onSubmit}
				innerRef={form}>
				<Form>
					<Box display='flex' flexDirection='column' gap='1rem'>
						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								PERSONAL DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.firstName'
										label='First Name'
										error={Boolean(errors?.firstName)}
										helperText={errors?.firstName}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.lastName'
										label='Last Name'
										error={Boolean(errors?.lastName)}
										helperText={errors?.lastName}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.email'
										label='Work Email'
										type='email'
										error={Boolean(errors?.email)}
										helperText={errors?.email}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("personalDetails.email", value);

											if (!value) return;

											// if (debounceTimer) clearTimeout(debounceTimer);
											// debounceTimer = setTimeout(() => {
											// 	debounceTimer = null;

											// 	verifyEmail(value).then(res => {
											// 		if (res) toast.error("Email Already Exists");
											// 	});
											// }, 2000);
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									{/* <FieldInput
										name='personalDetails.jobTitle'
										label='Job Title'
									/> */}
									<Field name='personalDetails.countryCode'>
										{props => {
											const { field, meta } = props || {};
											return (
												<div style={{ display: "flex" }}>
													<DropdownWithSearch
														style={{ width: "70px" }}
														name={field.name}
														placeholder='Country Code'
														options={countries?.map(
															({ phonecode, name }) => `${name} (${phonecode})`
														)}
														value={field.value}
														handleOnChange={({ key, value }) => {
															field.onChange({
																target: { name: key, value },
															});
														}}
														inputProps={{
															error: meta.touched && meta.error ? true : false,
															helperText:
																meta.touched && meta.error ? meta.error : null,
														}}></DropdownWithSearch>

													<FieldInput
														name='personalDetails.phone'
														label='Contact Number'
														style={{ marginLeft: "23px" }}
														type='tel'
														error={Boolean(errors?.phone)}
														helperText={errors?.phone}
													/>
												</div>
											);
										}}
									</Field>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.jobTitle'
										label='Job Title'
										// style={{ marginLeft: "23px" }}
										error={Boolean(errors?.jobTitle)}
										helperText={errors?.jobTitle}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.timezone'
										label='Time Zone'
										error={Boolean(errors?.timezone)}
										helperText={errors?.timezone}
									/>
								</Grid>
								{/* <Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.password'
										label='Password'
									/>
								</Grid> */}
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								COMPANY DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput 
										name='company.companyName' 
										label='Company Name' 
										error={Boolean(errors?.companyName)}
										helperText={errors?.companyName}
										/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.yearFounded'
										label='Year Founded'
										error={Boolean(errors?.yearFounded)}
										helperText={errors?.yearFounded}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.employeeCount'
										label='Employee Count'
										error={Boolean(errors?.employeeCount)}
										helperText={errors?.employeeCount}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.studentPerYear'
										label='Students per Year'
										error={Boolean(errors?.studentPerYear)}
										helperText={errors?.studentPerYear}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='text'
										name='company.entityType'
										label='Entity Type'
										error={Boolean(errors?.entityType)}
										helperText={errors?.entityType}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='company.taxNumber'
										label='Tax Number or VAT'
										error={Boolean(errors?.taxNumber)}
										helperText={errors?.taxNumber}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("company.taxNumber", value?.toUpperCase());
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='text'
										name='company.country'
										label='Registered Country'
										error={Boolean(errors?.country)}
										helperText={errors?.country}
									/>
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								ADDRESS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput 
										name='address.address' 
										label='Address' 
										error={Boolean(errors?.address)}
										helperText={errors?.address}
										/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='address.zipCode'
										error={Boolean(errors?.zipCode)}
										helperText={errors?.zipCode}
										placeholder='Postal Code'
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("address.zipCode", value);

											if (!value) return;

											// if (debounceTimer) clearTimeout(debounceTimer);
											// debounceTimer = setTimeout(() => {
											// 	debounceTimer = null;
											// 	getPincodeData(value).then(
											// 		({ city, state, country }) => {
											// 			setFieldValue("address.city", city);
											// 			setFieldValue("address.state", state);
											// 			setFieldValue("address.country", country);
											// 		}
											// 	);
											// }, 2000);
										}}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FieldInput 
										name='address.city' 
										label='City'
										error={Boolean(errors?.city)}
										helperText={errors?.city} 
										/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FieldInput 
										name='address.state' 
										label='State' 
										error={Boolean(errors?.state)}
										helperText={errors?.state}
										/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FieldInput 
										name='address.country' 
										label='Country' 
										error={Boolean(errors?.country)}
										helperText={errors?.country}
										/>
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								BANK DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput 
										name='bank.name' 
										label='Account Holder Name' 
										error={Boolean(errors?.name)}
										helperText={errors?.name}
										/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput 
										name='bank.bankName' 
										label='Bank Name' 
										error={Boolean(errors?.bankName)}
										helperText={errors?.bankName}
										/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.accountNumber'
										label='Account Number'
										error={Boolean(errors?.accountNumber)}
										helperText={errors?.accountNumber}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.confirmNumber'
										label='Confirm Account Number'
										error={Boolean(errors?.confirmNumber)}
										helperText={errors?.confirmNumber}
									/>
								</Grid>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput 
										name='bank.ifsc' 
										label='IFSC Code' 
										error={Boolean(errors?.ifsc)}
										helperText={errors?.ifsc}
										/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.swiftCode'
										label='Swift Code'
										error={Boolean(errors?.swiftCode)}
										helperText={errors?.swiftCode}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("bank.swiftCode", value?.toUpperCase());
										}}
									/>
								</Grid>

								{bankField?.key && (
									<Grid item md={6} sm={6} xs={12}>
										<FieldInput
											name='bank.ifsc'
											error={Boolean(errors?.ifsc)}
											helperText={errors?.ifsc}
											label={`${bankField.value}`}
											onChange={({ target: { value } }) => {
												const { current: { setFieldValue } = {} } = form || {};

												setFieldValue("bank.ifsc", value?.toUpperCase());
											}}
										/>
									</Grid>
								)}
							</Grid>
						</Box>

						<Box display='flex' justifyContent='right' m='1rem 0'>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{
									textTransform: "none",
									bgcolor: "#f37b21 !important",
									borderRadius: "32px",
									width: "140px",
									height: "40px",
								}}>
								Save and Next
							</Button>
						</Box>
					</Box>
				</Form>
			</Formik>
		</Box>
	);
};

export default Step1;
