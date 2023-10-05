import React, { useEffect, useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import uniexperts_logo from "assets/uniexperts_logo.svg";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { _getToken } from "utils/token";
import { setLoader } from "store";
import { useDispatch } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const steps = ["Registration", "File Upload", "Terms & conditions"];

const Register = () => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);

	const nextStep = () => setStep(prevStep => prevStep + 1);
	const prevStep = () => setStep(prevStep => prevStep - 1);

	console.log("step :- ", step)

	useEffect(() => {
		if(_getToken()){
			setStep(1);
		}
	},[])

	const renderStepContent = () => {
		switch (step) {
			case 0:
				return (
					<div>
						<Box alignItems='center' justifyContent='space-between'>
							<Typography fontSize='1.9rem' fontWeight={700}>
								Register as an Agent
							</Typography>
							<Typography fontSize='0.8rem' fontWeight={300} marginBottom={4}>
								Fill up the form to register as an agent
							</Typography>
						</Box>
						<Step1 data={data} setData={setData} nextStep={nextStep} />
					</div>
				);
			// case 1:
			// 	return (
			// 		<div>
			// 			<Box alignItems='center' justifyContent='space-between'>
			// 				<Typography fontSize='1.9rem' fontWeight={700}>
			// 					Set Password
			// 				</Typography>
			// 				<Typography fontSize='0.8rem' fontWeight={300}>
			// 					Set password for your account
			// 				</Typography>
			// 			</Box>
			// 			<Step2 data={data} setData={setData} nextStep={nextStep} />
			// 		</div>
			// 	);
			case 1:
				return (
					<div>
						<Box alignItems='center' justifyContent='space-between'>
							<Typography fontSize='1.9rem' fontWeight={700}>
								Upload Documents
							</Typography>
							<Typography fontSize='0.8rem' fontWeight={300}>
								Fill up the form to register as an agent
							</Typography>
						</Box>
						<Step3 data={data} setData={setData} nextStep={nextStep} />
					</div>
				);
			case 2:
				return (
					<div>
						<Step4 data={data} />
					</div >
				);
			default:
				return null;
		}
	};

	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					primary: {
						main: "#f37b21", // Set the primary color to orange
					},
				},
				overrides: {
					MuiStepIcon: {
						root: {
							"&$active": {
								color: "#f37b21", // Set the color of active step icon to orange
							},
							"&$completed": {
								color: "#f37b21", // Set the color of completed step icon to orange
							},
						},
						active: {},
						completed: {},
					},
				},
			})}>
			<Box
				minHeight='100vh'
				display='flex'
				//alignItems={{ xs: "unset", sm: "center" }}
				justifyContent='center'>
				<Box
					p='1rem 1.25rem'
					borderRadius='0.625rem'
					flexGrow={{ xs: 1, sm: "unset" }}
					minWidth='40vw'
					display='flex'
					flexDirection='column'
					gap='2rem'>
					<img src={uniexperts_logo} alt='' style={{ width: "170px" }} />

					<Stepper activeStep={step} alternativeLabel>
						{steps.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					{renderStepContent()}
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Register;
