import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Payment
import BlockIcon from "@mui/icons-material/Block"; // Rejected
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Interview
import CampaignIcon from "@mui/icons-material/Campaign"; // Announce
import CheckIcon from "@mui/icons-material/Check"; // Accepted
import ErrorIcon from "@mui/icons-material/Error"; // Attention
import InfoIcon from "@mui/icons-material/Info"; //Info
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MessageIcon from "@mui/icons-material/Message"; // Chat
import {
	alpha,
	Box,
	Button,
	Drawer,
	IconButton,
	Typography,
} from "@mui/material";
import { notificationRead } from "apis/notifications";
import CustomSwitch from "components/CustomSwitch";
import NotificationDetails from "components/NotificationDetails";
import { NotificationTypes } from "constants";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Card = data => {
	const { id, title, subject, type, _fetchNotifications, isRead } = data || {};

	const [open, setOpen] = useState(false);

	let typeData = {
		icon: null,
		color: "#000",
	};

	switch (type) {
		case NotificationTypes.Info: {
			typeData = {
				icon: <InfoIcon sx={{ color: "#25A9D2" }} />,
				color: "#25A9D2",
			};

			break;
		}

		case NotificationTypes.Rejected: {
			typeData = {
				icon: <BlockIcon sx={{ color: "#FAA9A3" }} />,
				color: "#FAA9A3",
			};

			break;
		}

		case NotificationTypes.Accepted: {
			typeData = {
				icon: <CheckIcon sx={{ color: "#A9D3AB" }} />,
				color: "#A9D3AB",
			};

			break;
		}

		case NotificationTypes.Attention: {
			typeData = {
				icon: <ErrorIcon sx={{ color: "#ffa600" }} />,
				color: "#ffa600",
			};

			break;
		}

		case NotificationTypes.Chat: {
			typeData = {
				icon: <MessageIcon sx={{ color: "#7500EB" }} />,
				color: "#7500EB",
			};

			break;
		}

		case NotificationTypes.Announce: {
			typeData = {
				icon: <CampaignIcon sx={{ color: "#F361B9" }} />,
				color: "#F361B9",
			};

			break;
		}

		case NotificationTypes.Interview: {
			typeData = {
				icon: <CalendarTodayIcon sx={{ color: "#B4B4BB" }} />,
				color: "#B4B4BB",
			};

			break;
		}

		case NotificationTypes.Payment: {
			typeData = {
				icon: <AttachMoneyIcon sx={{ color: "#656ACF" }} />,
				color: "#656ACF",
			};

			break;
		}

		default: {
			typeData = {
				icon: null,
				color: "#000",
			};

			break;
		}
	}

	const toggleOpen = () => setOpen(open => !open);

	const markAsRead = () => {
		notificationRead(id).then(_fetchNotifications);
	};

	return (
		<>
			<Box
				display='flex'
				flexDirection='column'
				border='1px solid'
				borderRadius='0.25rem'
				overflow='hidden'
				p='0.5rem'
				sx={{
					borderColor: typeData.color,
					bgcolor: alpha(typeData.color, 0.2),
				}}>
				<Box display='flex' alignItems='center' gap='0.5rem'>
					{typeData.icon}

					<Box width='100%'>
						<Box
							display='flex'
							alignItems='flex-start'
							justifyContent='space-between'
							gap='1rem'>
							<Typography
								fontSize='0.825rem'
								fontWeight={700}
								role='button'
								onClick={toggleOpen}
								sx={{
									cursor: "pointer",
								}}>
								{title}
							</Typography>

							<IconButton
								sx={{ p: 0, color: "#f37b21" }}
								onClick={markAsRead}
								disabled={isRead}
								title='Mark as read'>
								<MarkChatReadIcon color='inherit' sx={{ height: "1rem" }} />
							</IconButton>
						</Box>

						<Typography fontSize='0.75rem'>{subject}</Typography>
					</Box>
				</Box>
			</Box>

			<NotificationDetails open={open} onClose={toggleOpen} data={data} />
		</>
	);
};

const Group = ({ date, _fetchNotifications, notifications = [] }) => {
	return (
		<Box>
			<Typography fontSize='0.75rem' fontWeight={700}>
				{date}
			</Typography>

			<Box display='flex' flexDirection='column' gap='0.75rem'>
				{notifications?.map(notification => (
					<Card
						key={notification?.id}
						_fetchNotifications={_fetchNotifications}
						{...notification}
					/>
				))}
			</Box>
		</Box>
	);
};

const NotificationPanel = ({
	open,
	setOpen,
	data = [],
	_fetchNotifications = () => {},
	notificationIsUnread,
	setNotificationIsUnread = () => {},
}) => {
	const history = useHistory();

	const viewAll = () => {
		history.push(RouteNames.notifications);
		setOpen(false);
	};

	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={{ sx: { width: { xs: "80dvw", sm: "40dvw" } } }}>
			<Box display='flex' flexDirection='column' gap='1rem' p='1rem 1.2rem'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<CustomSwitch
						checked={notificationIsUnread}
						label='Only show unread'
						handleOnChange={({ value }) => setNotificationIsUnread(value)}
					/>

					<Button
						variant='contained'
						size='small'
						onClick={viewAll}
						sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}>
						View All
					</Button>
				</Box>

				<Box display='flex' flexDirection='column' gap='0.75rem'>
					{data?.length ? (
						data?.map(notificationGroup => (
							<Group
								key={notificationGroup?.date}
								_fetchNotifications={_fetchNotifications}
								{...notificationGroup}
							/>
						))
					) : (
						<Box>
							<Typography fontSize='0.825rem'>
								No Notification Available !
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Drawer>
	);
};

export default NotificationPanel;
