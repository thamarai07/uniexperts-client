import {
	Box,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import CheckEligibilityDialog from "components/ProgramCard/CheckEligibilityDialog";
import { format } from "date-fns";
import { useState } from "react";

const About = ({ data, studentList }) => {
	const {
		schoolId,
		programId,
		description = "N/A",
		details: {
			programLevel = "N/A",
			length = "N/A",
			admissionStatus = "Closed",
		} = {},
		cost: {
			tuitionFees = "N/A",
			applicationFees = "N/A",
			commission = "N/A",
			costOfLiving = "N/A",
		} = {},
		intakes = [],
	} = data || {};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedIntake, setSelectedIntake] = useState({});

	const onCheckEligibility = intake => {
		setSelectedIntake(intake);
		setIsModalOpen(true);
	};

	return (
		<>
			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				flexDirection='column'
				gap='1rem'>
				<Typography fontSize='0.825rem'>{description}</Typography>

				<Box display='flex' flexDirection='column' gap='0.5rem'>
					<Typography fontSize='1rem' fontWeight={500}>
						Details
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>PROGRAM LEVEL</Typography>

								<Typography fontSize='0.75rem'>{programLevel}</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} sm={4}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>LENGTH</Typography>

								<Typography fontSize='0.75rem'>{`${length} year(s)`}</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} sm={4}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>ADMISSION STATUS</Typography>

								<Typography fontSize='0.75rem'>{admissionStatus}</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box display='flex' flexDirection='column' gap='0.5rem'>
					<Typography fontSize='1rem' fontWeight={500}>
						Cost (per year)
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>TUITION FEE</Typography>

								<Typography fontSize='0.75rem'>{tuitionFees}</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} sm={3}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>APPLICATION FEE</Typography>

								<Typography fontSize='0.75rem'>{applicationFees}</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} sm={3}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem' color='#4BA764'>
									COMMISSION
								</Typography>

								<Typography fontSize='0.75rem' color='#4BA764'>
									{commission}
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={12} sm={3}>
							<Box bgcolor='#F5F5F5' borderRadius='0.5rem' p='0.5rem 0.75rem'>
								<Typography fontSize='0.825rem'>COST OF LIVING</Typography>

								<Typography fontSize='0.75rem'>{costOfLiving}</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box display='flex' flexDirection='column' gap='0.5rem'>
					<Typography fontSize='1rem' fontWeight={500}>
						Application dates
					</Typography>

					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }}>
							<TableHead>
								<TableRow sx={{ backgroundColor: "#F37B21" }}>
									{["Start Date", "End Date", "Status", "Action"]?.map(
										label => (
											<TableCell
												key={label}
												align='left'
												sx={{ color: "#fff", p: "0.5rem 1rem" }}>
												{label}
											</TableCell>
										)
									)}
								</TableRow>
							</TableHead>

							<TableBody>
								{intakes?.length ? (
									intakes?.map(intake => (
										<TableRow key={intake?.id}>
											<TableCell sx={{ p: "0.5rem 1rem" }}>
												{format(new Date(intake?.startDate), "PPP")}
											</TableCell>

											<TableCell sx={{ p: "0.5rem 1rem" }}>
												{format(new Date(intake?.endDate), "PPP")}
											</TableCell>

											<TableCell sx={{ p: "0.5rem 1rem" }}>
												{intake?.status ?? "Closed"}
											</TableCell>

											<TableCell sx={{ p: "0.5rem 1rem" }}>
												<Button
													variant='contained'
													size='small'
													onClick={() => onCheckEligibility(intake)}
													sx={{
														bgcolor: "#f37b21 !important",
														textTransform: "none",
													}}>
													Check Eligibility
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow
										key='no-data'
										style={{
											height: "10rem",
										}}>
										<TableCell colSpan={3} align='center'>
											No Data !
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>

			<CheckEligibilityDialog
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedIntake({});
				}}
				schoolId={schoolId}
				programId={programId}
				studentList={studentList}
				selectedIntake={selectedIntake}
			/>
		</>
	);
};

export default About;
