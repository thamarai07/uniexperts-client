import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Button, Checkbox } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader, setUser } from "store";
import { signup } from "apis/auth";
import { signupValidation } from "utils/validations";
import FieldInput from "components/FieldInput";

import style from "./style.module.scss"

const Step2 = ({ data = {}, setData, nextStep, onSubmit }) => {
	const [conditions, setConditions] = useState({
		condition1: false,
		condition2: false,
		condition3: false,
		condition4: false,
		condition5: false,
	});
	const dispatch = useDispatch();

	const [confPasswordError, setConfirmpasswordError] = useState("");

	const calculateConditions = (password) => {
		setConditions({
			condition1: password.length >= 12,
			condition2: /[!@#$%^&*]/.test(password),
			condition3: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
			condition4: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password),
		});
	};

	const history = useHistory();

	const initialValues = { password: "", confirmPassword: "" };

	// Define a custom function to handle form submission
	const handleSubmit = values => {
		onSubmit();

		// dispatch(setLoader(true))
		if (values.password !== values.confirmPassword) {
			setConfirmpasswordError("Password and confirm password are not the same");
			return;
		}

		if (conditions.condition1 && conditions.condition2 && conditions.condition3 && conditions.condition4) {
			setData({ ...data, password: values.password })
			const reqData = { ...data, password: values.password };
			signup(reqData).then(res => {
				// console.log(">>>>>>>>>> SUCCESS STEP 2");
				nextStep();
			}).finally(() => dispatch(setLoader(false)))
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			// validationSchema={signupValidation}
			onSubmit={handleSubmit} // Use the custom handleSubmit function
		>
			{({ values, handleChange, errors }) => (
				<Form>
					<Box display='flex' flexDirection='column' gap='1rem'>
						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								Set Password
							</Typography>
							<Box display='flex' gap='0.5rem'>
								<Checkbox
									checked={conditions.condition1}
									disabled
									sx={{
										"&.Mui-checked": {
											color: "#f37b21",
										},
									}}
								/>
								<Typography variant='body2' sx={{ marginTop: "10px" }}>
									At least 12 characters (required for your Muhlenberg password) -
									the more characters, the better.
								</Typography>
							</Box>

							<Box display='flex' gap='0.5rem'>
								<Checkbox
									checked={conditions.condition2}
									disabled
									sx={{
										"&.Mui-checked": {
											color: "#f37b21",
										},
									}}
								/>
								<Typography variant='body2' sx={{ marginTop: "10px" }}>
									Include of at least one special character, e.g.,! @ # ?
								</Typography>
							</Box>

							<Box display='flex' gap='0.5rem'>
								<Checkbox
									checked={conditions.condition3}
									disabled
									sx={{
										"&.Mui-checked": {
											color: "#f37b21",
										},
									}}
								/>
								<Typography variant='body2' sx={{ marginTop: "10px" }}>
									A mixture of both uppercase and lowercase letters
								</Typography>
							</Box>

							<Box display='flex' gap='0.5rem'>
								<Checkbox
									checked={conditions.condition4}
									disabled
									sx={{
										"&.Mui-checked": {
											color: "#f37b21",
										},
									}}
								/>
								<Typography variant='body2' sx={{ marginTop: "10px" }}>
									A mixture of letters and numbers
								</Typography>
							</Box>

							<FieldInput
								type='password'
								name='password'
								placeholder='Enter your password here'
								onChange={e => {
									handleChange(e);
									calculateConditions(e.target.value);
								}}
							/>
							{errors.password && (
								<Typography variant='caption' color='error'>
									{errors.password}
								</Typography>
							)}
							<div style={{ marginTop: 20 }} >
								<FieldInput
									type='password'
									name='confirmPassword'
									placeholder='Re-enter your password here'
									error={Boolean(confPasswordError)}
									helperText={confPasswordError}
								/>
							</div>
							{errors.confirmPassword && (
								<Typography variant='caption' color='error'>
									{errors.confirmPassword}
								</Typography>
							)}
						</Box>

						{/* <Box display='flex' justifyContent='center' m='1rem 0'>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{
									textTransform: "none",
									bgcolor: "#f37b21 !important",
								}}>
								Continue
							</Button>
						</Box> */}
						<Box className={style.saveCtaContainer}>
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
									color: "white"
								}}>
								Save and Next
							</Button>
						</Box>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default Step2;
