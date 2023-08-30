import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { forgotPassword, resetPassword, verifyOTP } from "apis/auth";
import FieldInput from "components/FieldInput";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoader } from "store";
import { resetValidation } from "utils/validations";
import style from "./style.module.scss";

const EnterOTPSection = ({ nextStep, email }) => {
	const dispatch = useDispatch();

	const [otp, setOtp] = useState("");
	const [resendCounter, setResendCounter] = useState(59);

	useEffect(() => {
		_sendOTP();
	}, []);

	// set the counter to 59s for resend btn , after the 59s , enable the resend button
	useEffect(() => {
		const counter =
			resendCounter > 0 &&
			setInterval(() => setResendCounter(resendCounter - 1), 1000);

		return () => clearInterval(counter);
	});

	const _sendOTP = () => {
		forgotPassword({ email }).then(() => {
			toast.success("OTP Send Successfully");
			setResendCounter(59);
		});
	};

	const _verifyOTP = () => {
		dispatch(setLoader(true));

		verifyOTP({ email, otp })
			.then(() => {
				nextStep();
			})
			.finally(dispatch(setLoader(false)));
	};
	return (
		<>
			<Box
				display='flex'
				flexDirection='column'
				gap='1rem'
				flexGrow={1}
				mb='1rem'>
				<Typography fontSize='0.825rem'>
					OTP has been sent to{" "}
					<Typography
						fontSize='0.825rem'
						fontWeight={500}
						color='#4f47a6'
						display='inline'>
						{email}
					</Typography>
				</Typography>

				<Box>
					<Typography fontSize='1rem'>Enter OTP</Typography>

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
			</Box>

			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				gap='1rem'
				mt='2rem'>
				<Button
					variant='contained'
					size='small'
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": {
							bgcolor: "rgba(0, 0, 0, 0.12) !important",
						},
					}}
					disabled={otp.length !== 4}
					onClick={_verifyOTP}>
					Confirm
				</Button>

				<Button
					variant='text'
					size='small'
					sx={{
						textTransform: "none",
						color: "#f37b21 !important",
						"&:disabled": {
							color: "rgba(0, 0, 0, 0.26) !important",
						},
					}}
					onClick={_sendOTP}
					disabled={resendCounter > 0}>
					{`Resend OTP ${resendCounter > 0 ? `in ${resendCounter}s` : ""}`}
				</Button>
			</Box>
		</>
	);
};

const initialValues = { password: "", confirmPassword: "" };

const ResetPasswordSection = ({ email, setModalOpen }) => {
	const dispatch = useDispatch();

	const onSubmit = values => {
		resetPassword({ email, password: values?.password })
			.then(() => {
				toast.success("Password Change Successful");
				setModalOpen(false);
			})
			.finally(() => {
				dispatch(setLoader(false));
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={resetValidation}
			onSubmit={onSubmit}>
			<Form
				style={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}>
				<Box flexGrow={1} display='flex' flexDirection='column' gap='1rem'>
					<FieldInput
						name='password'
						type='password'
						placeholder='Enter your password here'
					/>

					<FieldInput
						name='confirmPassword'
						type='password'
						placeholder='Enter your password here'
					/>
				</Box>

				<Box display='flex' justifyContent='center'>
					<Button
						variant='contained'
						size='small'
						type='submit'
						sx={{ textTransform: "none", bgcolor: "#f37b21 !important" }}>
						Change Password
					</Button>
				</Box>
			</Form>
		</Formik>
	);
};

const ChangePassword = ({ isModalOpen, setModalOpen }) => {
	const { user: { details: { email } = {} } = {} } = useSelector(
		state => state
	);

	const [step, setStep] = useState(1);

	useEffect(() => {
		return () => {
			setStep(1);
		};
	}, []);

	const nextStep = () => {
		setStep(step + 1);
	};

	return (
		<Dialog
			open={isModalOpen}
			onClose={() => {
				setModalOpen(false);
				setStep(1);
			}}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "80vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box p='1rem 2rem' height='100%' display='flex' flexDirection='column'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					mb='1rem'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						{step === 1 ? "Enter OTP" : "Reset Password"}
					</Typography>

					<IconButton
						onClick={() => {
							setModalOpen(false);
						}}>
						<CloseIcon />
					</IconButton>
				</Box>

				{step == 1 ? (
					<EnterOTPSection nextStep={nextStep} email={email} />
				) : null}

				{step == 2 ? (
					<ResetPasswordSection
						email={email}
						setStep={setStep}
						setModalOpen={setModalOpen}
					/>
				) : null}
			</Box>
		</Dialog>
	);
};

export default ChangePassword;
