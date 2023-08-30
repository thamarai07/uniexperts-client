import { Avatar, Box, Typography } from "@mui/material";
import { format } from "date-fns";

const ChatData = ({
	isCurrentUser,
	attachment,
	isVideo = false,
	message,
	createdAt,
	userDp,
	userName,
}) => {
	return (
		<Box
			bgcolor='#F5F5F5'
			p='1rem'
			borderRadius='0.5rem'
			maxWidth='80%'
			alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
			sx={{
				borderBottomRightRadius: isCurrentUser ? 0 : null,
				borderBottomLeftRadius: !isCurrentUser ? 0 : null,
			}}>
			<Box display='grid' gap='0.5rem'>
				{attachment ? (
					<Box maxHeight='20rem' overflow='hidden'>
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
				) : null}

				<Typography fontSize='0.75rem' align='justify'>
					{message}
				</Typography>

				<Box
					display='flex'
					gap='1rem'
					alignItems='flex-end'
					justifyContent='space-between'>
					<Box
						display='flex'
						flexDirection='row'
						alignItems='center'
						gap='0.25rem'>
						<Avatar
							src={userDp}
							alt={userName}
							sx={{ height: "1rem", width: "1rem" }}
						/>

						<Typography fontSize='0.625rem' fontWeight={700}>
							{userName?.split(" ")[0]}
						</Typography>
					</Box>

					<Typography fontSize='0.625rem' fontWeight={700}>
						{format(new Date(createdAt), "PPp")}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatData;
