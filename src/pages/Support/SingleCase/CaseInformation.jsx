import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

const Field = ({ label, value, isFullWidth = false }) => (
	<Grid item xs={12} sm={isFullWidth ? 12 : 6} display='flex' gap='1rem'>
		<Typography fontSize='0.825rem' fontWeight={700} width='8rem'>
			{label}
		</Typography>

		<Typography fontSize='0.825rem' maxWidth='65vw'>
			{value}
		</Typography>
	</Grid>
);

const CaseInformation = ({ data }) => {
	const {
		type = "N/A",
		subject = "N/A",
		description = "N/A",
		attachment,
		isVideo,
		priority = "N/A",
		contactName = "N/A",
		accountName = "N/A",
		status = "N/A",
		subType = "N/A",
		createdAt = new Date(),
		updatedAt = new Date(),
	} = data || {};

	const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);

	return (
		<>
			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Box
					bgcolor='#F37B21'
					position='absolute'
					right='0.25rem'
					top='0.25rem'
					p='0.25rem 1rem'
					borderRadius='0.25rem'>
					<Typography fontSize='0.75rem' fontWeight={500} color='#fff'>
						{status}
					</Typography>
				</Box>

				<Grid container spacing={1}>
					<Field label='Agent Name:' value={contactName} />

					<Field label='Type:' value={type} />

					<Field label='Account Name:' value={accountName} />

					<Field label='Priority:' value={priority} />

					<Field label='Sub-type:' value={subType} />

					<Field
						label='Created Date:'
						value={format(new Date(createdAt), "PPP")}
					/>

					<Field
						label='Updated Date:'
						value={format(new Date(updatedAt), "PPP")}
					/>

					<Field isFullWidth label='Subject:' value={subject} />

					{attachment ? (
						<Grid item xs={12} overflow='hidden' display='flex' gap='1rem'>
							<Typography fontSize='0.825rem' fontWeight={700} width='8rem'>
								Attachment:
							</Typography>

							<Button
								disableRipple
								variant='text'
								size='small'
								onClick={() => setIsAttachmentVisible(true)}
								sx={{ p: 0, textTransform: "none" }}>
								See Attachment
							</Button>
						</Grid>
					) : null}

					<Field isFullWidth label='Description:' value={description} />
				</Grid>
			</Box>

			<Dialog
				open={isAttachmentVisible}
				onBackdropClick={() => setIsAttachmentVisible(false)}
				onClose={() => setIsAttachmentVisible(false)}>
				<Box
					sx={{
						outline: "none",
						maxHeight: "80vh",
						maxWidth: "80vw",
					}}>
					{isVideo ? (
						<video src={attachment} controls height='100%' width='100%' />
					) : (
						<img
							src={attachment}
							alt=''
							style={{
								height: "100%",
								width: "100%",
								objectFit: "contain",
								objectPosition: "center",
							}}
						/>
					)}
				</Box>
			</Dialog>
		</>
	);
};

export default CaseInformation;
