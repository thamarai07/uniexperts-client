import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Success = () => {
	return (
		<Box
			flexGrow={1}
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'>
			<CheckCircleIcon color='success' sx={{ fontSize: "7rem" }} />

			<Typography fontSize='1.2rem' fontWeight={500}>
				Completed successfully.
			</Typography>

			<Typography fontSize='1rem' align='center' mt='1rem'>
				Your withdrawal request is created. You will receive an <br />
				email as soon as the payment is approved.
			</Typography>
		</Box>
	);
};

const Failed = () => {
	return (
		<Box
			flexGrow={1}
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'>
			<ErrorIcon color='error' sx={{ fontSize: "7rem" }} />

			<Typography fontSize='1.2rem' fontWeight={500}>
				Failed
			</Typography>

			<Typography fontSize='1.2rem' fontWeight={500}>
				Please try again.
			</Typography>

			<Typography fontSize='0.825rem' mt='1rem'>
				Please contact <Link to={RouteNames.support}>support</Link> if any issue
			</Typography>
		</Box>
	);
};

const Status = ({ data: { status } }) => {
	return status === "success" ? <Success /> : <Failed />;
};

export default Status;
