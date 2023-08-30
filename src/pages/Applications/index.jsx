import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Button,
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
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getApplications } from "apis/application";
import DropdownWithSearch from "components/DropdownWithSearch";
import { ApplicationStatus, ModuleKeys } from "constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const headCells = [
	"",
	"Application ID",
	"Student Name",
	"Counsellor",
	"Intake",
	"School",
	"Program",
	"Status",
	"Stage",
	"Created At",
	"Action",
];

const Applications = () => {
	const history = useHistory();

	const { location: { state: { acceptedApplication = false } = {} } = {} } =
		history || {};

	const { user: { staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);

	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);
	const [status, setStatus] = useState(acceptedApplication ? "Accepted" : null);

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage, status]);

	const _fetchData = () => {
		const requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
		};

		if (status) {
			requestParams.status = status;
		}

		dispatch(setLoader(true));

		getApplications(requestParams)
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

	const addNewApplication = () => history.push(RouteNames.programs_and_schools);

	const onView = applicationId => {
		history.push(RouteNames.application?.replace(":id", applicationId));
	};

	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Typography fontSize='1.2rem' color='#f37b21' fontWeight={700}>
					Application
				</Typography>

				<Button
					variant='contained'
					size='small'
					onClick={addNewApplication}
					startIcon={<AddIcon />}
					disabled={!modules?.includes(ModuleKeys.ProgramAndSchool)}
					sx={{
						backgroundColor: "#F37B21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgba(0, 0, 0, 0.12) !important",
						},
					}}>
					Add New Application
				</Button>
			</Box>

			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Box display='flex' justifyContent='flex-end' pb='1rem'>
					<DropdownWithSearch
						fullWidth={false}
						name='status'
						options={ApplicationStatus}
						placeholder='Filter By'
						sx={{
							width: { xs: "100%", sm: "15rem" },
						}}
						value={status}
						handleOnChange={({ value }) => setStatus(value)}
					/>
				</Box>

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
								data.map((application, index) => (
									<TableRow
										key={application?.id}
										sx={{
											"& .MuiTableCell-root": {
												maxWidth: "10rem",
											},
										}}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>
											<Link
												to={RouteNames.application?.replace(
													":id",
													application?.id
												)}
												style={{
													color: "inherit",
												}}>
												{application?.applicationId ?? "N/A"}
											</Link>
										</TableCell>

										<TableCell>{application?.student ?? "N/A"}</TableCell>

										<TableCell>{application?.counsellor ?? "N/A"}</TableCell>

										<TableCell>{application?.intake ?? "N/A"}</TableCell>

										<TableCell>
											<Tooltip title={application?.school} placement='top-end'>
												<Typography fontSize='0.875rem' noWrap>
													{application?.school ?? "N/A"}
												</Typography>
											</Tooltip>
										</TableCell>

										<TableCell>
											<Tooltip title={application?.program} placement='top-end'>
												<Typography fontSize='0.875rem' noWrap>
													{application?.program ?? "N/A"}
												</Typography>
											</Tooltip>
										</TableCell>

										<TableCell>{application?.status ?? "N/A"}</TableCell>

										<TableCell>{application?.stage ?? "N/A"}</TableCell>

										<TableCell>
											{format(new Date(application?.createdAt), "PP")}
										</TableCell>

										<TableCell>
											<IconButton
												sx={{ p: 0 }}
												onClick={() => onView(application?.id)}>
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
		</>
	);
};
export default Applications;
