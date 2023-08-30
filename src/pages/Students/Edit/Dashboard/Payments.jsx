import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStudentPayments } from "apis/student";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const Card = ({ paymentName, date, amount, currency: { sign, symbol } }) => (
	<Box
		display='flex'
		gap='0.5rem'
		alignItems='flex-start'
		justifyContent='space-between'
		p='0.25rem 0.5rem'
		borderRadius='0.25rem'
		boxShadow='0px 0px 3px 1px rgb(243 123 33 / 40%)'>
		<Box display='grid'>
			<Typography fontSize='0.825rem' fontWeight={500} noWrap>
				{paymentName}
			</Typography>

			<Typography fontSize='0.75rem'>
				{format(new Date(date), "PPp")}
			</Typography>
		</Box>

		<Typography fontSize='0.825rem' fontWeight={500} color='#a9d3ab'>
			{`${sign}${amount} ${symbol}`}
		</Typography>
	</Box>
);

const Payments = ({ studentId }) => {
	const [paymentList, setPaymentList] = useState([]);

	useEffect(() => {
		getStudentPayments(studentId).then(setPaymentList);
	}, []);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap='1rem'
			bgcolor='#fff'
			borderRadius='0.625rem'
			p='1rem'
			height='25rem'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				Payments
			</Typography>

			<Box
				display='flex'
				p='0.5rem'
				m='-0.5rem'
				gap='0.75rem'
				flexDirection='column'
				height='100%'
				overflow='auto'>
				{paymentList?.length ? (
					paymentList?.map(payment => <Card key={payment?.id} {...payment} />)
				) : (
					<Box display='grid' flexGrow={1} sx={{ placeItems: "center" }}>
						<Typography>No Data !</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Payments;
