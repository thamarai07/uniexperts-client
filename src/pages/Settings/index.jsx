import { Box, Button, Grid, Typography } from "@mui/material";
import { generalStaffDetail, setNotificationsPreference } from "apis/staff";
import CustomSwitch from "components/CustomSwitch";
import { NotificationLabels } from "constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const Settings = () => {
	const dispatch = useDispatch();

	const [notificationData, setNotificationData] = useState({});
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		generalStaffDetail()
			.then(({ notifications }) => setNotificationData(notifications))
			.finally(() => dispatch(setLoader(false)));
	};

	const onClick = () => {
		if (!isEditable) {
			setIsEditable(true);
			return;
		}

		dispatch(setLoader(true));

		setNotificationsPreference(notificationData)
			.then(() => {
				setIsEditable(false);
				_fetchData();
			})
			.finally(() => dispatch(setLoader(false)));
	};

	const handleOnChange = ({ key, value }) => {
		setNotificationData({
			...notificationData,
			[key]: value,
		});
	};

	return (
		<>
			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'>
				<Typography fontSize='1.2rem' fontWeight={700} color='#F37B21'>
					Notification Settings
				</Typography>

				<Button
					variant='contained'
					size='small'
					onClick={onClick}
					sx={{ bgcolor: "#F37B21 !important", textTransform: "none" }}>
					{isEditable ? "Save" : "Edit"}
				</Button>
			</Box>

			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Grid container spacing={2}>
					{Object.keys(notificationData)?.map(key => {
						const label = NotificationLabels[key];
						const checked = notificationData[key];

						return (
							<Grid key={key} item xs={12} sm={6}>
								<CustomSwitch
									name={key}
									checked={checked}
									disabled={!isEditable}
									handleOnChange={handleOnChange}
									label={label}
									labelSx={{
										width: {
											xs: "100%",
											sm: "15rem",
										},
									}}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Box>
		</>
	);
};

export default Settings;
