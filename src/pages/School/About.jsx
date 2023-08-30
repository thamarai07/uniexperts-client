import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const About = ({ data = "N/A" }) => {
	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Typography fontSize='0.825rem'>{data}</Typography>
		</Box>
	);
};

export default About;
