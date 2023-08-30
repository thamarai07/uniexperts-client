import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Commissions from "./Commissions";
import Dashboard from "./Dashboard";
import Invoice from "./Invoice";
import Payments from "./Payments";
import WithdrawModal from "components/WithdrawModal";

const tabs = ["Dashboard", "Commissions", "Invoice", "Payments"];

const Finance = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

	return (
		<>
			<Box
				sx={{ bgcolor: "#fff", borderRadius: "0.625rem", p: "1rem 1.25rem" }}>
				<Box
					display='flex'
					justifyContent='space-between'
					gap='1rem'
					sx={{
						flexDirection: {
							xs: "column",
							sm: "row",
						},
						alignItems: {
							xs: "flex-start",
							sm: "center",
						},
					}}>
					<Typography fontSize='1.2rem' fontWeight={700} color='#F37B21'>
						Payment
					</Typography>

					<Box display='flex' gap='1rem'>
						<Button
							variant='outlined'
							size='small'
							sx={{
								textTransform: "none",
								color: "#F37B21 !important",
								borderColor: "#F37B21 !important",
							}}>
							Download
						</Button>

						<Button
							variant='contained'
							size='small'
							sx={{
								textTransform: "none",
								bgcolor: "#F37B21 !important",
							}}
							onClick={() => {
								setWithdrawalModalOpen(true);
							}}>
							Withdraw
						</Button>
					</Box>
				</Box>

				<Box sx={{ borderBottom: 1, borderColor: "divider", mt: "1rem" }}>
					<Tabs
						sx={{
							"& .MuiButtonBase-root": {
								borderBottom: "0.1rem solid transparent",
								textTransform: "none",
							},
							"& .Mui-selected": {
								color: "#F37B21 !important",
								borderBottomColor: "#F37B21",
							},
						}}
						variant='scrollable'
						indicatorColor='none'
						value={selectedTab}
						onChange={(event, newValue) => setSelectedTab(newValue)}>
						{tabs?.map(tabLabel => (
							<Tab key={tabLabel} label={tabLabel} />
						))}
					</Tabs>
				</Box>
			</Box>

			{selectedTab === 0 && <Dashboard />}

			{selectedTab === 1 && <Commissions />}

			{selectedTab === 2 && <Invoice />}

			{selectedTab === 3 && <Payments />}

			{isWithdrawalModalOpen ? (
				<WithdrawModal
					isModalOpen={isWithdrawalModalOpen}
					setModalOpen={setWithdrawalModalOpen}
				/>
			) : null}
		</>
	);
};

export default Finance;
