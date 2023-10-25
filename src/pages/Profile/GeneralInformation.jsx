import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { s3Upload } from "apis/app";
import { getProfileData } from "apis/auth";
import { generalStaffDetail, updateStaff, updateUserDP } from "apis/staff";
import CustomSwitch from "components/CustomSwitch";
import CustomTextField from "components/CustomTextField";
import { ModuleList } from "constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader, setUser } from "store";
import ChangePassword from "./ChangePassword";

const GeneralInformation = ({ staffId }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [modules, setModules] = useState([]);

	const dispatch = useDispatch();

	const [data, setData] = useState({});

	const hiddenFileInput = useRef(null);

	useEffect(() => {
		dispatch(setLoader(true));

		generalStaffDetail()
			.then(response => {
				setData(response);
				setModules(response?.modules);
			})
			.finally(() => dispatch(setLoader(false)));
	}, []);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			await updateUserDP(fileURL);

			generalStaffDetail().then(setData);

			await getProfileData().then(userDetails =>
				dispatch(setUser(userDetails))
			);

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const onClick = () => {
		if (!isEditable) {
			setIsEditable(true);
			return;
		}

		dispatch(setLoader(true));

		updateStaff({ staffId, data: { modules } })
			.then(() => {
				setIsEditable(false);
				getProfileData().then(userDetails => dispatch(setUser(userDetails)));
			})
			.finally(() => dispatch(setLoader(false)));
	};

	const handleOnChange = ({ key, value }) => {
		if (value) {
			setModules([...modules, key]);
			return;
		}

		setModules(modules?.filter(mod => mod !== key));
	};

	const { dp, fullName, email, phone, role } = data || {};

	return (
		<>
			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				sx={{
					display: "flex",
					gap: "2rem",
					flexDirection: {
						xs: "column",
						sm: "row",
					},
					alignItems: "center",
				}}>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					gap='1rem'>
					<Avatar src={dp} alt='' sx={{ height: "8rem", width: "8rem" }} />

					<Button
						variant='text'
						size='small'
						onClick={handleAttachClick}
						sx={{ textTransform: "none", color: "#f37b21 !important" }}>
						Change Profile Picture
					</Button>

					<input
						type='file'
						accept='image/*'
						ref={hiddenFileInput}
						onChange={handleFileAttachment}
						style={{ display: "none" }}
					/>
				</Box>

				<Grid
					container
					spacing={1}
					sx={{
						maxWidth: {
							xs: "auto",
							sm: "60vw",
						},
					}}>
					<Grid item xs={12} sm={6}>
						<CustomTextField disabled placeholder='Name' value={fullName} />
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField disabled placeholder='Mobile' value={phone} />
					</Grid>

					<Grid item xs={12} sm={6}>
						<CustomTextField disabled placeholder='Email' value={email} />
					</Grid>

					<Grid item xs={12} sm={6}>
						<Button
							variant='outlined'
							size='small'
							sx={{
								color: "#F37B21 !important",
								borderColor: "#F37B21 !important",
								textTransform: "none",
							}}
							onClick={() => setModalOpen(true)}>
							Change Password
						</Button>
					</Grid>
				</Grid>
			</Box>

			{/* {role === "admin" ? (
				<>
					<Box
						bgcolor='#fff'
						borderRadius='0.625rem'
						p='1rem 1.25rem'
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						gap='1rem'>
						<Typography fontSize='1.2rem' fontWeight={700} color='#F37B21'>
							Access
						</Typography>

						<Button
							variant='contained'
							size='small'
							onClick={onClick}
							sx={{ bgcolor: "#F37B21 !important", textTransform: "none" }}>
							{isEditable ? "Save" : "Edit"}
						</Button>
					</Box>

					<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
						<Grid container spacing={2}>
							{ModuleList?.map(({ name, label }) => {
								const checked = modules?.includes(name);

								return (
									<Grid key={name} item xs={12} sm={6}>
										<CustomSwitch
											name={name}
											checked={checked}
											disabled={!isEditable}
											handleOnChange={handleOnChange}
											label={label}
											labelSx={{
												width: {
													xs: "100%",
													sm: "15rem",
												},
											}}
										/>
									</Grid>
								);
							})}
						</Grid>
					</Box>
				</>
			) : null} */}

			{isModalOpen ? (
				<ChangePassword isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
			) : null}
		</>
	);
};

export default GeneralInformation;
