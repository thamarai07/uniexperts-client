import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import { Button, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import { getAgentBankingInformation } from "apis/agent";
import { withdrawAmount } from "apis/payment";
import CustomTextField from "components/CustomTextField";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const Step3 = ({ data, setData, nextStep, prevStep }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setLoader(true));

		getAgentBankingInformation()
			.then(res => {
				setData({ ...data, bankInfo: res });
			})
			.finally(dispatch(setLoader(false)));
	}, []);

	const onSubmit = () => {
		dispatch(setLoader(true));

		withdrawAmount({
			currency: data?.selectedCurrency?.symbol,
			amount: data?.amount,
			date: new Date(),
		})
			.then(({ id }) => {
				setData({
					...data,
					transactionId: id,
				});
				nextStep();
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<>
			<Box flexGrow={1} mb='1rem'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.name}
							placeholder='Account Holder Name'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.bankName}
							placeholder='Bank Name'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.extraField?.data}
							placeholder='Bank Code'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.accountNumber}
							placeholder='Account Number'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.accountNumber}
							placeholder='Re-enter Account Number'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField
							disabled
							value={data?.bankInfo?.swiftCode}
							placeholder='Swift Code'
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<LockIcon sx={{ scale: "0.75" }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
			</Box>

			<Typography>
				Please contact <Link to={RouteNames.support}>support</Link> in order to
				edit above information
			</Typography>

			<Box
				mt='1rem'
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
					onClick={onSubmit}
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

export default Step3;
