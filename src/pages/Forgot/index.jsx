import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { forgotPassword, verifyOTP } from "apis/auth";
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

const Forgot = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState(null);
	const [otp, setOtp] = useState("");
	const [resendCounter, setResendCounter] = useState(59);

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
		setEmail(values.email);
		setStep(2);
		forgotPassword(values).then(() => {
			toast.success("OTP Send Successfully");
			setEmail(values.email);
			setStep(2);
		});
	};

	const resendOtp = () => {
		forgotPassword({ email }).then(() => {
			toast.success("OTP Send Successfully");
			setResendCounter(59);
		});
	};

	const submitOtp = () => {
		const data = { email, otp };
		dispatch(setLoader(true));

		verifyOTP(data)
			.then(() => {
				history.push({ pathname: RouteNames.reset, state: data.email });
			})
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<Box
			// bgcolor='#fff'
			minHeight='30vh'
			display='flex'
			alignItems={{ xs: "unset", sm: "center" }}
			justifyContent='center'>
			<Box
				// bgcolor='#fff'
				p='1rem 1.25rem'
				// borderRadius='0.625rem'
				flexGrow={{ xs: 1, sm: "unset" }}
				minWidth='40vw'
				// display='flex'
				// flexDirection='column'
				gap='2rem'>
				<Box alignItems='center' justifyContent='space-between'>
					<img src={uniexperts_logo} alt='' />
					<Typography fontSize='1.8rem' fontWeight={700} marginTop={6}>
						Forgot Password ?
					</Typography>
					{/* <p style={{ marginTop: "12px" }}>Set password for your account</p> */}
				</Box>

				{step === 1 ? (
					<Formik
						initialValues={initialValues}
						validationSchema={forgotValidation}
						onSubmit={sendOtp}>
						<Form>
							<FieldInput
								name='email'
								label='Email'
								placeholder='Enter your email here'
								style={{ marginTop: "3rem" }}
							/>

							<Box display='flex' justifyContent='right' mt='2rem'>
								<Button
									variant='contained'
									size='small'
									type='submit'
									sx={{
										textTransform: "none",
										bgcolor: "#f37b21 !important",
										height: "40px",
										width: "140px",
										borderRadius: "32px",
										float: "right",
									}}>
									Send OTP
								</Button>
							</Box>
						</Form>
					</Formik>
				) : null}

				{step === 2 ? (
					<Box>
						<Typography fontSize='0.75rem'>Sending OTP to {email}</Typography>

						<Box display='flex' gap='0.5rem' alignItems='center'>
							<Typography fontSize='0.825rem'>Not your email?</Typography>

							<Button
								variant='text'
								size='small'
								endIcon={<EditIcon />}
								onClick={() => setStep(1)}
								sx={{ textTransform: "none", color: "#f37b21 !important" }}>
								Change
							</Button>
						</Box>

						<Typography fontSize='1rem' mt='2rem'>
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

						<Box
							display='flex'
							flexDirection='row'
							alignItems='center'
							justifyContent='center'
							gap='1rem'
							mt='2rem'>
							<Button
								variant='text'
								size='small'
								sx={{
									textTransform: "none",
									color: "#f37b21 !important",
									"&:disabled": {
										color: "rgba(0, 0, 0, 0.26) !important",
									},
									borderRadius: "23px",
									height: "30px",
									width: "140px",
									border: "1px solid rgb(138, 138, 138)",
								}}
								disabled={resendCounter > 0}
								onClick={resendOtp}>
								{`Resend OTP ${
									resendCounter > 0 ? `in ${resendCounter}s` : ""
								}`}
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
									borderRadius: "23px",
									height: "30px",
									width: "100px",
								}}
								onClick={submitOtp}>
								Confirm
							</Button>
						</Box>
					</Box>
				) : null}
			</Box>
		</Box>
	);
};

export default Forgot;
