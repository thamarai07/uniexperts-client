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
import style from "./style.module.scss"

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
				if (userDetails.docUploaded) {
					dispatch(setUser(userDetails));
					history.push(RouteNames.dashboard);
				} else {
					console.log("docupload false")
					history.push(RouteNames.register);
				}

			})
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<Box minHeight='100vh' display='flex' maxWidth={"90vw"} marginInline="auto">
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
			<div style={{ display: 'flex', width: '100%', justifyContent: "center", alignItems: "center" }}>
				<div className={style.banner} >
					<Box flex={1} >
						<SimpleImageSlider
							width={"32vw"}
							height={"90vh"}
							images={sliderImages}
							autoPlay={true}
							showBullets={true}
							style={{
								borderRadius: "15px",
								// marginTop: "60px",
								marginLeft: "10rem",
								marginBottom: "25px"
							}}
						/>
					</Box>
				</div>
				<Box
					// width={{ xs: "100%", md: "30dvw" }
					flex={1}
					display='flex'
					flexDirection='column'
					marginLeft={"-5%"}

				>
					<div
						className={style.formContainer}
					>
						<img
							src={logo}
							alt=''
							height='100%'
							className={style.logo}
						/>
						<Formik
							initialValues={initialValues}
							validationSchema={loginValidation}
							onSubmit={onSubmit}>
							<Form style={{ width: "86%" }}>
								<Box
									display='flex'
									width={{ xs: "100%", md: "80%" }}
									p='1rem 1rem'
									borderRadius={"10px"}
									bgcolor={"#fbfbfb"}
									m='0 auto'
									flexDirection='column'
									gap='1rem'>
									<p style={{ fontSize: "36px", fontWeight: "700" }}>Sign In</p>
									<p style={{ marginBottom: "20px", marginTop: "-18px", fontWeight: "400", fontSize: "16px", width: "100%" }}>
										Don’t have an account?{" "}
										<Button
											size='small'
											type='button'
											onClick={() => history.push(RouteNames.register)}
											sx={{
												textTransform: "none",
												color: "#f37b21 !important",
												fontSize: "16px",
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
					</div>

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
			</div >
		</Box >
	);
};

export default Login;