import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { getAgentDocuments, uploadDocument } from "apis/agent";
import { s3Upload } from "apis/app";
import { DocumentStatus } from "constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const RenderRow = ({
	index,
	id,
	type,
	remark,
	status,
	url,
	_fetchData = () => {},
}) => {
	const dispatch = useDispatch();

	const hiddenFileInput = useRef(null);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			await uploadDocument({
				documentID: id,
				data: {
					url: fileURL,
				},
			});

			_fetchData();

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const onView = () => window.open(url, "_blank", "noopener,noreferrer");

	return (
		<TableRow>
			<TableCell>{index + 1}</TableCell>

			<TableCell>{type?.name}</TableCell>

			<TableCell>{type?.category}</TableCell>

			<TableCell>{type?.isMandatory ? "Yes" : "No"}</TableCell>

			<TableCell>{status}</TableCell>

			<TableCell>{remark}</TableCell>

			<TableCell>
				<IconButton disabled={!url} onClick={onView} sx={{ p: 0 }}>
					<VisibilityIcon />
				</IconButton>
			</TableCell>

			<TableCell>
				{status === DocumentStatus.REJECTED ||
				status === DocumentStatus.REQUESTED ? (
					<>
						<Button
							variant='contained'
							size='small'
							sx={{ bgcolor: "#f37b21 !important" }}
							onClick={handleAttachClick}>
							Upload
						</Button>

						<input
							type='file'
							accept='image/*, application/pdf'
							ref={hiddenFileInput}
							onChange={handleFileAttachment}
							style={{ display: "none" }}
						/>
					</>
				) : (
					"Locked"
				)}
			</TableCell>
		</TableRow>
	);
};

const tableHead = [
	"",
	"Type/Name",
	"Category",
	"Mandatory",
	"Status",
	"Review Remark",
	"View",
	"Action",
];

const Documents = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	useEffect(() => {
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		getAgentDocuments()
			.then(setData)
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{tableHead?.map(label => (
									<TableCell key={label} sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data?.length ? (
								data.map((row, index) => (
									<RenderRow
										key={row?.id}
										index={index}
										_fetchData={_fetchData}
										{...row}
									/>
								))
							) : (
								<TableRow
									key='no-data'
									style={{
										height: "10rem",
									}}>
									<TableCell colSpan={tableHead.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default Documents;
