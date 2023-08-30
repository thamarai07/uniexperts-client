import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { Box, Grid, Typography } from "@mui/material";
import { getReportData } from "apis/report";
import { useEffect, useState } from "react";

const Cards = () => {
	const [data, setData] = useState({});

	useEffect(() => {
		getReportData().then(setData);
	}, []);

	return (
		<Grid container spacing={2}>
			<Card label='Agent Applications' value={data?.agentApplications} />
			<Card
				label='This Month Applications'
				value={data?.thisMonthApplications}
			/>
			<Card label='Total Applications' value={data?.totalApplications} />
		</Grid>
	);
};

const Card = ({ label, value = 0 }) => (
	<Grid item xs={12} sm={4}>
		<Box
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem 1.25rem'
			overflow='hidden'
			display='flex'
			alignItems='center'
			color='#3734A9'
			height='100%'
			gap='1rem'>
			<FolderCopyIcon sx={{ height: "3rem", width: "3rem" }} />

			<Box color='#505887'>
				<Typography fontSize='1.25rem' fontWeight={700}>
					{label}
				</Typography>

				<Typography
					fontSize='1.125rem'
					fontWeight={700}
					sx={{ opacity: "0.8" }}>
					{value}
				</Typography>
			</Box>
		</Box>
	</Grid>
);

export default Cards;
