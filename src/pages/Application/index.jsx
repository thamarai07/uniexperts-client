import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { getApplicationDetails } from "apis/application";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import ApplicationRequirement from "./ApplicationRequirement";
import Comments from "./Comments";
import Details from "./Details";
import Documents from "./Documents";
import Payment from "./Payment";

const tabList = ["Application Requirement", "Documents", "Comments", "Payment"];

const Application = () => {
	const history = useHistory();
	const {
		location: { pathname },
	} = history || {};

	const applicationId = pathname?.split(
		RouteNames.application?.replace(":id", "")
	)?.[1];

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		if (!applicationId) {
			history.goBack();
			return;
		}
		dispatch(setLoader(true));
		getApplicationDetails(applicationId)
			.then(setData)
			.catch(() => {
				history.goBack();
			})
			.finally(dispatch(setLoader(false)));
	}, [applicationId]);

	const needHelp = () => history.push(RouteNames.support);

	return (
		<>
			<Details {...data} />

			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "flex-start", sm: "center" }}
				justifyContent='space-between'
				gap='1rem'>
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
					{tabList?.map((label, index) => (
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

				<Button
					variant='outlined'
					size='small'
					startIcon={<HelpOutlineIcon />}
					onClick={needHelp}
					sx={{
						textTransform: "none",
						borderColor: "#f37b21 !important",
						color: "#f37b21 !important",
					}}>
					Need Help
				</Button>
			</Box>

			{selectedTab === 0 ? (
				<ApplicationRequirement applicationId={applicationId} />
			) : null}

			{selectedTab === 1 ? <Documents applicationId={applicationId} /> : null}

			{selectedTab === 2 ? <Comments applicationId={applicationId} /> : null}

			{selectedTab === 3 ? (
				<Payment
					applicationId={applicationId}
					selectedCurrency={data?.application?.currency?.symbol}
				/>
			) : null}
		</>
	);
};

export default Application;
