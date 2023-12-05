import DownloadIcon from "@mui/icons-material/Download";
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { getReportList } from "apis/report";
import { DateFilter } from "components/DateFilter";
import { format } from "date-fns/esm";
import { useEffect, useState } from "react";
import { _getToken } from "utils/token";

const headCells = ["", "Report", "Action"];

const Reports = () => {
	const [filter, setFilter] = useState([null, null]);
	const [data, setData] = useState([]);

	useEffect(() => {
		getReportList().then((data = []) => setData(Object.entries(data)));
	}, []);


	const onDownload = type => {
		let requestParams = { type };
		const [startDate, endDate] = filter || [];

		if (startDate) {
			requestParams.startDate = format(startDate, "yyyy-MM-dd");
		}

		if (endDate) {
			requestParams.endDate = format(endDate, "yyyy-MM-dd");
		}

		fetch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BASE_URL}/report?${new URLSearchParams(
				requestParams
			).toString()}`,
			{
				method: "GET",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${_getToken()}`,
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
			}
		)
			.then(response => {
				return response.blob();
			})
			.then(res => {
				var file = window.URL.createObjectURL(res);
				window.open(file, "_blank");
			});
	};

	return (
		<Box
			sx={{
				bgcolor: "#fff",
				p: "1rem 1.25rem",
				borderRadius: "0.625rem",
			}}>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='flex-end'
				gap='1rem'
				pb='1rem'>
				<DateFilter setDateRange={setFilter} dateRange={filter} />
			</Box>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							{headCells?.map(label => (
								<TableCell key={label} sx={{ color: "#fff" }}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{data?.length ? (
							data.map(([label, value], index) => (
								<TableRow key={label}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{label}</TableCell>

									<TableCell>
										<Box display={"flex"} gap={4}>
											<IconButton
												sx={{ p: 0 }}
												onClick={() => onDownload(label)}>
												<DownloadIcon />
											</IconButton>
										</Box>
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
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Reports;
