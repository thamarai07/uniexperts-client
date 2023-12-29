import { Box, Button, Typography } from "@mui/material";
import { resetPassword } from "apis/auth";
import FieldInput from "components/FieldInput";
import Loader from "components/Loader";
import { Form, Formik } from "formik";
import { AuthLayout } from "pages/Layouts/AuthLayout";
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
		setIsLoading(true);
		resetPassword({ email, password: values?.password })
			.then(userDetails => {
				toast.success("Password reset Successful");
				dispatch(setUser(userDetails));
				history.push(RouteNames.dashboard);
			})
			.finally(() => setIsLoading(false));
	};

	if (isLoading) return <Loader />;

	return (
		<AuthLayout>
			<Box
				minHeight='calc(100vh - 72px)'
				display='flex'
				alignItems={"start"}
				justifyContent={"center"}
				maxWidth={"100vw"}
				marginInline='auto'
				bgcolor={"#F0F1F5"}>
				<Box p='3.75rem'>
					<Box
						borderRadius='0.625rem'
						minWidth='50vw'
						display='flex'
						flexDirection='column'
						height={"100%"}>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'>
							<Typography fontSize='1.75rem' fontWeight={500}>
								Reset Password
							</Typography>
						</Box>

						<Formik
							initialValues={initialValues}
							validationSchema={resetValidation}
							onSubmit={onSubmit}>
							<Form>
								<Box
									bgcolor='#fbfbfb'
									p='2.5rem'
									borderRadius='10px'
									marginTop={"2.75rem"}>
									<Box display='flex' flexDirection='column' gap='1rem'>
										<FieldInput
											name='password'
											type='password'
											placeholder='Enter Password'
											size='large'
										/>

										<FieldInput
											name='confirmPassword'
											type='password'
											placeholder='Confirm Password'
											size='large'
										/>

										<Typography
											fontSize='0.75rem'
											sx={{ opacity: "0.6", maxWidth: "35rem" }}>
											Passwords must contain 8 characters, including an
											uppercase letter, a lowercase letter, a number, and a
											special case character
										</Typography>
									</Box>
								</Box>
								<Box display='flex' justifyContent='end' mt='2.75rem'>
									<Button
										variant='contained'
										size='small'
										type='submit'
										sx={{
											textTransform: "none",
											bgcolor: "#f37b21 !important",
											padding: "14px 24px",
										}}>
										Reset Password
									</Button>
								</Box>
							</Form>
						</Formik>
					</Box>
				</Box>
			</Box>
		</AuthLayout>
	);
};

export default Reset;
