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
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getApplications } from "apis/application";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
	"Action",
];

const Applications = ({ studentId }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage]);

	const _fetchData = () => {
		let requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
			studentId,
		};

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

	const onView = applicationId => {
		history.push(RouteNames.application?.replace(":id", applicationId));
	};

	return (
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
							data.map((application, index) => (
								<TableRow
									key={application?.id}
									sx={{
										"& .MuiTableCell-root": {
											maxWidth: "10rem",
										},
									}}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{application?.applicationId ?? "N/A"}</TableCell>

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
	);
};

export default Applications;
