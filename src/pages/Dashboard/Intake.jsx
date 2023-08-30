import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

const Intake = ({ data }) => {
	return (
		<Box
			bgcolor='#fff'
			p='1rem 1.25rem'
			borderRadius='0.625rem'
			overflow='hidden'>
			<Carousel
				infiniteLoop
				autoPlay
				showThumbs={false}
				showStatus={false}
				showIndicators={false}
				showArrows={false}>
				{data?.map(({ id, school, program, name, month, year, status }) => (
					<Typography
						key={id}
						fontSize='0.825rem'
						align='justify'
						color={
							status === "Open"
								? "#2EDB1E"
								: status === "Closed"
								? "#F83939"
								: "#F37B21"
						}>
						{`${school} | ${program} | ${name} | ${month} ${year}`}
					</Typography>
				))}
			</Carousel>
		</Box>
	);
};

export default Intake;
