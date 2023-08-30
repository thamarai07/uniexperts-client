import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { Box } from "@mui/system";

const Fees = ({ data }) => {
	const {
		tuitionFees,
		costOfLiving,
		applicationFees,
		estimatedTotalPerYear,
		length,
	} = data || {};

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							<TableCell sx={{ color: "#fff" }}>Description</TableCell>

							<TableCell sx={{ color: "#fff" }}>Cost Per Year</TableCell>

							<TableCell sx={{ color: "#fff" }}>Total Cost</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						<TableRow>
							<TableCell>Avg Cost of Tuition/Year</TableCell>

							<TableCell>{tuitionFees ?? "N/A"}</TableCell>

							<TableCell>
								{tuitionFees ? tuitionFees * length : "N/A"}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Cost of Living/Year</TableCell>

							<TableCell>{costOfLiving ?? "N/A"}</TableCell>

							<TableCell>
								{costOfLiving ? costOfLiving * length : "N/A"}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								Application Fee{" "}
								<span style={{ fontSize: "75%" }}>
									(Charged once per application)
								</span>
							</TableCell>

							<TableCell>{applicationFees ?? "N/A"}</TableCell>

							<TableCell>
								{applicationFees ? applicationFees * length : "N/A"}
							</TableCell>
						</TableRow>

						<TableRow
							sx={{
								"& .MuiTableCell-root": {
									color: "#f37b21",
									fontSize: "1rem",
									fontWeight: 500,
								},
							}}>
							<TableCell>Estimated Total</TableCell>

							<TableCell>{estimatedTotalPerYear ?? "N/A"}</TableCell>

							<TableCell>
								{estimatedTotalPerYear ? estimatedTotalPerYear * length : "N/A"}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Fees;
