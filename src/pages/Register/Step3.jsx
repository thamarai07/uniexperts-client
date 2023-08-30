import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";


const Step3 = ({ data = {}, setData, nextStep }) => {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = event => {
		const file = event.target.files[0];

		setSelectedFile(file);
	};
	const handleSubmit = values => {
		console.log("button click");
		nextStep();
		// dispatch(setLoader(true));
		// signup({ ...data, password: values.password })
		// 	.then(userDetails => {
		// 		// console.log(data);
		// 		dispatch(setUser(userDetails));
		// 		// history.push(RouteNames.upload_documents);
		// 	})
		// 	.finally(() => dispatch(setLoader(false)));
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
		<div>
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
					type='file'
					onChange={handleFileChange}
					style={{
						border: "2px solid gray",
						height: "40px",
						borderRadius: "5px",
					}}
				/>
				<button
					onClick={handleUpload}
					style={{
						marginLeft: "32px",
						borderRadius: "32px",
						width: "100px",
						height: "40px",
						paddingTop: "2px",
						color: "#f37b21",
						border: "0.5px solid gray",
						backgroundColor: "#e5e5e5",
					}}>
					Upload
				</button>
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
					type='file'
					onChange={handleFileChange}
					style={{
						border: "2px solid gray",
						height: "40px",
						borderRadius: "5px",
					}}
				/>
				<button
					onClick={handleUpload}
					style={{
						marginLeft: "32px",
						borderRadius: "32px",
						width: "100px",
						height: "40px",
						paddingTop: "2px",
						color: "#f37b21",
						border: "0.5px solid gray",
						backgroundColor: "#e5e5e5",
					}}>
					Upload
				</button>
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
					onChange={handleFileChange}
					style={{
						border: "2px solid gray",
						height: "40px",
						borderRadius: "5px",
					}}
				/>
				<button
					onClick={handleUpload}
					style={{
						marginLeft: "32px",
						borderRadius: "32px",
						width: "100px",
						height: "40px",
						paddingTop: "2px",
						color: "#f37b21",
						border: "0.5px solid gray",
						backgroundColor: "#e5e5e5",
					}}>
					Upload
				</button>
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
					onChange={handleFileChange}
					style={{
						border: "2px solid gray",
						height: "40px",
						borderRadius: "5px",
					}}
				/>
				<button
					onClick={handleUpload}
					style={{
						marginLeft: "32px",
						borderRadius: "32px",
						width: "100px",
						height: "40px",
						paddingTop: "2px",
						color: "#f37b21",
						border: "0.5px solid gray",
						backgroundColor: "#e5e5e5",
					}}>
					Upload
				</button>
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
					onChange={handleFileChange}
					style={{
						border: "2px solid gray",
						height: "40px",
						borderRadius: "5px",
					}}
				/>
				<button
					onClick={handleUpload}
					style={{
						marginLeft: "32px",
						borderRadius: "32px",
						width: "100px",
						height: "40px",
						paddingTop: "2px",
						color: "#f37b21",
						border: "0.5px solid gray",
						backgroundColor: "#e5e5e5",
					}}>
					Upload
				</button>
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
