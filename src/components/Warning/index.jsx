import { Alert, Button, Slide, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Warning = ({
	open = false,
	onConfirm = () => {},
	onCancel = () => {},
	message = "",
}) => {
	return (
		<Snackbar
			open={open}
			onClose={onCancel}
			autoHideDuration={5000}
			TransitionComponent={props => <Slide {...props} direction='down' />}
			anchorOrigin={{
				vertical: "top",
				horizontal: "center",
			}}>
			<Alert severity='warning' variant='standard'>
				<Typography>{message}</Typography>

				<Box
					display='flex'
					alignItems='center'
					justifyContent='flex-end'
					gap='1rem'
					mt='1rem'>
					<Button
						variant='outlined'
						size='small'
						onClick={onCancel}
						sx={{
							color: "#f37b21 !important",
							borderColor: "#f37b21 !important",
						}}>
						Cancel
					</Button>

					<Button
						variant='contained'
						size='small'
						onClick={onConfirm}
						sx={{ bgcolor: "#f37b21 !important" }}>
						Confirm
					</Button>
				</Box>
			</Alert>
		</Snackbar>
	);
};

export default Warning;
