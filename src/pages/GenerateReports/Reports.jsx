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
import CustomTextField from "components/CustomTextField";
import { format } from "date-fns/esm";
import { useEffect, useState } from "react";
import { _getToken } from "utils/token";

const headCells = ["", "Report", "Action"];

const Reports = () => {
	const [filter, setFilter] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});
	const [data, setData] = useState([]);

	useEffect(() => {
		getReportList().then((data = {}) => setData(Object.values(data)));
	}, []);

	const handleOnChange = ({ target: { name, value } = {} }) => {
		setFilter({
			...filter,
			[name]: value,
		});
	};

	const onDownload = type => {
		fetch(
			// eslint-disable-next-line no-undef
			`${process.env.REACT_APP_BASE_URL}/report?startDate=${format(
				filter?.startDate,
				"yyyy-MM-dd"
			)}&endDate=${format(filter?.endDate, "yyyy-MM-dd")}&type=${type}`,
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
				window.location.assign(file);
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
				<CustomTextField
					disableFuture
					type='date'
					name='startDate'
					placeholder='Start Date'
					value={filter?.startDate}
					onChange={handleOnChange}
					sx={{
						width: { xs: "100%", sm: "15rem" },
					}}
				/>

				<CustomTextField
					disableFuture
					type='date'
					name='endDate'
					placeholder='End Date'
					value={filter?.endDate}
					onChange={handleOnChange}
					sx={{
						width: { xs: "100%", sm: "15rem" },
					}}
				/>
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
							data.map((item, index) => (
								<TableRow key={item}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{item}</TableCell>

									<TableCell>
										<IconButton sx={{ p: 0 }} onClick={() => onDownload(item)}>
											<DownloadIcon />
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
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Reports;
