import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, IconButton, Input, Typography } from "@mui/material";
import { s3Upload } from "apis/app";
import { addComment } from "apis/support";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";

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

				<Typography fontSize='0.825rem' align='justify'>
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

						<Typography fontSize='0.75rem' fontWeight={700}>
							{userName?.split(" ")[0]}
						</Typography>
					</Box>

					<Typography fontSize='0.75rem' fontWeight={700}>
						{format(new Date(createdAt), "PPp")}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

const Conversation = ({ caseId, data = [] }) => {
	const { user: { details: { email } = {} } = {} } = useSelector(
		state => state
	);
	const dispatch = useDispatch();

	const [conversationList, setConversationList] = useState([]);
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState({});

	const bottomRef = useRef(null);
	const hiddenFileInput = useRef(null);

	useEffect(() => {
		if (!data?.length) return;

		const tempConversationList = [];

		data?.forEach(({ comment, user }) => {
			tempConversationList.push({
				...comment,
				isCurrentUser: user?.email === email,
				userDp: user?.dp,
				userName: user?.fullName,
			});
		});

		setConversationList(tempConversationList);
	}, [data]);

	//scroll to the bottom of page , every time there are new chats , since newest chats are at the bottom
	useEffect(() => {
		if (bottomRef.current && conversationList?.length) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [conversationList]);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			setAttachment({
				url: fileURL,
				name: file?.name,
				size: file?.size,
				type: file?.type,
			});

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const clearAttachment = () => {
		setAttachment({});
		hiddenFileInput.current.value = "";
	};

	const _sendMessage = () => {
		dispatch(setLoader(true));

		const respData = {
			message,
		};

		if (attachment?.url) {
			respData.attachment = attachment?.url;
		}

		addComment({
			caseId,
			data: respData,
		})
			.then(({ comment, user }) => {
				setMessage("");
				setAttachment({});
				hiddenFileInput.current.value = "";

				setConversationList([
					...conversationList,
					{
						...comment,
						isCurrentUser: true,
						userDp: user?.dp,
						userName: user?.fullName,
					},
				]);
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box
			sx={{
				bgcolor: "#fff",
				p: "1rem 1.25rem",
				borderRadius: "0.625rem",
			}}>
			<Box
				mt='0.5rem'
				height='80vh'
				p='0.5rem 0'
				pr='0.5rem'
				display='flex'
				flexDirection='column'
				overflow='auto'
				gap='1rem'
				sx={{
					"::-webkit-scrollbar": {
						display: "block",
						bgcolor: "rgb(0 0 0 / 10%)",
						width: "0.5rem",
						borderRadius: "0.25rem",
					},
					"::-webkit-scrollbar-thumb": {
						bgcolor: "rgb(0 0 0 / 20%)",
						borderRadius: "0.25rem",
					},
				}}>
				{conversationList?.length ? (
					conversationList?.map(details => (
						<ChatData key={details?.id} {...details} />
					))
				) : (
					<Box
						display='grid'
						flexGrow={1}
						bgcolor='rgb(0 0 0 / 12%)'
						sx={{ placeItems: "center" }}>
						<Typography>No Conversation to Show !</Typography>
					</Box>
				)}

				<Box ref={bottomRef} />
			</Box>

			<Box
				display='flex'
				alignItems='flex-end'
				gap='1rem'
				pt='0.5rem'
				borderTop='2px solid #707C9726'>
				<IconButton
					onClick={handleAttachClick}
					sx={{
						bgcolor: "#F37B21",
						color: "#fff",
						"&:hover": {
							bgcolor: "#F37B21",
						},
					}}>
					<AttachFileIcon color='inherit' />
				</IconButton>

				<input
					type='file'
					accept='image/*, video/*'
					ref={hiddenFileInput}
					onChange={handleFileAttachment}
					style={{ display: "none" }}
				/>

				<Input
					multiline
					placeholder='Type Here...'
					value={message}
					onChange={({ target: { value } }) => setMessage(value)}
					sx={{ flexGrow: 1 }}
				/>

				<IconButton
					disabled={!message}
					onClick={_sendMessage}
					sx={{
						bgcolor: "#F37B21",
						color: "#fff",
						"&:hover": {
							bgcolor: "#F37B21",
						},
					}}>
					<SendIcon color='inherit' />
				</IconButton>
			</Box>

			{Object.values(attachment)?.length ? (
				<Box
					display='flex'
					gap='0.5rem'
					justifyContent='space-between'
					width='fit-content'
					mt='0.5rem'
					bgcolor='#0000001f'
					p='0.5rem'
					borderRadius='0.25rem'>
					<Typography>{attachment?.name}</Typography>

					<IconButton onClick={clearAttachment} sx={{ p: 0, color: "red" }}>
						<CancelIcon color='inherit' />
					</IconButton>
				</Box>
			) : null}
		</Box>
	);
};

export default Conversation;
