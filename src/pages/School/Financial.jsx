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

const Financial = ({
	avgCostOfTuitionPerYear,
	applicationFees,
	costOfLivingPerYear,
	estimatedTotalPerYear,
}) => {
	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							<TableCell sx={{ color: "#fff" }}>Description</TableCell>

							<TableCell sx={{ color: "#fff" }}>Subtotal</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						<TableRow>
							<TableCell>Avg Cost of Tuition/Year</TableCell>

							<TableCell>{avgCostOfTuitionPerYear}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Cost of Living/Year</TableCell>

							<TableCell>{costOfLivingPerYear}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								Application Fee{" "}
								<span style={{ fontSize: "75%" }}>
									(Charged once per application)
								</span>
							</TableCell>

							<TableCell>{applicationFees}</TableCell>
						</TableRow>

						<TableRow
							sx={{
								"& .MuiTableCell-root": {
									color: "#f37b21",
									fontSize: "1rem",
									fontWeight: 500,
								},
							}}>
							<TableCell>Estimated Total/Year</TableCell>

							<TableCell>{estimatedTotalPerYear}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Financial;
