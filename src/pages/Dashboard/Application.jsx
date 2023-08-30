import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { ModuleKeys } from "constants";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const headCells = [
	"",
	"Application ID",
	"Status",
	"Stage",
	"Created At",
	"Action",
];

const Application = ({ data = [] }) => {
	const history = useHistory();

	const { user: { staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);

	const addNewApplication = () => history.push(RouteNames.programs_and_schools);

	const onView = applicationId => {
		history.push(RouteNames.application?.replace(":id", applicationId));
	};

	return (
		<Box
			bgcolor='#fff'
			p='1rem 1.25rem'
			borderRadius='0.625rem'
			display='flex'
			flexDirection='column'
			height='100%'
			gap='1rem'>
			<Box display='flex' alignItems='center' justifyContent='space-between'>
				<Typography fontSize='1.2rem' color='#f37b21' fontWeight={500}>
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

			<TableContainer
				component={Paper}
				sx={{
					height: "100%",
					maxHeight: "22rem",
					overflow: "auto",
				}}>
				<Table stickyHeader sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							{headCells?.map(label => (
								<TableCell
									key={label}
									align='left'
									sx={{ color: "#fff", bgcolor: "inherit" }}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{!!modules?.includes(ModuleKeys.Applications) && data?.length ? (
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

export default Application;
