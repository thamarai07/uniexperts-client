import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import S3 from './aws';
import { uploadAgentDocuments } from "apis/agent";
import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios';

const Step3 = ({ data = {}, setData, nextStep }) => {
	const [selectedFile, setSelectedFile] = useState({});
	const [files, setFiles] = useState({});
	const [filesUploading, setFilesUploading] = useState({});

	const handleFileChange = event => {
		const file = event.target.files[0];
		let fileArr = [];
		fileArr.push(file);
		console.log("file", fileArr);
		//setSelectedFile([...file]);

		//setSelectedFile(fileArr);
	};
	const handleSubmit = values => {
		const requiredKeys = [
			'personal_identification',
			'tax_registration_certificate',
			'bank_statement',
			'address_proof',
			'company_registration_certificate'
		];


		console.log("files: ", files);

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
					console.log("res", res);
					nextStep();
				})
				.catch(err => console.log("error", err))
				.finally(() => localStorage.clear());

		} else {
			alert("Please upload all the files");
		}



		// dispatch(setLoader(true));
		// signup({ ...data, password: values.password })
		// 	.then(userDetails => {
		// 		// console.log(data);
		// 		dispatch(setUser(userDetails));
		// 		// history.push(RouteNames.upload_documents);
		// 	})
		// 	.finally(() => dispatch(setLoader(false)));
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

	console.log("files: ", files)

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
		<div>

			<div style={{ display: "flex", marginTop: "20px" }} >
				<InputComponent value={files.personal_identification} />
				{filesUploading.personal_identification ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
					onClick={handleUpload}
					style={{
						marginLeft: "17px",
						borderRadius: "5px",
						padding: "6px",
						paddingRight: "32px",
						paddingLeft: "32px",
						color: "#f37b21",
						border: "0.5px solid #f37b21",
						backgroundColor: "#e5e5e5",
						alignSelf: "center"
					}}>
					{files.personal_identification ? "Uploaded" : "Upload"}
				</button>}
			</div>

			<div style={{ display: "flex", marginTop: "30px" }}>
				<InputComponent value={files.tax_registration_certificate} label="Tax Registration Certificate " />
				{filesUploading.tax_registration_certificate ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
					onClick={handleUpload}
					style={{
						marginLeft: "17px",
						borderRadius: "5px",
						padding: "6px",
						paddingRight: "32px",
						paddingLeft: "32px",
						color: "#f37b21",
						border: "0.5px solid #f37b21",
						backgroundColor: "#e5e5e5",
						alignSelf: "center"
					}}>
					{files.tax_registration_certificate ? "Uploaded" : "Upload"}
				</button>}
			</div>
			<div style={{ display: "flex", marginTop: "30px" }}>
				<InputComponent value={files.bank_statement} label="Bank Statement" />
				{filesUploading.bank_statement ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
					onClick={handleUpload}
					style={{
						marginLeft: "17px",
						borderRadius: "5px",
						padding: "6px",
						paddingRight: "32px",
						paddingLeft: "32px",
						color: "#f37b21",
						border: "0.5px solid #f37b21",
						backgroundColor: "#e5e5e5",
						alignSelf: "center"
					}}>
					{files.bank_statement ? "Uploaded" : "Upload"}
				</button>}
			</div>

			<div style={{ display: "flex", marginTop: "30px" }}>
				<InputComponent value={files.address_proof} label="Adreess Proof" />
				{filesUploading.address_proof ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
					onClick={handleUpload}
					style={{
						marginLeft: "17px",
						borderRadius: "5px",
						padding: "6px",
						paddingRight: "32px",
						paddingLeft: "32px",
						color: "#f37b21",
						border: "0.5px solid #f37b21",
						backgroundColor: "#e5e5e5",
						alignSelf: "center"
					}}>
					{files.address_proof ? "Uploaded" : "Upload"}
				</button>}
			</div>
			<div style={{ display: "flex", marginTop: "30px" }}>
				<InputComponent value={files.company_registration_certificate} label="Company registration Certificate" />
				{filesUploading.company_registration_certificate ? <CircularProgress sx={{ marginLeft: "32px" }} size={30} /> : <button
					onClick={handleUpload}
					style={{
						marginLeft: "17px",
						borderRadius: "5px",
						padding: "6px",
						paddingRight: "32px",
						paddingLeft: "32px",
						color: "#f37b21",
						border: "0.5px solid #f37b21",
						backgroundColor: "#e5e5e5",
						alignSelf: "center"
					}}>
					{files.company_registration_certificate ? "Uploaded" : "Upload"}
				</button>}
			</div>
			<Box display='flex' justifyContent='center' m='1rem 0'>
				<Button
					variant='contained'
					size='small'
					type='submit'
					onClick={handleSubmit}
					sx={{
						textTransform: "none",
						bgcolor: "#f37b21 !important",
					}}>
					Continue
				</Button>
			</Box>
		</div>
	);
};

export default Step3;


const InputComponent = ({ value, label = "Personal Identification" }) => {
	return (
		<div className="lg:flex items-center w-full">
			<div className="text-sm text-black font-bold w-[30%]">{label}</div>

			<div className="w-[100%] rounded border border-[#14213D99] flex justify-between px-4 py-1 items-center">
				<div
					id="FileUpload"
					className="relative w-full cursor-pointer appearance-none  py-4 px-4 "
				>
					<input value={value} type="file" placeholder="value" className={`absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none`} />
				</div>

				{value && <div >
					<img src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png" className="h-3 w-3 object-contain" alt="" />
				</div>}

			</div>

		</div>
	)
}