import AgentEarning from "./AgentEarning";
import Cards from "./Cards";
import TotalEarning from "./TotalEarning";

const Dashboard = () => {
	return (
		<>
			<TotalEarning />

			<Cards />

			<AgentEarning />
		</>
	);
};

export default Dashboard;
