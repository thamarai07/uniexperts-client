import { Box, Typography } from "@mui/material";

const Requirements = ({ data = [] }) => {
	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<ul style={{ display: "grid", gap: "1rem", padding: "0 1.25rem" }}>
				{data?.map((requirement, index) => (
					<li key={index}>
						<Typography fontSize='0.825rem'>{requirement}</Typography>
					</li>
				))}
			</ul>
		</Box>
	);
};

export default Requirements;
