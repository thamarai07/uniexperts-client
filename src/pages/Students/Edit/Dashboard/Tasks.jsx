import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useEffect } from "react";
import { getStudentTasks } from "apis/student";
import { format } from "date-fns";

const Card = ({ details: { name, updatedAt }, onView = () => {} }) => (
	<Box
		display='flex'
		gap='0.5rem'
		alignItems='flex-start'
		justifyContent='space-between'
		p='0.25rem 0.5rem'
		borderRadius='0.25rem'
		boxShadow='0px 0px 3px 1px rgb(243 123 33 / 40%)'>
		<Box display='grid'>
			<Typography fontSize='0.825rem' fontWeight={500} noWrap>
				{name}
			</Typography>

			<Typography fontSize='0.75rem'>
				Last Updated: {format(new Date(updatedAt), "PPp")}
			</Typography>
		</Box>

		<Button
			variant='text'
			size='small'
			onClick={onView}
			sx={{
				color: "#f37b21",
				textTransform: "none",
				"& .MuiButton-endIcon": { ml: 0 },
			}}
			endIcon={<KeyboardArrowRightIcon />}>
			View
		</Button>
	</Box>
);

const Tasks = ({ studentId, sendToTaskTab = () => {} }) => {
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		getStudentTasks(studentId).then(setTaskList);
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
				Tasks
			</Typography>

			<Box
				display='flex'
				p='0.5rem'
				m='-0.5rem'
				gap='0.75rem'
				flexDirection='column'
				height='100%'
				overflow='auto'>
				{taskList?.length ? (
					taskList?.map(task => (
						<Card key={task?.details?.id} onView={sendToTaskTab} {...task} />
					))
				) : (
					<Box display='grid' flexGrow={1} sx={{ placeItems: "center" }}>
						<Typography>No Data !</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Tasks;
