import {
	Box,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const headCells = ["", "Source", "Application", "Count"];

const Schools = ({ data = [] }) => {
	const [highestCount, setHighestCount] = useState(0);

	useEffect(() => {
		let tempHighestCount = 0;

		data?.forEach(({ count }) => {
			if (count > tempHighestCount) tempHighestCount = count;
		});

		setHighestCount(tempHighestCount);
	}, [data]);

	return (
		<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
			<Typography fontSize='1.2rem' color='#f37b21' fontWeight={500}>
				Top Schools
			</Typography>

			<TableContainer
				component={Paper}
				sx={{
					height: "100%",
					maxHeight: "22rem",
					overflow: "auto",
					mt: "1rem",
				}}>
				<Table stickyHeader sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							{headCells?.map(label => (
								<TableCell
									key={label}
									sx={{ color: "#fff", bgcolor: "inherit" }}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{data?.length ? (
							data.map((row, index) => (
								<TableRow
									key={index}
									sx={{
										"& .MuiTableCell-root": {
											maxWidth: "10rem",
										},
									}}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{row?.name ?? "N/A"}</TableCell>

									<TableCell>
										<LinearProgress
											variant='determinate'
											value={(row?.count / highestCount) * 100}
											sx={{
												bgcolor: "rgb(243 123 33 / 20%)",
												height: "0.5rem",
												"& .MuiLinearProgress-bar": {
													bgcolor: "#f37b21",
												},
											}}
										/>
									</TableCell>

									<TableCell>{row?.count ?? "N/A"}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow
								key='no-data'
								style={{
									height: "10rem",
								}}>
								<TableCell
									colSpan={headCells.length}
									align='center'
									sx={{ borderBottom: 0 }}>
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

export default Schools;
