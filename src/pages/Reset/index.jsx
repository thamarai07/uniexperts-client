import { Box, Button, Typography } from "@mui/material";
import { resetPassword } from "apis/auth";
import uniexperts_logo from "assets/uniexperts_logo.svg";
import FieldInput from "components/FieldInput";
import Loader from "components/Loader";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import { setUser } from "store";
import { resetValidation } from "utils/validations";

const initialValues = { password: "", confirmPassword: "" };

const Reset = ({ location = {}, history }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (location.state) {
			setEmail(location.state);
			window.history.replaceState({}, "");
			return;
		}

		history.goBack();
	}, []);

	const onSubmit = values => {
		setIsLoading(true)
		resetPassword({ email, password: values?.password }).then(userDetails => {
			toast.success("Password reset Successful");
			dispatch(setUser(userDetails));
			history.push(RouteNames.dashboard);
		}).finally(() => setIsLoading(false));
	};


	if (isLoading) return <Loader />

	return (
		<Box
			bgcolor='rgba(243, 123, 33, 0.25)'
			minHeight='100vh'
			display='flex'
			alignItems={{ xs: "unset", sm: "center" }}
			justifyContent='center'>
			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				flexGrow={{ xs: 1, sm: "unset" }}
				minWidth='40vw'
				display='flex'
				flexDirection='column'
				gap='2rem'>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Reset Password
					</Typography>

					<img src={uniexperts_logo} alt='' />
				</Box>

				<Formik
					initialValues={initialValues}
					validationSchema={resetValidation}
					onSubmit={onSubmit}>
					<Form>
						<Box display='flex' flexDirection='column' gap='1rem'>
							<FieldInput
								name='password'
								type='password'
								placeholder='Enter your password here'
							/>

							<FieldInput
								name='confirmPassword'
								type='password'
								placeholder='Re-enter your password here'
							/>

							<Typography
								fontSize='0.75rem'
								sx={{ opacity: "0.6", maxWidth: "35rem" }}>
								Passwords must contain 8 characters, including an uppercase
								letter, a lowercase letter, a number, and a special case
								character
							</Typography>

							<Box display='flex' justifyContent='center' mt='1rem'>
								<Button
									variant='contained'
									size='small'
									type='submit'
									sx={{
										textTransform: "none",
										bgcolor: "#f37b21 !important",
									}}>
									Change Password
								</Button>
							</Box>
						</Box>
					</Form>
				</Formik>
			</Box>
		</Box>
	);
};

export default Reset;
