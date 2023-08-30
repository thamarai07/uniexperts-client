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
	Typography,
} from "@mui/material";
import { uploadAgentDocuments } from "apis/agent";
import { s3Upload } from "apis/app";
import { getPartnerDocumentsList } from "apis/document";
import uniexperts_logo from "assets/uniexperts_logo.svg";
import { DocumentStatus } from "constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader, setUser } from "store";

const RenderRow = ({
	documentId,
	index,
	handleFileAttachment,
	name,
	isMandatory,
	url,
}) => {
	const hiddenFileInput = useRef(null);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const onView = () => window.open(url, "_blank", "noopener,noreferrer");

	return (
		<TableRow key={documentId}>
			<TableCell>{index + 1}</TableCell>

			<TableCell>{name}</TableCell>

			<TableCell>{isMandatory ? "Yes" : "No"}</TableCell>

			<TableCell
				sx={{
					color: url ? "forestgreen" : "rgba(0, 0, 0, 0.87)",
				}}>
				{url ? DocumentStatus.UPLOADED : DocumentStatus.PENDING}
			</TableCell>

			<TableCell>
				<IconButton disabled={!url} onClick={onView} sx={{ p: 0 }}>
					<VisibilityIcon />
				</IconButton>
			</TableCell>

			<TableCell>
				<Button
					variant='contained'
					size='small'
					onClick={handleAttachClick}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						width: "100%",
					}}>
					{url ? "Re Upload" : "Upload"}
				</Button>

				<input
					name={documentId}
					type='file'
					accept='image/*, application/pdf'
					ref={hiddenFileInput}
					onChange={handleFileAttachment}
					style={{ display: "none" }}
				/>
			</TableCell>
		</TableRow>
	);
};

const tableHead = ["", "Name", "Is Mandatory", "Status", "View", "Action"];

const UploadDocuments = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [documents, setDocuments] = useState([]);
	const [isBtnEnable, setIsBtnEnable] = useState(false);

	useEffect(() => {
		dispatch(setLoader(true));

		getPartnerDocumentsList()
			.then((res = []) => {
				const tempDocumentObj = {};
				res.forEach(document => {
					const { id, name, isMandatory } = document || {};

					tempDocumentObj[id] = {
						name,
						isMandatory,
						url: "",
					};
				});

				setDocuments(tempDocumentObj);
			})
			.finally(dispatch(setLoader(false)));
	}, []);

	useEffect(() => {
		if (!Object.keys(documents)?.length) return;

		let temp = true;
		Object.values(documents)?.map(({ isMandatory, url }) => {
			if (isMandatory && !url) temp = false;
		});

		setIsBtnEnable(temp);
	}, [documents]);

	const handleFileAttachment = async event => {
		const file = event.target.files[0];
		const documentId = event.target.name;

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);
			setDocuments({
				...documents,
				[documentId]: {
					...documents[documentId],
					url: fileURL,
				},
			});

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const onSubmit = () => {
		dispatch(setLoader(true));

		const reqData = [];

		Object.keys(documents)?.forEach(documentTypeId => {
			const { url } = documents[documentTypeId];

			if (url) {
				reqData.push({
					documentTypeId,
					url,
				});
			}
		});

		uploadAgentDocuments({ documents: reqData })
			.then(userDetails => {
				dispatch(setUser(userDetails));
				setTimeout(() => {
					history.push(RouteNames.tnc);
				}, 100);
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box
			bgcolor='rgba(243, 123, 33, 0.25)'
			minHeight='100vh'
			display='flex'
			alignItems={{ xs: "unset", sm: "center" }}
			justifyContent='center'>
			<Box
				bgcolor='#fff'
				p='1rem 1.25rem'
				borderRadius='0.625rem'
				flexGrow={{ xs: 1, sm: "unset" }}
				minWidth='60vw'
				display='flex'
				flexDirection='column'
				gap='1rem'>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Upload Documents
					</Typography>

					<img src={uniexperts_logo} alt='' />
				</Box>

				<TableContainer
					component={Paper}
					sx={{
						maxHeight: "60vh",
						overflow: "auto",
					}}>
					<Table stickyHeader sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{tableHead?.map(label => (
									<TableCell
										key={label}
										sx={{ color: "#fff", bgcolor: "inherit" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{Object.keys(documents)?.length ? (
								Object.keys(documents)?.map((documentId, index) => (
									<RenderRow
										key={documentId}
										documentId={documentId}
										index={index}
										handleFileAttachment={handleFileAttachment}
										{...documents[documentId]}
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

				<Typography fontSize='0.625rem' sx={{ opacity: "0.6" }}>
					*Maximum file size for a file is 10MB, and that the acceptable file
					formats for attachments are JPEG, JPG, PNG, and PDF.
				</Typography>

				<Box display='flex' justifyContent='center'>
					<Button
						variant='contained'
						size='small'
						disabled={!isBtnEnable}
						sx={{
							textTransform: "none",
							bgcolor: "#f37b21 !important",
							"&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" },
						}}
						onClick={onSubmit}>
						Next
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default UploadDocuments;
