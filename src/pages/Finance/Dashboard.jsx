import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
	Grid,
	IconButton,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getCurrency } from "apis/currency";
import { getAccountSummary, getPaymentTransactions } from "apis/payment";
import waveIcon from "assets/icons/primary-account-wave.png";
import { DateFilter } from "components/DateFilter";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const headCells = [
	"Sno.",
	"Type",
	"Application ID",
	"College",
	"Currency",
	"Amount",
	"Status",
	"Date",
];

const filterFormat = "DD-MM-YYYY";

const SummaryCard = ({ isPrimary = false, label, amount, currencyLabel }) => {
	return (
		<Grid item xs={12} sm={12} md={4} overflow='hidden'>
			<Box
				display='flex'
				alignItems='center'
				gap='2rem'
				bgcolor={isPrimary ? "#F37B21" : "#F5F5F5"}
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				height='100%'
				sx={{
					backgroundImage: isPrimary ? `url('${waveIcon}')` : null,
					backgroundRepeat: "no-repeat",
					backgroundPositionX: "bottom",
					backgroundPositionY: "2rem",
					backgroundSize: "cover",
				}}>
				<IconButton
					disableRipple
					sx={{
						height: "4rem",
						width: "4rem",
						borderRadius: "50%",
						bgcolor: isPrimary ? "#fff" : "#EBE8E8",
						color: isPrimary ? "#F37B21" : "#363A3F",
						cursor: "default",
					}}>
					<AccountBalanceWalletIcon color='inherit' sx={{ scale: "1.5" }} />
				</IconButton>

				<Box color={isPrimary ? "#fff" : "#000"}>
					<Typography color='inherit' fontSize='1.125rem'>
						{label}
					</Typography>

					<Typography
						fontSize='2rem'
						fontWeight={500}
						color='inherit'
						sx={{ lineBreak: "anywhere" }}>
						{amount}
					</Typography>

					<Typography color='inherit' fontSize='1rem' sx={{ opacity: 0.6 }}>
						{currencyLabel}
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

const AccountSummary = ({
	currencyList,
	selectedCurrency,
	setSelectedCurrency,
	accountSummary,
}) => {
	const selectedCurrencyDetails = currencyList?.filter(
		({ symbol }) => symbol === selectedCurrency
	)[0];

	return (
		<Box sx={{ bgcolor: "#fff", borderRadius: "0.625rem", p: "1rem 1.25rem" }}>
			<Tabs
				sx={{
					minHeight: "auto",
					"& .MuiTabs-flexContainer": {
						gap: "1rem",
					},
					"& .Mui-selected": {
						backgroundColor: "rgb(243 123 33 / 30%)",
						color: "#F37B21 !important",
					},
				}}
				variant='scrollable'
				indicatorColor='null'
				value={selectedCurrency}
				onChange={(event, newValue) => setSelectedCurrency(newValue)}>
				{currencyList?.map(({ sign, symbol, id }) => (
					<Tab
						sx={{
							bgcolor: "#D3D3D3",
							p: "0.5rem 1rem",
							minHeight: "auto",
							borderRadius: "0.25rem",
							fontSize: "0.825rem",
							fontWeight: 600,
						}}
						key={id}
						label={`${sign} ${symbol}`}
						value={symbol}
					/>
				))}
			</Tabs>

			{Object.values(accountSummary)?.length ? (
				<Grid container spacing={2} mt='0.5rem'>
					<SummaryCard
						isPrimary
						label='Current Wallet Amount'
						amount={`${selectedCurrencyDetails?.sign} ${(+accountSummary?.currentWalletAmount)?.toFixed(2) ?? 0
							}`}
						currencyLabel={selectedCurrencyDetails?.name}
					/>

					<SummaryCard
						label='Amount Withdrawn'
						amount={`${selectedCurrencyDetails?.sign} ${(+accountSummary?.totalWithdrawn)?.toFixed(2) ?? 0
							}`}
						currencyLabel={selectedCurrencyDetails?.name}
					/>

					<SummaryCard
						label='Total Earned'
						amount={`${selectedCurrencyDetails?.sign} ${(+accountSummary?.totalEarned)?.toFixed(2) ?? 0
							}`}
						currencyLabel={selectedCurrencyDetails?.name}
					/>
				</Grid>
			) : null}
		</Box>
	);
};

const Dashboard = () => {
	const dispatch = useDispatch();

	const [currencyList, setCurrencyList] = useState([]);
	const [selectedCurrency, setSelectedCurrency] = useState("");
	const [accountSummary, setAccountSummary] = useState({});

	const [dateRange, setDateRange] = useState([null, null]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);

	const [data, setData] = useState([
		{
			type: "Commission",
			applicationId: "App-0102",
			college: "South Carolina",
			currency: "$ - Dollar",
			amount: "$8678",
			status: "Credited",
			updatedAt: "2023-11-25",
		},
		{
			type: "Admission Charge",
			applicationId: "App-0102",
			college: "ASU",
			currency: "$ - Dollar",
			amount: "$8678",
			status: "Credited",
			updatedAt: "2023-11-25",
		},
	]);

	useEffect(() => {
		getCurrency().then(currencies => {
			setCurrencyList(currencies);
			setSelectedCurrency(currencies[0]?.symbol);
		});
	}, []);

	useEffect(() => {
		if (!selectedCurrency) return;

		getAccountSummary(selectedCurrency).then(setAccountSummary);
	}, [selectedCurrency]);

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage, dateRange]);

	const _fetchData = () => {
		let requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
		};

		const [startDate, endDate] = dateRange || [];

		if (startDate) {
			requestParams.startDate = format(startDate, "yyyy-MM-dd");
		}

		if (endDate) {
			requestParams.endDate = format(endDate, "yyyy-MM-dd");
		}

		dispatch(setLoader(true));

		getPaymentTransactions(requestParams)
			.then(response => {
				setData(response?.data ?? []);
				setTotal(response?.meta?.total ?? 0);
			})
			.finally(() => dispatch(setLoader(false)));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	return (
		<>
			{selectedCurrency ? (
				<AccountSummary
					currencyList={currencyList}
					selectedCurrency={selectedCurrency}
					setSelectedCurrency={setSelectedCurrency}
					accountSummary={accountSummary}
				/>
			) : null}

			<Box
				sx={{ bgcolor: "#fff", borderRadius: "0.625rem", p: "1rem 1.25rem" }}>
				<DateFilter dateRange={dateRange} setDateRange={setDateRange} />
				<TableContainer component={Paper} sx={{ mt: "1rem" }}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{headCells?.map(label => (
									<TableCell key={label} align='left' sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data?.length ? (
								data.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{row?.type ?? "N/A"}</TableCell>
										<TableCell>{row?.applicationId ?? "N/A"}</TableCell>
										<TableCell>{row?.college ?? "N/A"}</TableCell>
										<TableCell>{row?.currency ?? "N/A"}</TableCell>
										<TableCell>{row?.amount ?? "N/A"}</TableCell>
										<TableCell>{row?.status ?? "N/A"}</TableCell>
										<TableCell>
											{format(new Date(row?.updatedAt), "PPp")}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow
									key='no-data'
									style={{
										height: "10rem",
									}}>
									<TableCell colSpan={headCells.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[25, 50, 100]}
									colSpan={headCells.length}
									count={total}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default Dashboard;
