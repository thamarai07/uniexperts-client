import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import S3 from './aws';
import { uploadAgentDocuments } from "apis/agent";
import CircularProgress from '@mui/material/CircularProgress';
import { setLoader } from "store";
import { useDispatch } from "react-redux";

const Step3 = ({ data = {}, setData, nextStep }) => {
	const [selectedFile, setSelectedFile] = useState({});
	const [files, setFiles] = useState({});
	const [filesUploading, setFilesUploading] = useState({});

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
			'personal_identification',
			'tax_registration_certificate',
			'bank_statement',
			'address_proof',
			'company_registration_certificate'
		];

		if (requiredKeys.every(key => files.hasOwnProperty(key))) {
			const data = {
				"documents": [
					{
						"url": files['personal_identification'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['tax_registration_certificate'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['bank_statement'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['address_proof'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['company_registration_certificate'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
				]
			}

			uploadAgentDocuments(data)
				.then(res => {
					nextStep();
				})

		} else {
			alert("Please upload all the files");
		}
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		const fileName = file.name;
		setFilesUploading({ ...filesUploading, [event.target.name]: true })

		const params = {
			Bucket: 'uniexpert',
			Key: fileName, // Name of the file in your S3 bucket
			Body: file,
		};

		try {
			const uploadedFile = await S3.upload(params).promise();
			setFiles({ ...files, [event.target.name]: uploadedFile.Location })
			setFilesUploading({ ...filesUploading, [event.target.name]: false })
		} catch (error) {
			console.error('Error uploading file:', error);
			setFilesUploading({ ...filesUploading, [event.target.name]: false })
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

	return (
		<>
			<Box bgcolor='#FBFBFB' p='1rem 1.25rem' borderRadius='0.625rem' marginTop={"2.5rem"}>
				<div style={{ display: "flex" }}>
					<label
						htmlFor=''
						style={{
							marginRight: "100px",
							fontSize: "13px",
							marginTop: "9px",
						}}>
						Personal Identification
					</label>
					<input
						name="personal_identification"
						type='file'
						onChange={handleFileUpload}
						style={{
							border: "2px solid gray",
							height: "36px",
							borderRadius: "5px",
						}}
					/>
					{filesUploading.personal_identification ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
						onClick={handleUpload}
						style={{
							marginLeft: "32px",
							borderRadius: "32px",
							width: "100px",
							height: "36px",
							paddingTop: "2px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
						}}>
						{files.personal_identification ? "Uploaded" : "Upload"}
					</button>}
				</div>

				<div style={{ display: "flex", marginTop: "30px" }}>
					<label
						htmlFor=''
						style={{
							marginRight: "73px",
							fontSize: "13px",
							marginTop: "9px",
						}}>
						Tax Registration Certificate
					</label>
					<input
						name="tax_registration_certificate"
						type='file'
						onChange={handleFileUpload}
						style={{
							border: "2px solid gray",
							height: "36px",
							borderRadius: "5px",
						}}
					/>
					{filesUploading.tax_registration_certificate ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
						onClick={handleUpload}
						style={{
							marginLeft: "32px",
							borderRadius: "32px",
							width: "100px",
							height: "36px",
							paddingTop: "2px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
						}}>
						{files.tax_registration_certificate ? "Uploaded" : "Upload"}
					</button>}
				</div>
				<div style={{ display: "flex", marginTop: "30px" }}>
					<label
						htmlFor=''
						style={{
							marginRight: "135px",
							fontSize: "13px",
							marginTop: "9px",
						}}>
						Bank Statement
					</label>
					<input
						type='file'
						name="bank_statement"
						onChange={handleFileUpload}
						style={{
							border: "2px solid gray",
							height: "36px",
							borderRadius: "5px",
						}}
					/>
					{filesUploading.bank_statement ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
						onClick={handleUpload}
						style={{
							marginLeft: "32px",
							borderRadius: "32px",
							width: "100px",
							height: "36px",
							paddingTop: "2px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
						}}>
						{files.bank_statement ? "Uploaded" : "Upload"}
					</button>}
				</div>

				<div style={{ display: "flex", marginTop: "30px" }}>
					<label
						htmlFor=''
						style={{
							marginRight: "143px",
							fontSize: "13px",
							marginTop: "9px",
						}}>
						Address Proof
					</label>
					<input
						type='file'
						onChange={handleFileUpload}
						name="address_proof"
						style={{
							border: "2px solid gray",
							height: "36px",
							borderRadius: "5px",
						}}
					/>
					{filesUploading.address_proof ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
						onClick={handleUpload}
						style={{
							marginLeft: "32px",
							borderRadius: "32px",
							width: "100px",
							height: "36px",
							paddingTop: "2px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
						}}>
						{files.address_proof ? "Uploaded" : "Upload"}
					</button>}
				</div>
				<div style={{ display: "flex", marginTop: "30px" }}>
					<label
						htmlFor=''
						style={{
							marginRight: "38px",
							fontSize: "13px",
							marginTop: "9px",
						}}>
						Company registration Certificate

					</label>
					<input
						type='file'
						name="company_registration_certificate"
						onChange={handleFileUpload}
						style={{
							border: "2px solid gray",
							height: "36px",
							borderRadius: "5px",
						}}
					/>
					{filesUploading.company_registration_certificate ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
						onClick={handleUpload}
						style={{
							marginLeft: "32px",
							borderRadius: "32px",
							width: "100px",
							height: "36px",
							paddingTop: "2px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
						}}>
						{files.company_registration_certificate ? "Uploaded" : "Upload"}
					</button>}
				</div>
			</Box>

			<Box display='flex' justifyContent='center' m='1rem 0' mt="3rem">

				<Button
					variant='contained'
					size='small'
					onClick={() => handleSubmit()}
					type='submit'
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
						borderRadius: "32px",
						width: "140px",
						height: "40px",
						color: "white"
					}}>
					Continue
				</Button>

			</Box>
		</>
	);
};

export default Step3;
