import { Avatar, Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Details = ({ name, schoolId, city, icon }) => {
	const history = useHistory();

	const aboutCollege = () => {
		history.push(RouteNames.school?.replace(":id", schoolId));
	};

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
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
				<Avatar src={icon} alt='' sx={{ height: "8rem", width: "8rem" }} />

				<Box>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						{name}
					</Typography>

					<Typography fontSize='1rem'>{city}</Typography>

					<Box
						mt='1.5rem'
						display='flex'
						alignItems='center'
						gap='1rem'
						justifyContent={{ xs: "center", sm: "flex-start" }}>
						<Button
							variant='contained'
							size='small'
							onClick={aboutCollege}
							sx={{
								bgcolor: "#f37b21 !important",
								textTransform: "none",
							}}>
							About College
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
export default Details;
