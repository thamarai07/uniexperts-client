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
	"EDUCATION DETAILS",
	"DOCUMENTS",
	"WORK HISTORY",
	"TEST SCORE",
];

const AddNewStudent = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [studentId, setStudentId] = useState(null);
	const [staff, setStaff] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [preferredCountries, setPreferredCountries] = useState([]);

	console.log("hello student", activeStep);

	useEffect(() => {
		Promise.all([getStaff(), getIntakes(), getPreferredCountries()]).then(
			([staffs, intakes, preferredCountries]) => {
				setPreferredCountries(Object.values(preferredCountries || {}));

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
				<Education studentId={studentId} nextStep={nextStep} />
			)}

			{activeStep === 2 && (
				<Documents studentId={studentId} nextStep={nextStep} />
			)}

			{activeStep === 3 && (
				<WorkHistory studentId={studentId} nextStep={nextStep} />
			)}

			{activeStep === 4 && (
				<TestScore studentId={studentId} setStudentId={setStudentId} />
			)}
		</>
	);
};

export default AddNewStudent;
