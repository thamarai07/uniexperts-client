import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const School = data => {
	const {
		basicDetails: { logo, name },
		address: { city, country },
		id,
	} = data || {};

	const history = useHistory();

	return (
		<Grid item xs={12} sm={4}>
			<Box
				display='flex'
				gap='1rem'
				border='1px solid #000'
				borderRadius='0.25rem'
				p='1rem 1.25rem'
				height='100%'
				sx={{ cursor: "pointer" }}
				onClick={() => history.push(RouteNames.school?.replace(":id", id))}>
				<Avatar src={logo} alt='' />

				<Box>
					<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
						{name}
					</Typography>

					<Typography fontSize='0.825rem'>{`${city}, ${country}`}</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

const Schools = ({ data }) => {
	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			{data?.length ? (
				<Grid container spacing={2}>
					{data?.map(school => (
						<School key={school?.id} {...school} />
					))}
				</Grid>
			) : (
				<Box>
					<Typography fontSize='0.825rem' align='center'>
						No Data !
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default Schools;
