import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getNotifications } from "apis/notifications";
import DropdownWithSearch from "components/DropdownWithSearch";
import NotificationDetails from "components/NotificationDetails";
import { NotificationTypes } from "constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const headCells = [
	"",
	"Notification Title",
	"Subject",
	"Type",
	"Created Date",
	"Time Stamp",
	"View",
];

const Notifications = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedNotification, setSelectedNotification] = useState({});

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage, selectedType]);

	const _fetchData = () => {
		let requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
		};

		if (selectedType) requestParams.type = selectedType;

		dispatch(setLoader(true));

		getNotifications(requestParams)
			.then(response => {
				setData(response?.data);
				setTotal(response?.meta?.total);
			})
			.finally(() => dispatch(setLoader(false)));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const onView = notification => setSelectedNotification(notification);

	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
					gap: "1rem",
				}}>
				<Typography fontSize='1.2rem' color='#f37b21' fontWeight={700}>
					Notifications
				</Typography>

				<DropdownWithSearch
					name='type'
					value={selectedType}
					placeholder='Type'
					options={Object.values(NotificationTypes)}
					handleOnChange={({ value }) => setSelectedType(value)}
					sx={{ maxWidth: "10rem" }}
				/>
			</Box>

			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{headCells?.map(label => (
									<TableCell key={label} align='left' sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data?.length ? (
								data.map((notification, index) => (
									<TableRow
										key={notification?.id}
										sx={{
											"& .MuiTableCell-root": {
												maxWidth: "10rem",
											},
										}}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{notification?.title ?? "N/A"}</TableCell>

										<TableCell>{notification?.subject ?? "N/A"}</TableCell>

										<TableCell>{notification?.type ?? "N/A"}</TableCell>

										<TableCell>
											{format(new Date(notification?.createdAt), "PP")}
										</TableCell>

										<TableCell>
											{format(new Date(notification?.updatedAt), "p (zzzz)")}
										</TableCell>

										<TableCell>
											<IconButton
												sx={{ p: 0 }}
												onClick={() => onView(notification)}>
												<VisibilityIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow
									key='no-data'
									style={{
										height: "10rem",
									}}>
									<TableCell colSpan={headCells.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[25, 50, 100]}
									colSpan={headCells.length}
									count={total}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Box>

			<NotificationDetails
				data={selectedNotification}
				open={Object.values(selectedNotification)?.length !== 0}
				onClose={() => setSelectedNotification({})}
			/>
		</>
	);
};

export default Notifications;
