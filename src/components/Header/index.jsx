import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getNotifications } from "apis/notifications";
import logo from "assets/uniexperts_logo.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { userLogout } from "store/appStore/actions";
import MobileSidebar from "./MobileSidebar";
import NotificationPanel from "./NotificationPanel";

const settings = [
	{
		key: "profile",
		label: "View Profile",
		icon: (
			<PersonIcon color='inherit' sx={{ height: "1rem", width: "unset" }} />
		),
	},
	{
		key: "settings",
		label: "Settings",
		icon: (
			<SettingsIcon color='inherit' sx={{ height: "1rem", width: "unset" }} />
		),
	},
	{
		key: "logout",
		label: "Logout",
		icon: (
			<LogoutIcon color='inherit' sx={{ height: "1rem", width: "unset" }} />
		),
	},
];

const Header = () => {
	const history = useHistory();

	const { user: { staff: { dp } = {} } = {} } = useSelector(state => state);
	const dispatch = useDispatch();

	const [openNotification, setOpenNotification] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(false);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [notificationIsUnread, setNotificationIsUnread] = useState(false);

	useEffect(() => {
		_fetchNotifications();
	}, [notificationIsUnread]);

	const _fetchNotifications = () => {
		getNotifications({ group: true, isUnread: notificationIsUnread }).then(
			res => setNotifications(res?.data)
		);
	};

	const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget);

	const handleCloseUserMenu = () => setAnchorElUser(null);

	const handleMenuSelection = key => {
		switch (key) {
			case "logout": {
				dispatch(userLogout());
				history.push(RouteNames.login);

				break;
			}
			case "profile": {
				history.push(RouteNames.profile);
				break;
			}

			case "settings": {
				history.push(RouteNames.settings);
				break;
			}

			default:
				break;
		}

		handleCloseUserMenu();
	};

	return (
		<>
			<Box
				bgcolor='#fff'
				p='1rem 1.2rem'
				borderRadius='0.625rem'
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'>
				<Box display='flex' alignItems='flex-start' gap='1rem'>
					<IconButton
						disableRipple
						onClick={() => setOpenSidebar(true)}
						sx={{
							display: { xs: "block", md: "none" },
							p: 0,
							color: "#f37b21",
						}}>
						<MenuIcon />
					</IconButton>

					<Avatar
						src={logo}
						alt=''
						sx={{
							height: { xs: "1.5rem", sm: "2rem" },
							width: "unset",
							borderRadius: 0,
						}}
					/>
				</Box>

				<Box display='flex' alignItems='center' gap='1rem'>
					<IconButton
						disableRipple
						onClick={() => setOpenNotification(true)}
						sx={{
							p: 0,
							color: "#f37b21",
						}}>
						<NotificationsNoneIcon />
					</IconButton>

					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar src={dp} alt='' />
					</IconButton>

					<Menu
						keepMounted
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						sx={{ mt: "45px" }}>
						{settings.map(({ key, label, icon }) => (
							<MenuItem
								key={key}
								onClick={() => handleMenuSelection(key)}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "0.25rem",
									minHeight: "unset",
								}}>
								{icon}
								<Typography fontSize='0.825rem' textAlign='center'>
									{label}
								</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Box>

			<MobileSidebar open={openSidebar} setOpen={setOpenSidebar} />

			<NotificationPanel
				open={openNotification}
				setOpen={setOpenNotification}
				data={notifications}
				_fetchNotifications={_fetchNotifications}
				notificationIsUnread={notificationIsUnread}
				setNotificationIsUnread={setNotificationIsUnread}
			/>
		</>
	);
};

export default Header;
