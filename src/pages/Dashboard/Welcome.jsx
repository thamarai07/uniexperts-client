import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ModuleKeys } from "constants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Card = ({ label, count = 0, color, onClick = () => {} }) => (
	<Grid item xs={6} md={3}>
		<Box
			display='flex'
			flexDirection='column'
			gap='0.5rem'
			p='1rem 1.2rem'
			color={color}
			bgcolor={`${color}0b`}
			boxShadow={`0px -1px 13px 1px ${color}40`}
			height='100%'
			onClick={onClick}
			sx={{
				transitionDuration: "250ms",
				cursor: "pointer",
				"&:hover": {
					scale: "1.1",
				},
			}}>
			<FolderSharedIcon color='inherit' />

			<Typography fontWeight={500} color='inherit'>
				{label}
			</Typography>

			<Typography
				fontSize='0.75rem'
				color='inherit'>{`${count} file(s)`}</Typography>
		</Box>
	</Grid>
);

const Welcome = ({ data = {}, isAccountDisabled }) => {
	const history = useHistory();

	const {
		user: { details: { name } = {}, staff: { modules = [] } = {} } = {},
	} = useSelector(state => state);

	const onClick = () => {
		history.push(RouteNames.new_student);
	};

	return (
		<Box
			bgcolor='#fff'
			p='1rem 1.2rem'
			borderRadius='0.625rem'
			display='flex'
			flexDirection='column'
			gap='1rem'>
			<Box
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems='flex-start'
				justifyContent='space-between'
				gap='1rem'>
				<Box>
					<Typography fontSize='1.2rem' fontWeight={700} color='#f37b21'>
						{`Welcome, ${name}!`}
					</Typography>

					<Typography fontSize='0.825rem' sx={{ opacity: "0.6" }}>
						We have prepared the stats for you. This dashboard is accordingly.
					</Typography>
				</Box>

				<Button
					variant='contained'
					size='small'
					onClick={onClick}
					startIcon={<AddIcon />}
					disabled={!modules?.includes(ModuleKeys.Students)}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": {
							bgcolor: "rgba(0, 0, 0, 0.12) !important",
						},
					}}>
					Add Student
				</Button>
			</Box>

			{isAccountDisabled ? (
				<Box display='flex' alignItems='center' gap='0.5rem' color='#E40F0FB2'>
					<ErrorIcon color='inherit' />

					<Typography fontSize='1.2rem' fontWeight={700} color='inherit'>
						Sorry, your account is currently under Verification. We will let you
						know as soon as it is verified.
					</Typography>
				</Box>
			) : (
				<Grid container spacing={2}>
					<Card
						label='Students'
						count={data?.student}
						color='#FF7F5C'
						onClick={() => history.push(RouteNames.students)}
					/>

					<Card
						label='Applications'
						count={data?.application}
						color='#3734A9'
						onClick={() => history.push(RouteNames.applications)}
					/>

					<Card
						label='Accepted Applications'
						count={data?.acceptedApplication}
						color='#2FE6C8'
						onClick={() =>
							history.push(RouteNames.applications, {
								acceptedApplication: true,
							})
						}
					/>

					<Card
						label='Payments'
						count={data?.payments}
						color='#FDBC64'
						onClick={() => history.push(RouteNames.finance)}
					/>
				</Grid>
			)}
		</Box>
	);
};

export default Welcome;
