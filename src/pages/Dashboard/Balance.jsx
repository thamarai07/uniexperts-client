import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { getAccountSummary } from "apis/payment";
import WithdrawModal from "components/WithdrawModal";
import { ModuleKeys } from "constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";

const Balance = ({ currencies = [], isAccountDisabled }) => {
	const { user: { staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);
	const dispatch = useDispatch();

	const [selectedCurrency, setSelectedCurrency] = useState(
		currencies[0]?.symbol ?? ""
	);
	const [currentWalletAmount, setCurrentWalletAmount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setSelectedCurrency(currencies[0]?.symbol);
	}, [currencies]);

	useEffect(() => {
		if (!selectedCurrency) return;

		dispatch(setLoader(true));

		getAccountSummary(selectedCurrency)
			.then(accountSummary => {
				const selectedCurrencyDetails = currencies?.filter(
					({ symbol }) => symbol === selectedCurrency
				)[0];

				setCurrentWalletAmount(
					`${selectedCurrencyDetails?.sign} ${
						(+accountSummary?.currentWalletAmount)?.toFixed(2) ?? 0
					}`
				);
			})
			.finally(dispatch(setLoader(false)));
	}, [selectedCurrency]);

	return (
		<>
			<Box
				bgcolor='#fff'
				p='1rem 1.2rem'
				borderRadius='0.625rem'
				display='flex'
				flexDirection='column'
				height='100%'
				maxHeight='15rem'
				gap='1rem'>
				<Typography fontSize='1.2rem' color='#f37b21' fontWeight={500}>
					Balance
				</Typography>

				{isAccountDisabled || !modules?.includes(ModuleKeys.Financial) ? (
					<Box>
						<Typography fontSize='1rem' align='center'>
							No Data !
						</Typography>
					</Box>
				) : (
					<>
						<Tabs
							sx={{
								minHeight: "auto",
								"& .MuiTabs-flexContainer": {
									gap: "0.5rem",
								},
								"& .Mui-selected": {
									backgroundColor: "rgb(243 123 33 / 30%)",
									color: "#F37B21 !important",
								},
							}}
							variant='scrollable'
							indicatorColor='null'
							value={selectedCurrency}
							onChange={(_, newValue) => setSelectedCurrency(newValue)}>
							{currencies?.map(({ sign, symbol, id }) => (
								<Tab
									sx={{
										bgcolor: "#D3D3D3",
										p: "0.25rem 0.5rem",
										minHeight: "auto",
										minWidth: "unset",
										borderRadius: "0.25rem",
										fontSize: "0.75rem",
										fontWeight: 600,
									}}
									key={id}
									label={`${sign} ${symbol}`}
									value={symbol}
								/>
							))}
						</Tabs>

						<Box
							flexGrow={1}
							display='flex'
							alignItems='center'
							justifyContent='center'>
							<Typography fontSize='1.5rem' fontWeight={500} align='center'>
								{currentWalletAmount}
							</Typography>
						</Box>

						<Button
							fullWidth
							variant='outlined'
							size='small'
							onClick={() => setIsOpen(true)}
							disabled={
								isAccountDisabled || !modules?.includes(ModuleKeys.Financial)
							}
							sx={{
								textTransform: "none",
								color: "#f37b21 !important",
								borderColor: "#f37b21 !important",
								"&:disabled": {
									color: "rgba(0, 0, 0, 0.26) !important",
									borderColor: "rgba(0, 0, 0, 0.12) !important",
								},
							}}>
							Withdraw Amount
						</Button>
					</>
				)}
			</Box>

			{isOpen ? (
				<WithdrawModal isModalOpen={isOpen} setModalOpen={setIsOpen} />
			) : null}
		</>
	);
};

export default Balance;
