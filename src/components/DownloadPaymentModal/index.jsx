import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import {
	Button,
	Dialog,
	IconButton,
	MenuItem,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CustomTextField from "components/CustomTextField";
import { useState } from "react";
import { useDispatch } from "react-redux";

const tabs = ["Dashboard", "Commissions", "Invoice", "Payments"];

const DownloadPaymentModal = ({ isModalOpen, setModalOpen }) => {
	const dispatch = useDispatch();

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	return (
		<Dialog
			open={isModalOpen}
			onClose={() => {
				setModalOpen(false);
			}}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "35vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box p='1rem 2rem' height='100%'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					position={"relative"}>
					<Typography fontSize='2rem' fontWeight={500} color='#f37b21'>
						Download
					</Typography>

					<IconButton
						sx={{ position: "absolute", right: "0%", top: "5%" }}
						onClick={() => {
							setModalOpen(false);
						}}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems={"center"}
					gap={4}
					height='100%'
					maxHeight='80vh'
					overflow='auto'
					pt='1rem'
					pb='1rem'>
					<CustomTextField
						select
						label='Select Report Type'
						size='small'
						handleOnChange={({ value }) => {
						}}>
						{tabs.map(option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</CustomTextField>

					<CustomTextField
						placeholder={"Start Date"}
						type='date'
						value={startDate}
						onChange={({ target }) => {
							setStartDate(target.value);
						}}
					/>
					<CustomTextField
						placeholder={"End Date"}
						type='date'
						minDate={startDate}
						value={endDate}
						onChange={({ target }) => {
							setEndDate(target.value);
						}}
					/>

					<Button
						variant='contained'
						size='small'
						sx={{
							textTransform: "none",
							bgcolor: "#F37B21 !important",
							width: "200px",
						}}
						onClick={() => { }}>
						<Box display={"flex"} alignItems={"center"} gap={1}>
							<DownloadIcon fontSize='14' />
							Download
						</Box>
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
};

export default DownloadPaymentModal;
