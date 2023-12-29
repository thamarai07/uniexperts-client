import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { forgotPassword, verifyEmail, verifyOTP } from "apis/auth";
import uniexperts_logo from "assets/uniexperts_logo.svg";
import FieldInput from "components/FieldInput";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import { forgotValidation } from "utils/validations";
import style from "./style.module.scss";
import Loader from "components/Loader";
import { AuthLayout } from "pages/Layouts/AuthLayout";

const Forgot = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState(null);
	const [otp, setOtp] = useState("");
	const [resendCounter, setResendCounter] = useState(59);
	const [isLoading, setIsLoading] = useState(false);

	const [isEmailVerified, setIsEmailVerified] = useState(null);

	// set the counter to 59s for resend btn , after the 59s , enable the resend button
	useEffect(() => {
		const counter =
			resendCounter > 0 &&
			step === 2 &&
			setInterval(() => setResendCounter(resendCounter - 1), 1000);

		return () => clearInterval(counter);
	});

	useEffect(() => {
		setOtp("");
	}, [step]);

	const initialValues = { email: email || "" };

	const sendOtp = values => {
		verifyEmail(values.email)
			.then(res => {
				if (res === true) {
					setIsEmailVerified(true);
					setIsLoading(true);
					setEmail(values.email);
					setStep(2);
					forgotPassword(values).then(() => {
						toast.success("OTP Send Successfully");
						setEmail(values.email);
						setStep(2);
					});
				} else if (res && res.data === false && res.statusCode === 200) {
					setIsEmailVerified(false);
				}
			})
			.catch(error => {
				// Handle any error that may occur during the request
				console.error(error);
			});

		setIsLoading(false);
	};

	const resendOtp = () => {
		setIsLoading(true);
		forgotPassword({ email }).then(() => {
			toast.success("OTP Send Successfully");
			setResendCounter(59);
		});
		setIsLoading(false);
	};

	const submitOtp = () => {
		setIsLoading(true);
		const data = { email, otp };
		dispatch(setLoader(true));

		verifyOTP(data)
			.then(res => {
				if (res.statusCode == 200) {
					history.push({ pathname: RouteNames.reset, state: data.email });
				} else {
					setIsEmailVerified("OTP_NOT_VALID");
				}
			})
			.finally(() => {
				dispatch(setLoader(false));
				setIsLoading(false);
			});
	};

	if (isLoading) {
		<Loader />;
	}

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
				<Box p='3.75rem' gap='2rem'>
					<Box alignItems='center' justifyContent='space-between'>
						<Typography fontSize='24px' fontWeight={600}>
							Forgot Password ?
						</Typography>
						{step === 1 && (
							<Typography fontSize='16px' fontWeight={500} color='#48464C'>
								Enter your registered email address
							</Typography>
						)}
						{/* <p style={{ marginTop: "12px" }}>Set password for your account</p> */}
					</Box>

					{step === 1 ? (
						<div style={{ minWidth: "50vw" }}>
							<Formik
								initialValues={initialValues}
								validationSchema={forgotValidation}
								onSubmit={sendOtp}>
								<Form>
									<Box
										bgcolor='#FBFBFB'
										p='2.5rem'
										borderRadius='10px'
										marginTop={"2.75rem"}>
										<FieldInput
											name='email'
											label='Email'
											placeholder='Email'
											size='large'
										/>
										{isEmailVerified !== null && !isEmailVerified && (
											<p
												style={{
													fontSize: "12px",
													fontWeight: "400",
													color: "#DC362E",
													marginLeft: "4px",
													marginTop: "4px",
												}}>
												Sorry this email does not exist
											</p>
										)}
									</Box>

									<Box display='flex' justifyContent='right' mt='2rem'>
										<Button
											variant='contained'
											size='small'
											type='submit'
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												padding: "14px 24px",
											}}>
											Send OTP
										</Button>
									</Box>
								</Form>
							</Formik>
						</div>
					) : null}

					{step === 2 ? (
						<Box minWidth='50vw'>
							<Typography fontSize='1rem' fontWeight={500}>
								OTP sent to <span style={{ color: "#4F47A6" }}>{email}</span>{" "}
								<Button
									variant='text'
									size='small'
									onClick={() => setStep(1)}
									sx={{ textTransform: "none", color: "#000 !important" }}>
									Change
								</Button>
							</Typography>

							<Box
								bgcolor='#FBFBFB'
								p='2.5rem'
								borderRadius='10px'
								marginTop={"2rem"}>
								<Typography fontSize='16px' fontWeight={500}>
									Enter OTP
								</Typography>

								<OtpInput
									name='otp'
									value={otp}
									onChange={setOtp}
									containerStyle={style["otp-input"]}
									inputStyle={style.otp}
									numInputs={4}
									isInputNum
								/>
							</Box>
							{isEmailVerified === "OTP_NOT_VALID" && (
								<p
									style={{
										fontSize: "12px",
										fontWeight: "400",
										color: "#DC362E",
										marginLeft: "4px",
										marginTop: "4px",
									}}>
									You have entered a wrong OTP, please retry
								</p>
							)}

							<Box
								display='flex'
								flexDirection='row'
								alignItems='center'
								justifyContent='space-between'
								gap='1rem'
								mt='2rem'>
								<Button
									variant='text'
									size='small'
									sx={{
										textTransform: "none",
										color: "#000 !important",
										"&:disabled": {
											color: "rgba(0, 0, 0, 0.26) !important",
										},
									}}
									disabled={resendCounter > 0}
									onClick={resendOtp}>
									{resendCounter > 0
										? `Resend OTP ${
												resendCounter > 0 ? `in ${resendCounter}s` : ""
										  }`
										: `Didn’t receive OTP? Resend`}
								</Button>
								<Button
									variant='contained'
									size='small'
									type='submit'
									disabled={!(otp.length === 4)}
									sx={{
										textTransform: "none",
										bgcolor: "#f37b21 !important",
										"&:disabled": {
											bgcolor: "rgba(0, 0, 0, 0.12) !important",
										},
										padding: "14px 24px",
										fontWeight: 600,
									}}
									onClick={submitOtp}>
									Confirm
								</Button>
							</Box>
						</Box>
					) : null}
				</Box>
			</Box>
		</AuthLayout>
	);
};

export default Forgot;
