import { Box, Typography } from "@mui/material";
import Category from "./Category";

const Task = ({ taskList = {}, updateInformation = () => {} }) => {
	return (
		<Box display='flex' flexDirection='column' gap='1rem'>
			{Object.keys(taskList)?.length ? (
				Object.keys(taskList)?.map(category => (
					<Category
						key={category}
						label={category}
						dataList={taskList[category]}
						updateInformation={updateInformation}
					/>
				))
			) : (
				<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
					<Typography fontSize='0.825rem' align='center'>
						No Data !
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default Task;
