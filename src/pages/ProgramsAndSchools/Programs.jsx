import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import ProgramCard from "components/ProgramCard";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const School = ({ school = {}, programs = [], studentList }) => {
	const {
		basicDetails: { logo, name },
		address: { city, country },
		id,
	} = school || {};

	const history = useHistory();

	const [isShowingAll, setIsShowingAll] = useState(false);

	return (
		<Box borderBottom='1px solid rgb(0 0 0 / 25%)' pb='1rem'>
			<Box display='flex' alignItems='center' gap='1rem'>
				<Avatar src={logo} alt='' />

				<Box>
					<Typography
						fontSize='1rem'
						fontWeight={500}
						color='#f37b21'
						onClick={() => history.push(RouteNames.school?.replace(":id", id))}
						sx={{ cursor: "pointer" }}>
						{name}
					</Typography>

					<Typography fontSize='0.825rem'>{`${city}, ${country}`}</Typography>
				</Box>
			</Box>

			{programs?.length ? (
				<Grid container spacing={2} mt='1rem'>
					{programs
						?.slice(0, isShowingAll ? programs?.length : 2)
						?.map(program => (
							<ProgramCard
								key={program?.id}
								studentList={studentList}
								{...program}
							/>
						))}
				</Grid>
			) : null}

			{programs?.length > 2 ? (
				<Box display='flex' justifyContent='center' mt='1rem'>
					<Button
						variant='text'
						size='small'
						onClick={() => setIsShowingAll(!isShowingAll)}
						sx={{ color: "#f37b21 !important", textTransform: "none" }}
						endIcon={
							isShowingAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
						}>
						{isShowingAll
							? "Show Less Programs"
							: `Show ${programs?.length - 2} More Programs`}
					</Button>
				</Box>
			) : null}
		</Box>
	);
};

const Programs = ({ data, studentList = [] }) => {
	return (
		<Box
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem 1.25rem'
			display='flex'
			flexDirection='column'
			gap='1rem'>
			{data?.length ? (
				data?.map(elm => (
					<School key={elm?.school?.id} studentList={studentList} {...elm} />
				))
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

export default Programs;
