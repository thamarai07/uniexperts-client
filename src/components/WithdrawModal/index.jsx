import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrencies } from "apis/payment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import Status from "./Status";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const WithdrawModal = ({ isModalOpen, setModalOpen }) => {
	const dispatch = useDispatch();

	const [step, setStep] = useState(1);
	const [data, setData] = useState({});
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		dispatch(setLoader(true));
		getCurrencies()
			.then(res => setCurrencies(res))
			.finally(dispatch(setLoader(false)));
	}, []);

	const nextStep = () => {
		setStep(step + 1);
	};
	const previousStep = () => {
		setStep(step - 1);
	};

	const handleOnChange = ({ key, value }) => {
		setData({
			...data,
			[key]: value,
		});
	};

	return (
		<Dialog
			open={isModalOpen}
			onClose={() => {
				setModalOpen(false);
				setStep(1);
			}}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "60vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box p='1rem 2rem' height='100%'>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						{step === 4 ? "OTP Verification" : "Withdrawal"}
					</Typography>

					<IconButton
						onClick={() => {
							setModalOpen(false);
						}}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					minHeight='50vh'
					height='100%'
					maxHeight='80vh'
					overflow='auto'
					pt='1rem'>
					{step == 1 ? (
						<Step1
							currencies={currencies}
							data={data}
							handleOnChange={handleOnChange}
							nextStep={nextStep}
						/>
					) : null}

					{step == 2 ? (
						<Step2
							setData={setData}
							data={data}
							handleOnChange={handleOnChange}
							nextStep={nextStep}
							prevStep={previousStep}
						/>
					) : null}

					{step == 3 ? (
						<Step3
							setData={setData}
							data={data}
							nextStep={nextStep}
							prevStep={previousStep}
						/>
					) : null}

					{step == 4 ? (
						<Step4
							setData={setData}
							data={data}
							nextStep={nextStep}
							prevStep={previousStep}
						/>
					) : null}

					{step == 5 ? <Status data={data} /> : null}
				</Box>
			</Box>
		</Dialog>
	);
};

export default WithdrawModal;
