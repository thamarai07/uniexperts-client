import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";
import { Box } from "@mui/system";
import { s3Upload } from "apis/app";
import { getStudentDocumentsList } from "apis/document";
import { getStudentDocuments, updateStudentDocument } from "apis/student";
import FileUploadCard from "components/FileUploadCard";
import { DocumentStatus } from "constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoader } from "store";

const RenderRow = ({
	documentId,
	index,
	handleFileAttachment,
	name,
	remark = "--",
	isMandatory,
	status,
	url,
}) => {
	const hiddenFileInput = useRef(null);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const onView = () => window.open(url, "_blank", "noopener,noreferrer");

	return (
		<TableRow key={documentId}>
			<TableCell>{index + 1}</TableCell>

			<TableCell>{name}</TableCell>

			<TableCell>{remark ? remark : "--"}</TableCell>

			<TableCell>{isMandatory ? "Yes" : "No"}</TableCell>

			<TableCell>{status}</TableCell>

			<TableCell>
				<IconButton disabled={!url} onClick={onView} sx={{ p: 0 }}>
					<VisibilityIcon />
				</IconButton>
			</TableCell>

			<TableCell>
				<Button
					variant='contained'
					size='small'
					startIcon={<UploadIcon />}
					disabled={
						!(
							status === DocumentStatus.PENDING ||
							status === DocumentStatus.REJECTED ||
							status === DocumentStatus.REQUESTED
						)
					}
					onClick={handleAttachClick}
					sx={{
						textTransform: "none",
						width: "100%",
						bgcolor: "#f37b21 !important",
						"&:disabled": {
							bgcolor: "rgb(0 0 0 / 12%) !important",
						},
					}}>
					{status === DocumentStatus.PENDING ? "Upload" : "Re-upload"}
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

const tableHead = [
	"",
	"Name",
	"Remark",
	"Is Mandatory",
	"Status",
	"View",
	"Action",
];

const Documents = ({ studentId, nextStep = () => { } }) => {
	const dispatch = useDispatch();

	const [documents, setDocuments] = useState({});
	const [isBtnEnable, setIsBtnEnable] = useState(false);

	useEffect(() => {
		_fetchDocumentList();
	}, []);

	useEffect(() => {
		if (!Object.keys(documents)?.length) return;

		let temp = true;
		Object.values(documents)?.map(({ isMandatory, url }) => {
			if (isMandatory && !url) temp = false;
		});

		setIsBtnEnable(temp);
	}, [documents]);

	const _fetchDocumentList = () => {
		dispatch(setLoader(true));

		getStudentDocumentsList()
			.then((res = []) => {
				const tempDocumentObj = {};
				res.forEach(document => {
					const { id, name, isMandatory } = document || {};

					tempDocumentObj[id] = {
						name,
						isMandatory,
						url: "",
						remark: "",
						status: DocumentStatus.PENDING,
					};
				});

				return tempDocumentObj;
			})
			.then(async tempDocumentObj => {
				const res = await getStudentDocuments(studentId);

				res?.forEach(({ url, remark, status, type: { id } }) => {
					tempDocumentObj[id].url = url;
					tempDocumentObj[id].remark = remark;
					tempDocumentObj[id].status = status;
				});

				setDocuments(tempDocumentObj);
			})
			.finally(dispatch(setLoader(false)));
	};

	const handleFileAttachment = async event => {
		const file = event.target.files[0];
		const documentId = event.target.name;

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			await updateStudentDocument({
				studentId,
				data: {
					documentTypeId: documentId,
					url: fileURL,
				},
			});

			setDocuments({
				...documents,
				[documentId]: {
					...documents[documentId],
					url: fileURL,
					status: DocumentStatus.UPLOADED,
				},
			});

			dispatch(setLoader(false));
			toast.success("Documents Uploaded Successfully");
		} catch (error) {
			dispatch(setLoader(false));
		}
	};
	const [personal, setPersonal] = useState(null)
	const [taxCertificate, setTaxCertificate] = useState(null)
	const [bankStatement, setBankStatement] = useState(null)
	const [addressProof, setAddressProof] = useState(null)
	const [companyCertificate, setCompanyCertificate] = useState(null)

	return (
		<>
			<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
				{/* <TableContainer component={Paper}>
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
				</TableContainer> */}

				<span
					style={{
						color: '#F37B21',
						fontSize: '16px',
						fontStyle: 'normal',
						fontWeight: 700,
						textTransform: 'uppercase',
						marginBlock: "40px",
						display: "block"
					}}
				>
					Documents
				</span>

				<FileUploadCard setSelectedFile={setPersonal} selectedFile={personal} label="Personal Identification" />
				<FileUploadCard setSelectedFile={setTaxCertificate} selectedFile={taxCertificate} label="Tax Registration Certificate " />
				<FileUploadCard setSelectedFile={setBankStatement} selectedFile={bankStatement} label="Bank Statement" />
				<FileUploadCard setSelectedFile={setAddressProof} selectedFile={addressProof} label="Address Proof" />
				<FileUploadCard setSelectedFile={setCompanyCertificate} selectedFile={companyCertificate} label="Company registration Certificate" />

			</Box>

			<Box display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					size='small'
					disabled={!isBtnEnable}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						"&:disabled": { bgcolor: "rgba(0, 0, 0, 0.12) !important" },
					}}
					onClick={nextStep}>
					Next
				</Button>
			</Box>
		</>
	);
};

export default Documents;
