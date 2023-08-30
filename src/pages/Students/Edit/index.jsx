import { Avatar, Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getIntakes } from "apis/intake";
import { getStaff } from "apis/staff";
import {
	getPreferredCountries,
	getStudentGeneralInformation,
} from "apis/student";
import { getExamTypes } from "apis/testScore";
import { ModuleKeys } from "constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import Applications from "./Applications";
import Comments from "./Comments";
import Dashboard from "./Dashboard";
import Documents from "./Documents";
import Education from "./Education";
import General from "./General";
import Payments from "./Payments";
import Task from "./Task";
import TestScore from "./TestScore";
import WorkHistory from "./WorkHistory";

const tabList = [
	"Dashboard",
	"General Details",
	"Education",
	"Test Score",
	"Task",
	"Comments",
	"Work History",
	"Documents",
	"Applications",
	"Payments",
];

const EditStudent = () => {
	const history = useHistory();
	const {
		location: { pathname },
	} = history || {};

	const studentId = pathname?.split(
		RouteNames.edit_student?.replace(":id", "")
	)?.[1];

	const { user: { staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);
	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);
	const [examTypes, setExamTypes] = useState([]);
	const [staff, setStaff] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [preferredCountries, setPreferredCountries] = useState([]);

	useEffect(() => {
		if (!studentId) {
			history.goBack();
			return;
		}

		dispatch(setLoader(true));

		getStudentGeneralInformation(studentId)
			.then(setData)
			.catch(() => {
				history.goBack();
			})
			.finally(dispatch(setLoader(false)));
	}, [studentId]);

	useEffect(() => {
		Promise.all([
			getExamTypes(),
			getStaff(),
			getIntakes(),
			getPreferredCountries(),
		]).then(([examTypes, staffs, intakes, preferredCountries]) => {
			setPreferredCountries(Object.values(preferredCountries || {}));

			setExamTypes(examTypes);

			setStaff(
				staffs?.map(({ id, fullName }) => ({
					id: id,
					name: fullName,
				}))
			);

			setIntakes(
				intakes?.map(({ id, month, year }) => ({
					id: id,
					name: `${month} ${year}`,
				}))
			);
		});
	}, []);

	const onChangeTab = (event, newValue) => setSelectedTab(newValue);

	const onSearchAndApply = () => {
		history.push({
			pathname: RouteNames.programs_and_schools,
			state: { studentId },
		});
	};

	const {
		studentInformation: { firstName, lastName, dp, email, mobile } = {},
	} = data || {};

	return (
		<>
			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "center", sm: "flex-start" }}
				justifyContent='space-between'
				gap='1rem'>
				<Box
					flexGrow={1}
					display='flex'
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "center", sm: "flex-start" }}
					textAlign={{ xs: "center", sm: "start" }}
					gap='1rem'>
					<Avatar src={dp} alt='' sx={{ height: "4rem", width: "4rem" }} />

					<Box>
						<Typography
							fontSize='1.2rem'
							fontWeight={700}
							color='#f37b21'
							maxWidth='50vw'
							noWrap>
							{`${firstName} ${lastName}`}
						</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{email}
						</Typography>

						<Typography fontSize='0.825rem' color='#f37b21'>
							{mobile}
						</Typography>
					</Box>
				</Box>

				<Button
					variant='contained'
					size='small'
					onClick={onSearchAndApply}
					disabled={!modules?.includes(ModuleKeys.ProgramAndSchool)}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgba(0, 0, 0, 0.12) !important",
						},
					}}>
					Search and Apply
				</Button>
			</Box>

			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Tabs
					variant='scrollable'
					value={selectedTab}
					onChange={onChangeTab}
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
			</Box>

			{selectedTab === 0 ? (
				<Dashboard
					studentId={studentId}
					sendToTaskTab={() => setSelectedTab(4)}
				/>
			) : null}

			{selectedTab === 1 ? (
				<General
					studentId={studentId}
					staff={staff}
					intakes={intakes}
					preferredCountries={preferredCountries}
				/>
			) : null}

			{selectedTab === 2 ? <Education studentId={studentId} /> : null}

			{selectedTab === 3 ? (
				<TestScore
					studentId={studentId}
					examTypes={examTypes}
					name={`${firstName} ${lastName}`}
				/>
			) : null}

			{selectedTab === 4 ? <Task studentId={studentId} /> : null}

			{selectedTab === 5 ? <Comments studentId={studentId} /> : null}

			{selectedTab === 6 ? <WorkHistory studentId={studentId} /> : null}

			{selectedTab === 7 ? <Documents studentId={studentId} /> : null}

			{selectedTab === 8 ? <Applications studentId={studentId} /> : null}

			{selectedTab === 9 ? <Payments studentId={studentId} /> : null}
		</>
	);
};

export default EditStudent;
