import EventIcon from "@mui/icons-material/Event";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ScheduleMeeting from "components/ScheduleMeeting";
import { useState } from "react";

const AccountManager = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false);

	const bookAppointment = () => setIsOpen(true);

	return (
		<>
			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				flexDirection='column'
				alignItems='flex-start'
				justifyContent='space-between'
				gap='1rem'>
				<Box
					display='flex'
					flexDirection='row'
					textAlign='start'
					alignItems='center'
					gap='1rem'>
					<Avatar
						src={data?.dp}
						alt=''
						sx={{ height: "6rem", width: "6rem" }}
					/>

					<Box>
						<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
							{data?.fullName}
						</Typography>

						<Typography fontSize='1rem'>Account Manager</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{data?.email}
						</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{data?.phone}
						</Typography>
					</Box>
				</Box>

				<Button
					fullWidth
					variant='contained'
					size='small'
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
					}}
					startIcon={<EventIcon />}
					onClick={bookAppointment}>
					Book an Appointment
				</Button>
			</Box>

			<ScheduleMeeting
				open={isOpen}
				onClose={() => setIsOpen(false)}
				onBackdropClick={() => setIsOpen(false)}
			/>
		</>
	);
};

export default AccountManager;
