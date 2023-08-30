import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
	getAgentBankingInformation,
	setAgentBankingInformation,
} from "apis/agent";
import FieldInput from "components/FieldInput";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const BankingInformation = () => {
	const dispatch = useDispatch();

	const [isEditing, setIsEditing] = useState(false);
	const [data, setData] = useState({});

	const formRef = useRef();

	useEffect(() => {
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		getAgentBankingInformation()
			.then(setData)
			.finally(() => dispatch(setLoader(false)));
	};

	const handleSubmit = values => {
		dispatch(setLoader(true));

		setAgentBankingInformation(values)
			.then(() => {
				setIsEditing(false);
				_fetchData();
			})
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				mb='1rem'>
				<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
					Banking Information
				</Typography>

				{!isEditing ? (
					<Button
						variant='contained'
						size='small'
						type='button'
						sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}
						onClick={() => setIsEditing(true)}>
						Edit
					</Button>
				) : (
					<Button
						variant='contained'
						size='small'
						type='submit'
						sx={{ bgcolor: "#f37b21 !important" }}
						onClick={() => handleSubmit(formRef.current.values)}
						startIcon={<SaveIcon />}>
						Submit
					</Button>
				)}
			</Box>

			<Formik
				enableReinitialize
				initialValues={data}
				onSubmit={handleSubmit}
				innerRef={formRef}>
				<Form>
					<Grid container spacing={1} mt={0}>
						<Grid item xs={12} sm={6}>
							<FieldInput
								name='accountNumber'
								label='Account Number'
								disabled={!isEditing}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<FieldInput
								name='bankName'
								label='Bank Name'
								disabled={!isEditing}
							/>
						</Grid>

						{Object.keys(data?.extraField ?? {})?.length ? (
							<Grid item xs={12} sm={6}>
								<FieldInput
									name='extraField.data'
									label={data?.extraField?.value}
									disabled={!isEditing}
								/>
							</Grid>
						) : null}

						<Grid item xs={12} sm={6}>
							<FieldInput name='name' label='Name' disabled={!isEditing} />
						</Grid>

						<Grid item xs={12} sm={6}>
							<FieldInput
								name='swiftCode'
								label='Swift Code'
								disabled={!isEditing}
							/>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Box>
	);
};
export default BankingInformation;
