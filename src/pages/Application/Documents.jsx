import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { getApplicationDocuments } from "apis/application";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { setLoader } from "store";

const headCells = [
	"",
	"Type/Name",
	"Category",
	"Used For",
	"Mandatory",
	"Status",
	"Review Remarks",
	"Action",
];

const Documents = ({ applicationId }) => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	useEffect(() => {
		dispatch(setLoader(true));
		getApplicationDocuments(applicationId)
			.then(setData)
			.finally(dispatch(setLoader(false)));
	}, []);

	const openURL = url => {
		window.open(url, "_blank", "noopener,noreferrer");
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
							data.map((document, index) => (
								<TableRow key={document?.id}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{document?.type?.name}</TableCell>

									<TableCell>{document?.type?.category}</TableCell>

									<TableCell>{document?.type?.usedBy}</TableCell>

									<TableCell>
										{document?.type?.isMandatory ? "Yes" : "No"}
									</TableCell>

									<TableCell>{document?.status}</TableCell>

									<TableCell>{document?.remark ?? "--"}</TableCell>

									<TableCell>
										<IconButton
											sx={{ p: 0 }}
											disabled={!document?.url}
											onClick={() => openURL(document?.url)}>
											<VisibilityIcon />
										</IconButton>
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
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Documents;
