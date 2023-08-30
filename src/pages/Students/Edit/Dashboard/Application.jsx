import FolderSharedIcon from "@mui/icons-material/FolderShared";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getApplications } from "apis/application";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Card = ({ id, applicationId, status }) => {
	const history = useHistory();

	const onView = () => history.push(RouteNames.application?.replace(":id", id));

	return (
		<Box
			display='flex'
			gap='0.5rem'
			alignItems='center'
			justifyContent='space-between'
			p='0.25rem 0.5rem'
			borderRadius='0.25rem'
			boxShadow='0px 0px 3px 1px rgb(243 123 33 / 40%)'>
			<Box display='flex' alignItems='center' gap='0.5rem'>
				<Avatar>
					<FolderSharedIcon />
				</Avatar>

				<Box>
					<Typography
						fontSize='0.825rem'
						fontWeight={500}
						width='fit-content'
						noWrap>
						{applicationId}
					</Typography>

					<Typography fontSize='0.75rem' width='fit-content'>
						{`Status: ${status}`}
					</Typography>
				</Box>
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
};

const Application = ({ studentId }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getApplications({ studentId }).then(({ data }) => setData(data));
	}, []);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap='1rem'
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem'
			height='25rem'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				Application Status
			</Typography>

			<Box
				display='flex'
				p='0.5rem'
				m='-0.5rem'
				gap='0.75rem'
				flexDirection='column'
				height='100%'
				overflow='auto'>
				{data?.length ? (
					data?.map(application => (
						<Card key={application?.id} {...application} />
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

export default Application;
