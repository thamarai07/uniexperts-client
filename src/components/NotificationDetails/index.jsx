import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";

const NotificationDetails = ({
	data = {},
	open = false,
	onClose = () => {},
}) => {
	const { title, type, subject, updatedAt, description } = data;

	if (!open) return null;

	return (
		<Dialog
			open={open}
			onBackdropClick={onClose}
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
						{format(new Date(updatedAt), "PPp (zzzz)")}
					</Typography>
				</Box>

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Type
					</Typography>

					<Typography fontSize='0.825rem'>{type}</Typography>
				</Box>

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Subject
					</Typography>

					<Typography fontSize='0.825rem'>{subject}</Typography>
				</Box>

				<Box>
					<Typography fontSize='1rem' fontWeight={500}>
						Description
					</Typography>

					<Typography fontSize='0.825rem'>{description}</Typography>
				</Box>
			</Box>
		</Dialog>
	);
};

export default NotificationDetails;
