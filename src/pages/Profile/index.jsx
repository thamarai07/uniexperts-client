import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import AccountManager from "./AccountManager";
import BankingInformation from "./BankingInformation";
import BranchManagement from "./BranchManagement";
import CommissionPolicy from "./CommissionPolicy";
import CompanyInformation from "./CompanyInformation";
import Documents from "./Documents";
import GeneralInformation from "./GeneralInformation";
import ManageStaff from "./ManageStaff";
import SchoolCommission from "./SchoolCommission";

const tabs = [
	"General Information",
	"Company Information",
	"Document",
	"Banking Information",
	"School Commissions",
	"Commission Policy",
	"Manage Staff",
	"Branch Management",
];

const Profile = () => {
	const { user: { staff: { role, id: staffId } = {} } = {} } = useSelector(
		state => state
	);

	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<>
			<AccountManager />

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
					{tabs?.map(tab => (
						<Tab
							key={tab}
							label={tab}
							disabled={!(role === "admin")}
							sx={{
								textTransform: "none",
								borderBottom: "2px solid transparent",
							}}
						/>
					))}
				</Tabs>
			</Box>

			{selectedTab === 0 ? <GeneralInformation staffId={staffId} /> : null}

			{selectedTab === 1 ? <CompanyInformation /> : null}

			{selectedTab === 2 ? <Documents /> : null}

			{selectedTab === 3 ? <BankingInformation /> : null}

			{selectedTab === 4 ? <SchoolCommission /> : null}

			{selectedTab === 5 ? <CommissionPolicy /> : null}

			{selectedTab === 6 ? <ManageStaff /> : null}

			{selectedTab === 7 ? <BranchManagement /> : null}
		</>
	);
};

export default Profile;
