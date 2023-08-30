import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getAccountSummary } from "apis/payment";
import CustomTextField from "components/CustomTextField";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const Step2 = ({ data, setData, nextStep, prevStep, handleOnChange }) => {
	const dispatch = useDispatch();

	const { amount } = data || {};

	const [error, setError] = useState("");

	useEffect(() => {
		dispatch(setLoader(true));

		getAccountSummary(data?.selectedCurrency?.symbol)
			.then(res => setData({ ...data, accountSummary: res }))
			.finally(dispatch(setLoader(false)));
	}, []);

	useEffect(() => {
		if (+amount > +data?.accountSummary?.currentWalletAmount) {
			setError("You don't have enough balance to withdraw this amount.");
			return;
		}

		setError(null);
	}, [data?.amount, data?.accountSummary?.currentWalletAmount]);

	return (
		<>
			<Box
				display='flex'
				flexDirection='column'
				gap='1rem'
				flexGrow={1}
				mb='1rem'>
				<CustomTextField value={data?.selectedCurrency?.name} disabled />

				<CustomTextField
					name='amount'
					type='number'
					value={data?.amount}
					placeholder='Amount'
					handleOnChange={handleOnChange}
					helperText={error}
					error={error}
					onKeyDown={event => {
						const { key } = event || {};

						if (key === "e" || key === "E" || key === "+" || key === "-") {
							event.preventDefault();
						}
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								{data?.selectedCurrency?.sign}
							</InputAdornment>
						),
					}}
				/>

				<Box bgcolor='#f2f2f2' p='1rem 1.25rem' borderRadius='0.625rem'>
					<Typography fontSize='0.825rem'>
						{`Your Current Balance: 
					${data?.selectedCurrency?.sign}
					${(+data?.accountSummary?.currentWalletAmount)?.toFixed(2)} (${
							data?.selectedCurrency?.symbol
						})`}
					</Typography>
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
					onClick={nextStep}
					disabled={!(+amount > 0) || error}
					endIcon={<KeyboardArrowRightIcon />}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgb(0 0 0 / 12%)!important",
						},
					}}>
					Next
				</Button>
			</Box>
		</>
	);
};

export default Step2;
