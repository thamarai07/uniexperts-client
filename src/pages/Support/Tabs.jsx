import { Tab, Tabs as MUITabs } from "@mui/material";
import { Box } from "@mui/system";

const Tabs = ({ tabs, selectedTab, setSelectedTab }) => (
	<Box
		sx={{
			bgcolor: "#fff",
			p: "1rem 1.25rem",
			borderRadius: "0.625rem",
		}}>
		<MUITabs
			value={selectedTab}
			onChange={(event, newValue) => {
				setSelectedTab(newValue);
			}}
			sx={{
				"& .MuiTab-root": {
					borderBottom: "2px solid transparent",
					textTransform: "none",
				},
				"& .Mui-selected": {
					color: "#f37b21 !important",
					borderColor: "#f37b21",
				},
			}}
			indicatorColor=''>
			{tabs?.map(tab => (
				<Tab key={tab} label={tab} />
			))}
		</MUITabs>
	</Box>
);

export default Tabs;
