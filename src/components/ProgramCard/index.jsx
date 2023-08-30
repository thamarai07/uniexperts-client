import {
	Box,
	Button,
	Grid,
	MenuItem,
	Select,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import CheckEligibilityDialog from "./CheckEligibilityDialog";

const ProgramCard = data => {
	const {
		id,
		name,
		about: {
			description,
			details: { programLevel = "N/A", length = "N/A" },
			cost: {
				tuitionFees = "N/A",
				commission = "N/A",
				applicationFees = "N/A",
			},
		},
		intakes = [],
		studentList,
		schoolId,
	} = data || {};

	const history = useHistory();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedIntake, setSelectedIntake] = useState(intakes[0] ?? {});

	const handleIntakeChange = ({ target: { value } }) => {
		setSelectedIntake(intakes?.filter(({ id }) => id === value)[0]);
	};

	const onViewProgram = () => {
		history.push(RouteNames.program?.replace(":id", id));
	};

	const onCheckEligibility = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<Grid item xs={12} sm={6}>
				<Box
					display='flex'
					flexDirection='column'
					gap='0.5rem'
					border='1px solid #000'
					borderRadius='0.25rem'
					p='1rem 1.25rem'
					height='100%'>
					<Box>
						<Tooltip title={name} placement='top-end'>
							<Box onClick={onViewProgram} sx={{ cursor: "pointer" }}>
								<Typography
									fontSize='0.825rem'
									fontWeight={500}
									maxWidth={{ xs: "100%", sm: "40vw" }}
									noWrap>
									{name}
								</Typography>
							</Box>
						</Tooltip>

						<Typography fontSize='0.75rem'>{description}</Typography>
					</Box>

					<Box mb='0.5rem'>
						<Typography fontSize='0.75rem' fontWeight={500}>
							Select Intake
						</Typography>

						<Select
							fullWidth
							size='small'
							value={selectedIntake?.id}
							onChange={handleIntakeChange}
							sx={{
								fontSize: "0.75rem",
								"& .MuiSelect-select": { p: "0.25rem 0.5rem" },
							}}>
							{intakes?.length ? (
								intakes?.map(intake => (
									<MenuItem
										key={intake?.id}
										value={intake?.id}
										sx={{
											fontSize: "0.75rem",
											p: "0.25rem 0.5rem",
											minHeight: "unset",
										}}>
										{`${intake?.month} (${intake?.year})`}
									</MenuItem>
								))
							) : (
								<MenuItem
									key={0}
									disabled
									value={{}}
									sx={{
										fontSize: "0.75rem",
										p: "0.25rem 0.5rem",
										minHeight: "unset",
									}}>
									No Intake Available
								</MenuItem>
							)}
						</Select>
					</Box>

					<Grid
						container
						spacing={1}
						mt={0}
						sx={{
							pb: "0.5rem",
							bgcolor: "#F5F5F5",
							borderRadius: "0.5rem",
							"& .MuiBox-root": {
								borderRight: "1px solid rgb(0 0 0 / 25%)",
								p: "0 0.75rem",
							},
							"& .MuiGrid-item:last-of-type": {
								"& .MuiBox-root": { borderRight: 0 },
							},
						}}>
						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500}>
									LEVEL
								</Typography>

								<Typography fontSize='0.75rem'>{programLevel}</Typography>
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500}>
									DURATION
								</Typography>

								<Typography fontSize='0.75rem'>{`${length} year(s)`}</Typography>
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500}>
									ADMISSION STATUS
								</Typography>

								<Typography fontSize='0.75rem'>
									{selectedIntake?.status ?? "Closed"}
								</Typography>
							</Box>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={1}
						mt={0}
						sx={{
							"& .MuiBox-root": {
								p: "0 0.75rem",
							},
						}}>
						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500}>
									TUITION FEE
								</Typography>

								<Typography fontSize='0.75rem'>{tuitionFees}</Typography>
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500}>
									APPLICATION FEE
								</Typography>

								<Typography fontSize='0.75rem'>{applicationFees}</Typography>
							</Box>
						</Grid>

						<Grid item xs={4}>
							<Box height='100%'>
								<Typography fontSize='0.75rem' fontWeight={500} color='#4BA764'>
									COMMISSION
								</Typography>

								<Typography fontSize='0.75rem' color='#4BA764'>
									{commission}
								</Typography>
							</Box>
						</Grid>
					</Grid>

					<Box
						display='flex'
						flexGrow={1}
						gap='1rem'
						alignItems='flex-end'
						justifyContent='flex-end'
						mt='0.5rem'>
						<Button
							variant='text'
							size='small'
							onClick={onViewProgram}
							sx={{ color: "#f37b21 !important", textTransform: "none" }}>
							View Program
						</Button>

						<Button
							variant='outlined'
							size='small'
							onClick={onCheckEligibility}
							sx={{
								color: "#f37b21 !important",
								borderColor: "#f37b21 !important",
								textTransform: "none",
							}}>
							Check Eligibility
						</Button>
					</Box>
				</Box>
			</Grid>

			<CheckEligibilityDialog
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				schoolId={schoolId}
				programId={id}
				studentList={studentList}
				selectedIntake={selectedIntake}
			/>
		</>
	);
};

export default ProgramCard;
