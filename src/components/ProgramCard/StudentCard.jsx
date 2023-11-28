import { Avatar, Box, Button, Typography } from "@mui/material";
import { addApplications } from "apis/application";
import { checkStudentEligibility } from "apis/program";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const StudentCard = ({ studentData, schoolId, selectedIntake, programId, studentId }) => {
	const {
		dp,
		salutation,
		firstName,
		lastName,
		email,
		mobile,
	} = studentData || {};

	const history = useHistory();
	const dispatch = useDispatch();

	const [isStudentEligible, setIsStudentEligible] = useState(null);

	const onStudentSelected = () => {
		dispatch(setLoader(true));

		const reqParams = {
			studentId,
			schoolId,
			programId,
			intakeId: selectedIntake?.id,
		};
		console.log("student id: ", studentId)
		checkStudentEligibility(reqParams)
			.then(setIsStudentEligible)
			.finally(dispatch(setLoader(false)));
	};

	const onApply = () => {
		dispatch(setLoader(true));

		const reqData = {
			studentId,
			schoolId,
			programId,
			intakeId: selectedIntake?.id,
		};

		addApplications(reqData)
			.then(({ id }) => {
				history.push(RouteNames.application?.replace(":id", id));
				toast.success("Application Created Successfully");
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box
			display='flex'
			flexDirection={{ xs: "column", sm: "row" }}
			alignItems={{ xs: "flex-start", sm: "center" }}
			justifyContent='space-between'
			borderRadius='0.5rem'
			border='1px solid black'
			p='0.75rem 1rem'
			gap='1rem'>
			<Box display='flex' alignItems='center' gap='1rem'>
				<Avatar src={dp} alt={firstName} />

				<Box>
					<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
						{`${salutation} ${firstName} ${lastName}`}
					</Typography>

					<Typography fontSize='0.825rem'>{`${email} | ${mobile}`}</Typography>
				</Box>
			</Box>

			{isStudentEligible === null ? (
				<Button
					variant='outlined'
					size='small'
					onClick={() => onStudentSelected()}
					sx={{
						color: "#f37b21 !important",
						borderColor: "#f37b21 !important",
						textTransform: "none",
					}}>
					Select
				</Button>
			) : null}

			{isStudentEligible === false ? (
				<Typography fontSize='0.825rem' fontWeight={500} sx={{ opacity: 0.6 }}>
					Not Eligible
				</Typography>
			) : null}

			{isStudentEligible === true ? (
				<Box display='flex' alignItems='center' gap='1rem'>
					<Typography fontSize='0.825rem' fontWeight={500} color='forestgreen'>
						Eligible
					</Typography>

					<Button
						variant='contained'
						size='small'
						onClick={onApply}
						sx={{
							bgcolor: "#f37b21 !important",
							textTransform: "none",
						}}>
						Apply
					</Button>
				</Box>
			) : null}
		</Box>
	);
};

export default StudentCard;
