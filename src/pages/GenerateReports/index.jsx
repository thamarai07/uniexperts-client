import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Reports from "./Reports";

const tabs = ["Dashboard", "Reports"];

const GenerateReports = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Tabs
					variant='scrollable'
					value={selectedTab}
					onChange={(_, newValue) => setSelectedTab(newValue)}
					indicatorColor=''
					sx={{
						"& .Mui-selected": {
							color: "#f37b21 !important",
							borderBottomColor: "#f37b21 !important",
						},
					}}>
					{tabs?.map((label, index) => (
						<Tab
							key={index}
							label={label}
							sx={{
								textTransform: "none",
								borderBottom: "2px solid transparent",
							}}
						/>
					))}
				</Tabs>
			</Box>

			{selectedTab === 0 ? <Dashboard /> : null}

			{selectedTab === 1 ? <Reports /> : null}
		</>
	);
};

export default GenerateReports;
