import { Box, Typography } from "@mui/material";
import { tnc } from "apis/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const CommissionPolicy = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState("");

	useEffect(() => {
		dispatch(setLoader(true));

		tnc()
			.then(setData)
			.finally(() => dispatch(setLoader(false)));
	}, []);

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Typography fontSize='0.825rem' align='justify'>
				{data}
			</Typography>
		</Box>
	);
};

export default CommissionPolicy;
