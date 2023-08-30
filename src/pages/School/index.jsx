import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { getSchoolDetails } from "apis/school";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import About from "./About";
import Address from "./Address";
import Details from "./Details";
import EntryRequirements from "./EntryRequirements";
import Features from "./Features";
import Financial from "./Financial";
import ImageCarousel from "./ImageCarousel";
import Programs from "./Programs";

const tabs = [
	"About",
	"Features",
	"Address",
	"Financial",
	"Programs",
	"Entry Requirements",
];

const School = () => {
	const history = useHistory();
	const {
		location: { pathname },
	} = history || {};

	const schoolId = pathname?.split(RouteNames.school?.replace(":id", ""))?.[1];

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!schoolId) {
			history.goBack();
			return;
		}

		dispatch(setLoader(true));

		getSchoolDetails(schoolId)
			.then(setData)
			.catch(() => {
				history.goBack();
			})
			.finally(dispatch(setLoader(false)));
	}, [schoolId]);

	const browsePrograms = () => setSelectedTab(4);

	const {
		id,
		basicDetails,
		address,
		about,
		features,
		financialDescription,
		entryRequirements,
	} = data || {};

	return (
		<>
			<ImageCarousel images={basicDetails?.images} />

			<Details
				{...basicDetails}
				address={address}
				browsePrograms={browsePrograms}
			/>

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
							sx={{
								textTransform: "none",
								borderBottom: "2px solid transparent",
							}}
						/>
					))}
				</Tabs>
			</Box>

			{selectedTab === 0 ? <About data={about} /> : null}

			{selectedTab === 1 ? <Features data={features} /> : null}

			{selectedTab === 2 ? <Address {...address} /> : null}

			{selectedTab === 3 ? <Financial {...financialDescription} /> : null}

			{selectedTab === 4 ? <Programs schoolId={id} /> : null}

			{selectedTab === 5 ? (
				<EntryRequirements data={entryRequirements} />
			) : null}
		</>
	);
};

export default School;
