import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadAgentDocuments } from "apis/agent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import S3 from "./aws";

const Step3 = ({ data = {}, setData, nextStep }) => {
	const [selectedFile, setSelectedFile] = useState({});
	const [files, setFiles] = useState({});
	const [filesUploading, setFilesUploading] = useState({});
	const [isEnteredFileName, setisEnteredFileName] = useState(false);
	const [FileName, setFileName] = useState();
	const [FileSize, setFileSize] = useState()
	const dispatch = useDispatch();

	const handleFileChange = event => {
		const file = event.target.files[0];
		let fileArr = [];
		fileArr.push(file);
		//setSelectedFile([...file]);

		//setSelectedFile(fileArr);
	};
	const handleSubmit = values => {
		//dispatch(setLoader(true));
		const requiredKeys = [
			"personal_identification",
			"tax_registration_certificate",
			"bank_statement",
			"address_proof",
			"company_registration_certificate",
		];

		if (requiredKeys.every(key => !!files[`${key}`])) {
			const data = {
				documents: [
					{
						url: files["personal_identification"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["tax_registration_certificate"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["bank_statement"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["address_proof"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["company_registration_certificate"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
				],
			};

			uploadAgentDocuments(data).then(res => {
				nextStep();
			});
		} else {
			alert("Please upload all the files");
		}
	};

	const handleFileUpload = async event => {
		const file = event.target.files[0];
		const fileName = file.name;
		const Name = event.target.files[0].name
		const size = event.target.files[0].size



		setFileSize((size / 1024).toFixed(2)); // toFixed(2) ensures two decimal places

		setFileName({ ...FileName, [event.target.name]: Name })

		setFilesUploading({ ...filesUploading, [event.target.name]: true });

		const params = {
			Bucket: "uniexpert",
			Key: fileName, // Name of the file in your S3 bucket
			Body: file,
		};

		try {
			const uploadedFile = await S3.upload(params).promise();
			setFiles({ ...files, [event.target.name]: uploadedFile.Location });
			setFilesUploading({ ...filesUploading, [event.target.name]: false });
		} catch (error) {
			console.error("Error uploading file:", error);
			setFilesUploading({ ...filesUploading, [event.target.name]: false });
		}
	};

	const handleUpload = () => {
		// You can perform the file upload here using APIs, like Axios or Fetch.
		// For simplicity, let's just log the selected file's information.
		if (selectedFile) {
			console.log("File selected:", selectedFile);
		} else {
			console.log("No file selected.");
		}
	};

	const handlefileEndtered = () => {
		setisEnteredFileName(true)
	}
	const handlefileLeave = () => {
		setisEnteredFileName(false)
	}
	console.log(FileSize)
	return (
		<Box
			borderRadius='0.625rem'
			marginTop={"60px"}
			paddingBottom={"60px"}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "30px",
				width: "100%",
			}}>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Personal
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload or personal identification document
				</Typography>

				<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
					<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
						<Box>
							<Typography fontSize='14px' style={{
								cursor: "pointer"
							}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
								Drop files here to upload, or click <span style={{
									textDecoration: isEnteredFileName == true ? "underline" : "",
									textUnderlineOffset: "3px"
								}}>Upload</span>
							</Typography>

							<Typography fontSize='10px' style={{
								cursor: "pointer",
								opacity: "1",
							}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
							<input
								name='personal_identification'
								type='file'
								onChange={handleFileUpload}
								style={{
									opacity: "0",
									width: "285px",
									position: "absolute",
									top: 0,
									background: "red"
								}}
								onMouseEnter={handlefileEndtered}
								onMouseLeave={handlefileLeave}
							/>
						</Box>
						<Box>
							<img src="/file.svg"></img>
						</Box>
					</Box>
				</Box>

				{filesUploading.personal_identification ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<>
						{/* <Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.personal_identification ? "Uploaded" : "Upload"}
					</Button> */}
						{FileName &&
							<>
								<Box display={"flex"} alignContent={"center"} alignItems={"center"}>
									<Box style={{
										background: "#EDF5FF"
									}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
										<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
											<Box display={"flex"} alignItems={"center"} gap={1}>
												<img src="/updatedfile.svg" width={"35px"}></img>
												<Typography fontSize={15}>{FileName.personal_identification}</Typography>
											</Box>
											<Typography fontSize={11} fontWeight={600} marginRight={1}
												color={"#d3d3d3"}
											>{FileSize}kb</Typography>
										</Box>
									</Box>
									<Box width={"10%"}>
										<img src="/delete.svg" width={"45dpx"} style={{
											marginTop: "20px"
										}}></img>
									</Box>
								</Box>
							</>
						}
					</>
				)}
			</Box>

			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Tax Registration Certificate
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your Tax Registration Certificate
				</Typography>
				<input
					name='tax_registration_certificate'
					type='file'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.tax_registration_certificate ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.tax_registration_certificate ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Bank Statement
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your bank statememt
				</Typography>
				<input
					type='file'
					name='bank_statement'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.bank_statement ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.bank_statement ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>

			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Address Proof
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your address proof
				</Typography>
				<input
					type='file'
					onChange={handleFileUpload}
					name='address_proof'
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.address_proof ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.address_proof ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Company registration Certificate
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload Company registration Certificate
				</Typography>
				<input
					type='file'
					name='company_registration_certificate'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.company_registration_certificate ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.company_registration_certificate ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>

			<Box display='flex' justifyContent='end'>
				<Button
					variant='contained'
					size='small'
					onClick={() => handleSubmit()}
					type='submit'
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						padding: "14px 24px",
						color: "white",
					}}>
					Save & Continue
				</Button>
			</Box>
		</Box >
	);
};

export default Step3;
