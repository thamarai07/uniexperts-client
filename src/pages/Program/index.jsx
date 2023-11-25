import { Box, Tab, Tabs } from "@mui/material";
import { getProgramDetails } from "apis/program";
import { getStudents } from "apis/student";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import About from "./About";
import Details from "./Details";
import Fees from "./Fees";
import Requirements from "./Requirements";
import SimilarPrograms from "./SimilarPrograms";

const tabs = ["About", "Requirements", "Fees", "Similar Programs"];

const Program = () => {
	const history = useHistory();
	const {
		location: { pathname },
	} = history || {};

	const programId = pathname?.split(
		RouteNames.program?.replace(":id", "")
	)?.[1];

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);
	const [studentList, setStudentList] = useState([]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!programId) {
			history.goBack();
			return;
		}

		dispatch(setLoader(true));

		getProgramDetails(programId)
			.then(setData)
			.catch(() => {
				history.goBack();
			})
			.finally(dispatch(setLoader(false)));
	}, [programId]);

	useEffect(() => {
		getStudents().then(students => setStudentList(students));
	}, []);

	const { name, schoolId, city, icon, about, requirements, intakes } =
		data || {};

	return (
		<>
			<Details
				programId={programId}
				schoolId={schoolId}
				name={name}
				city={city}
				icon={icon}
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

			{selectedTab === 0 ? (
				<About
					data={{ ...about, intakes, schoolId, programId }}
					studentList={studentList}
				/>
			) : null}

			{selectedTab === 1 ? <Requirements data={requirements} /> : null}

			{selectedTab === 2 ? (
				<Fees data={{ ...about?.cost, length: about?.details?.length }} />
			) : null}

			{selectedTab === 3 ? (
				<SimilarPrograms programId={programId} studentList={studentList} />
			) : null}
		</>
	);
};

export default Program;
