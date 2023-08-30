import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStudentProgress } from "apis/student";
import { useEffect, useState } from "react";

const CircularProgressWithLabel = ({ value = 0 }) => (
	<Box
		sx={{
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
		<CircularProgress
			thickness={5}
			sx={{ color: "rgb(243 123 33 / 20%)" }}
			size={"15rem"}
			variant='determinate'
			value={100}
		/>

		<CircularProgress
			thickness={5}
			sx={{ color: "#f37b21", position: "absolute" }}
			size={"15rem"}
			variant='determinate'
			value={value}
		/>

		<Typography
			fontSize='1.2rem'
			fontWeight={500}
			color='#f37b21'
			align='center'
			sx={{ position: "absolute" }}>
			{Math.round(value)}% <br /> Complete
		</Typography>
	</Box>
);

const Progress = ({ studentId }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		getStudentProgress(studentId).then(response => setProgress(response));
	}, []);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap='1rem'
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem'
			height='22rem'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				Profile Status
			</Typography>

			<CircularProgressWithLabel value={progress} />
		</Box>
	);
};

export default Progress;
