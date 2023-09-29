import { Box, Step, StepButton, Stepper } from "@mui/material";
import { getIntakes } from "apis/intake";
import { getStaff } from "apis/staff";
import { getPreferredCountries } from "apis/student";
import { useEffect, useState } from "react";
import Documents from "./Documents";
import Education from "./Education";
import General from "./General";
import TestScore from "./TestScore";
import WorkHistory from "./WorkHistory";

const tabs = [
	"GENERAL DETAILS",
	"EDUCATIONAL",
	"TEST SCORES",
	"WORK HISTORY",
	"DOCUMENTS",
];

const AddNewStudent = () => {
	const [activeStep, setActiveStep] = useState(4);
	const [studentId, setStudentId] = useState(null);
	const [staff, setStaff] = useState([]);
	const intakes = [{
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500753c",
		month: "September",
		name: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'January 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500752c",
		month: "September",
		name: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'March 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500751c",
		month: "September",
		name: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'May 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500750c",
		month: "September",
		name: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'September 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500749c",
		month: "September",
		name: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'October 2023'
	}];
	const preferredCountries = ["Australia",
		"Austria",
		"Belgium",
		"Canada",
		"Cyprus",
		"Czech Republic",
		"Estonia",
		"France",
		"Germany",
		"Hungary",
		"Ireland",
		"Latvia",
		"Lithuania",
		"France",
		"Germany",
		"Hungary",
		"Ireland",
		"Latvia",
		"Lithuania",
		"France",
		"Germany",
		"France",
		"Germany",
		"Hungary",
		"Ireland"];

	useEffect(() => {
		Promise.all([getStaff(), getIntakes(), getPreferredCountries()]).then(
			([staffs, intakes, preferredCountries]) => {
				// setPreferredCountries(Object.values(preferredCountries || {}));

				setStaff(
					staffs?.map(({ _id, fullName }) => ({
						id: _id,
						name: fullName,
					}))
				);

				// setIntakes(
				// 	intakes?.map(({ id, month, year }) => ({
				// 		id: id,
				// 		name: `${month} ${year}`,
				// 	}))
				// );
			}
		);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [activeStep]);

	const nextStep = () => setActiveStep(activeStep + 1);

	/* if (!staff?.length) return null; */

	return (
		<>
			<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
				<Stepper
					alternativeLabel
					activeStep={activeStep}
					sx={{
						overflowX: "auto",
						overflowY: "hidden",
						"& .Mui-active": { color: "#f37b21 !important" },
						"& .Mui-completed": { color: "#f37b21 !important" },
						"&::-webkit-scrollbar": { display: "none" },
					}}>
					{tabs.map((label, index) => (
						<Step key={index}>
							<StepButton color='inherit' onClick={() => setActiveStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>
			</Box>

			{activeStep === 0 && (
				<General
					studentId={studentId}
					setStudentId={setStudentId}
					staff={staff}
					intakes={intakes}
					preferredCountries={preferredCountries}
					nextStep={nextStep}
				/>
			)}

			{activeStep === 1 && (
				<Education studentId={studentId} nextStep={nextStep} preferredCountries={preferredCountries} />
			)}
			{activeStep === 2 && (
				<TestScore studentId={studentId} nextStep={nextStep} />
			)}
			{activeStep === 3 && (
				<WorkHistory studentId={studentId} nextStep={nextStep} />
			)}
			{activeStep === 4 && (
				<Documents studentId={studentId} nextStep={nextStep} />
			)}

		</>
	);
};

export default AddNewStudent;
