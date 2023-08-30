import AddIcon from "@mui/icons-material/Add";
import {
	Avatar,
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import { ModuleKeys } from "constants";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const StageContainer = ({ stages = [], activeStage }) => {
	let activeStep = 0;

	stages?.forEach(({ key }, index) => {
		if (key === activeStage) {
			activeStep = index;
		}
	});

	return (
		<Box
			bgcolor='#f5f5f5'
			p='1rem 1.25rem'
			borderRadius='0.625rem'
			overflow='auto'
			width={{ xs: "100%", sm: "30rem" }}
			height='15rem'>
			<Stepper orientation='vertical' activeStep={activeStep}>
				{stages?.map(({ key: label, value: date }, index) => (
					<Step key={label}>
						<StepLabel
							sx={{
								p: "0.125rem 0",
								"& .Mui-completed": { color: "#f37b21 !important" },
								"& .Mui-active": { color: "#f37b21 !important" },
								"& .MuiStepIcon-root": { height: "1rem" },
								"& .MuiStepLabel-label": { fontSize: "0.825rem" },
							}}
							optional={
								date && index !== activeStep ? (
									<Typography fontSize='0.75rem' position='absolute'>
										{format(new Date(date), "PPp")}
									</Typography>
								) : null
							}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

const Details = ({
	student = {},
	school = {},
	application = {},
	program = {},
	intake = {},
}) => {
	const { user: { staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);

	const history = useHistory();

	const addNewApplication = () => history.push(RouteNames.programs_and_schools);

	return (
		<>
			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "center", sm: "flex-start" }}
				justifyContent='space-between'
				gap='1rem'>
				<Box
					flexGrow={1}
					display='flex'
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "center", sm: "flex-start" }}
					textAlign={{ xs: "center", sm: "start" }}
					gap='1rem'>
					<Avatar
						src={student?.dp}
						alt=''
						sx={{ height: "4rem", width: "4rem" }}
					/>

					<Box>
						<Typography
							fontSize='1.2rem'
							fontWeight={700}
							color='#f37b21'
							maxWidth='50vw'
							noWrap>
							{student?.name}
						</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{student?.email}
						</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{student?.mobile}
						</Typography>
					</Box>
				</Box>

				<Button
					variant='contained'
					size='small'
					onClick={addNewApplication}
					startIcon={<AddIcon />}
					disabled={!modules?.includes(ModuleKeys.ProgramAndSchool)}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgba(0, 0, 0, 0.12) !important",
						},
					}}>
					Add New Application
				</Button>
			</Box>

			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems='flex-start'
				justifyContent='space-between'
				gap='1rem'>
				<Box
					flexGrow={1}
					display='flex'
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "center", sm: "flex-start" }}
					textAlign={{ xs: "center", sm: "start" }}
					gap='1rem'>
					<Avatar
						src={school?.logo}
						alt=''
						sx={{ height: "6rem", width: "6rem" }}
					/>

					<Box display='flex' flexDirection='column' gap='0.125rem'>
						<Box
							display='flex'
							gap='0.5rem'
							justifyContent={{ xs: "center", sm: "flex-start" }}>
							<Typography fontSize='0.825rem' fontWeight={500}>
								Application ID:
							</Typography>

							<Typography fontSize='0.825rem'>
								{application?.applicationId}
							</Typography>
						</Box>

						<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
							{school?.name}
						</Typography>

						<Typography
							fontSize='1rem'
							color='#f37b21'
							maxWidth={{ xs: "100%", sm: "80%" }}>
							{program?.name}
						</Typography>

						<Box display='flex' gap='0.5rem'>
							<Typography fontSize='0.825rem' fontWeight={500}>
								Intake:
							</Typography>

							<Typography fontSize='0.825rem'>
								{intake?.month} {intake?.year}
							</Typography>
						</Box>

						<Box display='flex' gap='0.5rem'>
							<Typography fontSize='0.825rem' fontWeight={500}>
								Delivery Method:
							</Typography>

							<Typography fontSize='0.825rem'>
								{program?.deliveryMethod}
							</Typography>
						</Box>

						<Box display='flex' gap='0.5rem'>
							<Typography fontSize='0.825rem' fontWeight={500}>
								Level:
							</Typography>

							<Typography fontSize='0.825rem'>
								{program?.programLevel}
							</Typography>
						</Box>

						<Box display='flex' gap='0.5rem'>
							<Typography fontSize='0.825rem' fontWeight={500}>
								Required Level:
							</Typography>

							<Typography fontSize='0.825rem'>
								{program?.requiredProgramLevel}
							</Typography>
						</Box>

						{application?.processingOfficer &&
						Object.keys(application?.processingOfficer)?.length ? (
							<Box display='flex' gap='0.5rem'>
								<Typography fontSize='0.825rem' fontWeight={500}>
									Processing Officer:
								</Typography>

								<Box display='flex' alignItems='center' gap='0.25rem'>
									<Avatar
										src={application?.processingOfficer?.dp}
										alt=''
										sx={{ height: "1.5rem", width: "1.5rem" }}
									/>

									<Typography fontSize='0.825rem'>
										{application?.processingOfficer?.name}
									</Typography>
								</Box>
							</Box>
						) : null}
					</Box>
				</Box>

				<StageContainer
					stages={application?.stages}
					activeStage={application?.stage}
				/>
			</Box>
		</>
	);
};

export default Details;
