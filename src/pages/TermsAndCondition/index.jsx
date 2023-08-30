import { Box, Button, Checkbox, Typography } from "@mui/material";
import { acceptTnC } from "apis/agent";
import { tnc } from "apis/auth";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setUser } from "store";

const TermsAndCondition = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [text, setText] = useState("");
	const [details, setDetails] = useState({});
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		tnc().then(response => setText(response));

		try {
			fetch("https://geolocation-db.com/json/", {
				method: "GET",
				mode: "cors",
				cache: "no-cache",
			}).then(res =>
				res.json().then(({ IPv4, latitude, longitude }) => {
					setDetails({
						ip: IPv4,
						lat: latitude,
						lng: longitude,
						time: new Date(),
					});
				})
			);
		} catch (err) {
			console.log("<<< error getting geoLocation >>>", err);
		}
	}, []);

	const submitTnC = () => {
		acceptTnC({
			...details,
			isAccepted: true,
		}).then(userDetails => {
			dispatch(setUser(userDetails));
			setTimeout(() => {
				history.push(RouteNames.dashboard);
			}, 100);
		});
	};

	return (
		<>
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
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Terms and Conditions and Privacy Policy
					</Typography>

					<Box>
						<Box
							bgcolor='#f5f5f5'
							p='1rem 1.25rem'
							borderRadius='0.625rem'
							maxWidth={{ xs: "unset", sm: "80vw" }}
							maxHeight='60vh'
							overflow='auto'>
							<Typography fontSize='0.825rem'>{text}</Typography>
						</Box>

						<Box display='flex' gap='0.125rem' alignItems='center'>
							<Checkbox
								size='small'
								value={isChecked}
								onChange={e => setIsChecked(e.target.checked)}
								sx={{
									color: "#f37b21 !important",
								}}
							/>

							<Typography fontSize='0.75rem'>
								I have read and agree to the{" "}
								<a
									href='https://www.uniexperts.io/terms-and-conditions/'
									target='_blank'
									rel='noreferrer'>
									Terms and Conditions
								</a>{" "}
								and{" "}
								<a
									href='https://www.uniexperts.io/privacy-policy/'
									target='_blank'
									rel='noreferrer'>
									Privacy Policy
								</a>
								.
							</Typography>
						</Box>
					</Box>

					<Typography fontSize='0.75rem'>{`This agreement has been signed on ${format(
						details?.time ?? new Date(),
						"PPPP"
					)} at IP: ${details?.ip}, Longitude: ${details?.lng}, Latitude: ${
						details?.lat
					}`}</Typography>

					<Box display='flex' justifyContent='center'>
						<Button
							variant='contained'
							size='small'
							type='button'
							disabled={!isChecked}
							sx={{
								textTransform: "none",
								bgcolor: "#f37b21 !important",
								"&:disabled": {
									bgcolor: "rgba(0, 0, 0, 0.12) !important",
								},
							}}
							onClick={submitTnC}>
							Submit
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default TermsAndCondition;
