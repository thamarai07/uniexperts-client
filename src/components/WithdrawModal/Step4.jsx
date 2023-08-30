import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { verifyOTP } from "apis/payment";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";
import style from "./style.module.scss";

const Step4 = ({ data, setData, nextStep, prevStep }) => {
	const dispatch = useDispatch();

	const { user: { details: { email } = {} } = {} } = useSelector(
		state => state
	);

	const [otp, setOtp] = useState("");

	const validateOtp = () => {
		dispatch(setLoader(true));

		verifyOTP({ otp, transactionId: data?.transactionId })
			.then(() => {
				setData({
					...data,
					status: "success",
				});
			})
			.catch(() => {
				setData({
					...data,
					status: "failed",
				});
			})
			.finally(() => {
				dispatch(setLoader(false));
				nextStep();
			});
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
				alignItems='center'
				justifyContent='center'
				gap='1rem'>
				<Button
					variant='outlined'
					onClick={prevStep}
					startIcon={<KeyboardArrowLeftIcon />}
					sx={{
						color: "#f37b21 !important",
						borderColor: "#f37b21 !important",
						textTransform: "none",
					}}>
					Back
				</Button>

				<Button
					variant='contained'
					disabled={otp.length !== 4}
					onClick={validateOtp}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgb(0 0 0 / 12%)!important",
						},
					}}>
					Confirm
				</Button>
			</Box>
		</>
	);
};

export default Step4;
