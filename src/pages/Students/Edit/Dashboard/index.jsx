import { Grid } from "@mui/material";
import Application from "./Application";
import Payments from "./Payments";
import Progress from "./Progress";
import Tasks from "./Tasks";

const Dashboard = ({ studentId, sendToTaskTab }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Progress studentId={studentId} />
			</Grid>

			<Grid item xs={12} sm={6}>
				<Tasks studentId={studentId} sendToTaskTab={sendToTaskTab} />
			</Grid>

			<Grid item xs={12} sm={6}>
				<Application studentId={studentId} />
			</Grid>

			<Grid item xs={12} sm={6}>
				<Payments studentId={studentId} />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
