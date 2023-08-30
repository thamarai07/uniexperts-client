import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Box,
	Dialog,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { getSchoolCommissions } from "apis/commission";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const SlabDialogue = ({ open, toggleOpen, slabs }) => (
	<Dialog
		open={open}
		onBackdropClick={toggleOpen}
		onClose={toggleOpen}
		PaperProps={{
			sx: {
				width: { xs: "100%", sm: "80vw" },
				height: { xs: "100%", sm: "auto" },
				maxWidth: "unset",
				maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
				m: 0,
			},
		}}>
		<Box display='flex' flexDirection='column' gap='1rem'>
			<Box
				sx={{
					p: "1rem 2rem",
					overflow: "auto",
				}}>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Slab
					</Typography>

					<IconButton onClick={toggleOpen} sx={{ p: 0 }}>
						<CloseIcon />
					</IconButton>
				</Box>
			</Box>

			<Box
				sx={{
					p: "0 2rem 1rem",
					overflow: "hidden",
				}}>
				<TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
					<Table stickyHeader sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{[
									"",
									"Minimum",
									"Maximum",
									"Commission Rate",
									"Fixed Commission",
								]?.map(label => (
									<TableCell
										key={label}
										sx={{ color: "#fff", bgcolor: "inherit" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{slabs?.length ? (
								slabs.map((row, index) => (
									<TableRow key={index}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.min ?? "N/A"}</TableCell>

										<TableCell>{row?.max ?? "N/A"}</TableCell>

										<TableCell>{row?.commissionRate ?? "N/A"}</TableCell>

										<TableCell>{row?.fixedCommission ?? "N/A"}</TableCell>
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
					</Table>
				</TableContainer>
			</Box>
		</Box>
	</Dialog>
);

const RenderRow = ({
	school = {},
	program = {},
	intake = {},
	type,
	model,
	givenTo,
	slabs = [],
	index,
}) => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	return (
		<>
			<TableRow>
				<TableCell>{index + 1}</TableCell>

				<TableCell>{school?.name ?? "N/A"}</TableCell>

				<TableCell>{program?.name ?? "N/A"}</TableCell>

				<TableCell>{intake?.name ?? "N/A"}</TableCell>

				<TableCell>{type ?? "N/A"}</TableCell>

				<TableCell>{model ?? "N/A"}</TableCell>

				<TableCell>{givenTo ?? "N/A"}</TableCell>

				<TableCell>
					<IconButton xs={{ p: 0 }} onClick={toggleOpen}>
						<VisibilityIcon />
					</IconButton>
				</TableCell>
			</TableRow>

			<SlabDialogue open={open} toggleOpen={toggleOpen} slabs={slabs} />
		</>
	);
};

const headCells = [
	"",
	"School",
	"Program",
	"Intake",
	"Type",
	"Model",
	"Given To",
	"Slab",
];

const SchoolCommission = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	useEffect(() => {
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		getSchoolCommissions()
			.then(setData)
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							{headCells?.map(label => (
								<TableCell key={label} sx={{ color: "#fff" }}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{data?.length ? (
							data.map((row, index) => (
								<RenderRow key={row?.id} index={index} {...row} />
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
				</Table>
			</TableContainer>
		</Box>
	);
};

export default SchoolCommission;
