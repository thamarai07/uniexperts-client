import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getBackgroundImage, login } from "apis/auth";
import FieldInput from "components/FieldInput";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader, setUser } from "store";
import { loginValidation } from "utils/validations";
import logo from "assets/uniexperts_logo.svg";
import SimpleImageSlider from "react-simple-image-slider";

const initialValues = { email: "", password: "" };

const Login = () => {
	const sliderImages = [
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel1.de0b6ecfc910929bf5a34fe02b1d749f.svg",
		},
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel2.18b87b0501d089b69db16de9df701745.svg",
		},
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel2.18b87b0501d089b69db16de9df701745.svg",
		},
	];
	const history = useHistory();
	const dispatch = useDispatch();

	const [bgImage, setBgImage] = useState({});

	// @gets background image
	// useEffect(() => {
	// 	dispatch(setLoader(true));
	// 	getBackgroundImage()
	// 		.then(setBgImage)
	// 		.finally(() => dispatch(setLoader(false)));
	// }, []);

	const onSubmit = values => {
		dispatch(setLoader(true));
		login(values)
			.then(userDetails => {
				localStorage.setItem("docUploaded", userDetails.docUploaded);
				console.log("user details: " + userDetails.docUploaded)
				if(userDetails.docUploaded){
					dispatch(setUser(userDetails));
					history.push(RouteNames.dashboard);
				}else{
					console.log("docupload false")
					history.push(RouteNames.register);
				}
				
			})
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<Box minHeight='100vh' display='flex'>
			{/* <Box
				display={{ xs: "none", md: "block" }}
				flexGrow={1}
				sx={{
					backgroundImage: `url(${bgImage?.sideImage})`,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			/> */}
			<div style={{ display: 'flex', width: '100%' }}>
				<Box style={{ flex: 1 }}>
					<div>
						<SimpleImageSlider
							width={450}
							height={700}
							images={sliderImages}
							autoPlay={true}
							showBullets={true}
							style={{
								borderRadius: "15px",
								marginTop: "60px",
								marginLeft: "10rem",
								marginBottom: "25px"
							}}
						/>
					</div>
				</Box>
				<Box
					width={{ xs: "100%", md: "30dvw" }}
					display='flex'
					flexDirection='column'
					style={{ flex: 1 }}>
					<Box
						flexGrow={3}
						display='flex'
						flexDirection='column'
						// alignItems='center'
						justifyContent='center'
						gap='1rem'>
						<img
							src={logo}
							alt=''
							height='100%'
							style={{ maxHeight: "3rem", width: "150px", marginLeft: "5rem" }}
						/>
						<Formik
							initialValues={initialValues}
							validationSchema={loginValidation}
							onSubmit={onSubmit}>
							<Form style={{ width: "100%" }}>
								<Box
									display='flex'
									width={{ xs: "100%", md: "80%" }}
									p='1rem 1.25rem 1rem 0'
									m='0 auto'
									flexDirection='column'
									gap='1rem'>
									<h1>Sign In</h1>
									<p style={{ marginBottom: "20px" }}>
										Don’t have an account?{" "}
										<Button
											size='small'
											type='button'
											onClick={() => history.push(RouteNames.register)}
											sx={{
												textTransform: "none",
												color: "#f37b21 !important",
												fontSize: "17px",
											}}>
											Register Now
										</Button>
									</p>
									<FieldInput name='email' type='email' label='Email' />

									<FieldInput name='password' type='password' label='Password' />

									<Box display='flex' justifyContent='flex-end'>
										<Link to={RouteNames.forgot}>
											<Typography
												fontSize='0.825rem'
												color='#f37b21'
												fontWeight={500}>
												Forgot Password?
											</Typography>
										</Link>
									</Box>

									<Box display='flex' flexDirection='column' gap='1rem'>
										<Button
											variant='contained'
											size='small'
											type='submit'
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												width: "140px",
												height: "40px",
												borderRadius: "32px",
											}}>
											Login
										</Button>

										{/* <Button
										variant='outlined'
										size='small'
										type='button'
										onClick={() => history.push(RouteNames.register)}
										sx={{
											textTransform: "none",
											color: "#f37b21 !important",
											borderColor: "#f37b21 !important",
										}}>
										Register
									</Button> */}
									</Box>
								</Box>
							</Form>
						</Formik>
					</Box>

					<Box
						flexGrow={1}
						sx={{
							backgroundImage: `url(${bgImage?.bottomImage})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					/>
				</Box>
			</div>
		</Box>
	);
};

export default Login;
