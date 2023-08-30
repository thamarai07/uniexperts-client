import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Details = ({
	logo,
	name,
	schoolId,
	foundedYear,
	schoolType,
	totalStudents,
	internationStudents,
	address: { city, country } = {},
	browsePrograms,
}) => {
	return (
		<Box
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem 1.25rem'
			display='flex'
			flexDirection={{ xs: "column", sm: "row" }}
			alignItems={{ xs: "center", sm: "flex-start" }}
			justifyContent='space-between'
			gap='1rem'>
			<Box
				display='flex'
				flexDirection={{
					xs: "column",
					sm: "row",
				}}
				textAlign={{
					xs: "center",
					sm: "left",
				}}
				alignItems='center'
				gap='1rem'>
				<Avatar src={logo} alt='' sx={{ height: "8rem", width: "8rem" }} />

				<Box>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						{name}
					</Typography>

					<Typography fontSize='1rem'>{`${city}, ${country}`}</Typography>

					<Typography fontSize='0.825rem' color='#f37b21'>
						School Id: {schoolId}
					</Typography>

					<Typography fontSize='0.825rem'>
						{` Founded: ${foundedYear} | Type: ${schoolType} | Total Students: ${totalStudents}+ | Int. Students: ${internationStudents}+`}
					</Typography>
				</Box>
			</Box>

			<Button
				variant='contained'
				size='small'
				sx={{
					bgcolor: "#f37b21 !important",
					textTransform: "none",
				}}
				onClick={browsePrograms}>
				Browse Programs
			</Button>
		</Box>
	);
};

export default Details;
