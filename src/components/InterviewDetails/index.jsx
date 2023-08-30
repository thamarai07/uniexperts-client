import CloseIcon from "@mui/icons-material/Close";
import {
	Avatar,
	AvatarGroup,
	Button,
	Dialog,
	IconButton,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const InterviewDetails = ({
	data = {},
	open = false,
	onBackdropClick = () => {},
	onClose = () => {},
}) => {
	const {
		title,
		startTime = new Date(),
		reason,
		organizer,
		description,
		link,
		participants,
		studentId,
		applicationId,
	} = data || {};

	const history = useHistory();

	const viewApplication = () =>
		history.push(RouteNames.application?.replace(":id", applicationId));

	const viewStudent = () =>
		history.push(RouteNames.edit_student?.replace(":id", studentId));

	return (
		<Dialog
			open={open}
			onBackdropClick={onBackdropClick}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "60vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box
				sx={{ display: "grid", gap: "1rem", p: "1rem 2rem", overflow: "auto" }}>
				<Box>
					<Box
						display='flex'
						alignItems='flex-start'
						justifyContent='space-between'
						gap='1rem'>
						<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
							{title}
						</Typography>

						<IconButton onClick={onClose} sx={{ p: 0 }}>
							<CloseIcon />
						</IconButton>
					</Box>

					<Typography fontSize='0.825rem'>
						{format(new Date(startTime), "PPp")}
					</Typography>
				</Box>

				<Box
					display='flex'
					alignItems={{ xs: "unset", sm: "flex-start" }}
					justifyContent='space-between'
					flexDirection={{
						xs: "column-reverse",
						sm: "row",
					}}
					gap='1rem'>
					<Box display='flex' alignItems='flex-start' gap='1rem'>
						<Avatar src={organizer?.dp} alt={organizer?.name} />

						<Box>
							<Typography fontSize='1rem'>{organizer?.name}</Typography>

							<Typography fontSize='0.825rem' fontWeight={500}>
								{reason}
							</Typography>
						</Box>
					</Box>

					<Box
						display='flex'
						alignItems={{ xs: "unset", sm: "center" }}
						flexDirection={{
							xs: "column",
							sm: "row",
						}}
						gap='1rem'>
						{applicationId ? (
							<Button
								variant='outlined'
								size='small'
								onClick={viewApplication}
								sx={{
									color: "#f37b21 !important",
									borderColor: "#f37b21 !important",
									textTransform: "none",
								}}>
								View Application
							</Button>
						) : null}

						{studentId ? (
							<Button
								variant='outlined'
								size='small'
								onClick={viewStudent}
								sx={{
									color: "#f37b21 !important",
									borderColor: "#f37b21 !important",
									textTransform: "none",
								}}>
								View Student
							</Button>
						) : null}
					</Box>
				</Box>

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Description
					</Typography>

					<Typography fontSize='0.825rem'>{description}</Typography>
				</Box>

				{link ? (
					<Box>
						<Typography fontSize='1rem' fontWeight={500}>
							Link
						</Typography>

						<a
							href={link}
							target='_blank'
							rel='noreferrer'
							style={{ fontSize: "0.825rem" }}>
							{link}
						</a>
					</Box>
				) : null}

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Tool
					</Typography>

					<Avatar
						src='https://play-lh.googleusercontent.com/jKU64njy8urP89V1O63eJxMtvWjDGETPlHVIhDv9WZAYzsSxRWyWZkUlBJZj_HbkHA=w240-h480-rw'
						alt=''
					/>
				</Box>

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Participants
					</Typography>

					<Box width='fit-content'>
						<AvatarGroup max={4}>
							{participants?.map(({ name, dp }, index) => (
								<Avatar key={index} alt={name} src={dp} />
							))}
						</AvatarGroup>
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};

export default InterviewDetails;
