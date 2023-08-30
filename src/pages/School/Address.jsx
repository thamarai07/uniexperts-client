import { Box, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Address = ({
	addressLine1,
	addressLine2,
	city,
	state,
	country,
	pincode,
	lat,
	lng,
}) => {
	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Box display='flex' alignItems='center' gap='1rem'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					color='#f37b21'
					height='2.5rem'
					width='2.5rem'
					borderRadius='0.625rem'
					bgcolor='rgb(243 123 33 / 25%)'>
					<ApartmentIcon color='inherit' />
				</Box>

				<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
					{`${addressLine1}, ${addressLine2}, ${city}, ${state}, ${country}, (${pincode})`}
				</Typography>
			</Box>

			<Box mt='2rem'>
				<iframe
					src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es;&output=embed`}
					height='250px'
					width='100%'
				/>
			</Box>
		</Box>
	);
};

export default Address;
