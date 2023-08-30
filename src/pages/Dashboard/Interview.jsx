import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import { useState } from "react";
import { format } from "date-fns";
import InterviewDetails from "components/InterviewDetails";

const Card = details => {
	const {
		title,
		reason,
		startTime,
		organizer: { dp },
	} = details || {};

	const [selectedInterview, setSelectedInterview] = useState({});

	return (
		<>
			<Box
				bgcolor='#fff'
				p='0.5rem 0.25rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection='column'
				gap='1rem'>
				<Box display='flex' alignItems='center' gap='0.5rem'>
					<Avatar src={dp} alt='' />

					<Box>
						<Typography fontSize='0.75rem'>{reason}</Typography>

						<Typography fontSize='0.825rem' fontWeight={500}>
							{title}
						</Typography>

						<Typography fontSize='0.75rem'>
							{format(new Date(startTime), "PPp")}
						</Typography>
					</Box>
				</Box>

				<Button
					variant='outlined'
					size='small'
					onClick={() => setSelectedInterview(details)}
					sx={{
						textTransform: "none",
						borderColor: "#f37b21 !important",
						color: "#f37b21 !important",
					}}>
					Details
				</Button>
			</Box>

			{Object.values(selectedInterview)?.length !== 0 && (
				<InterviewDetails
					open={Object.values(selectedInterview)?.length !== 0}
					onClose={() => setSelectedInterview({})}
					onBackdropClick={() => setSelectedInterview({})}
					data={selectedInterview}
				/>
			)}
		</>
	);
};

const Group = ({ date, interviews = [] }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor='#f5f5f5' p='0.25rem' borderRadius='0.25rem'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'
				role='button'
				onClick={() => setIsOpen(!isOpen)}
				sx={{ cursor: "pointer" }}>
				<Typography fontSize='0.75rem'>{date}</Typography>

				{isOpen ? (
					<KeyboardControlKeyIcon sx={{ height: "1rem", width: "unset" }} />
				) : (
					<KeyboardArrowDownIcon sx={{ height: "1rem", width: "unset" }} />
				)}
			</Box>

			{isOpen ? (
				<Box display='flex' flexDirection='column' gap='0.5rem' mt='0.5rem'>
					{interviews?.map(interview => (
						<Card key={interview?.id} {...interview} />
					))}
				</Box>
			) : null}
		</Box>
	);
};

const Interview = ({ data = [] }) => {
	return (
		<Box bgcolor='#fff' p='1rem 1.2rem' borderRadius='0.625rem' height='100%'>
			<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
				Scheduled Interviews
			</Typography>

			<Box
				display='flex'
				flexDirection='column'
				gap='0.75rem'
				mt='1rem'
				height='100%'
				maxHeight={{ xs: "20rem", sm: "38rem" }}
				overflow='auto'>
				{data?.length ? (
					data?.map((elm, index) => <Group key={index} {...elm} />)
				) : (
					<Box>
						<Typography fontSize='0.825rem' align='center'>
							No Interview Scheduled !
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Interview;
