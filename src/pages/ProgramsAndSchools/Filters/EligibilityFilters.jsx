import { Box, Grid, Typography } from "@mui/material";
import { getStudentGeneralInformation } from "apis/student";
import { getExamFields } from "apis/testScore";
import CustomTextField from "components/CustomTextField";
import DropdownWithSearch from "components/DropdownWithSearch";
import { SchoolTypes, VisaOptions } from "constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EligibilityFilters = ({
	students = [],
	examTypes = [],
	eligibilityFilter,
	examTypeFieldsValue = {},
	setExamTypeFieldsValue = () => {},
	setFilters,
	handleOnChange,
}) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);

	const [examTypeFields, setExamTypeFields] = useState([]);

	useEffect(() => {
		const { studentId } = eligibilityFilter || {};

		if (!studentId) {
			setFilters(filters => ({
				...filters,
				eligibilityFilter: {
					...eligibilityFilter,
					hasValidVisa: null,
					nationality: null,
				},
			}));
			return;
		}

		getStudentGeneralInformation(studentId).then(
			({
				demographicInformation: { country },
				backgroundInformation: { haveStudyPermit },
			}) => {
				setFilters(filters => ({
					...filters,
					eligibilityFilter: {
						...eligibilityFilter,
						hasValidVisa: haveStudyPermit,
						nationality: country,
					},
				}));
			}
		);
	}, [eligibilityFilter?.studentId]);

	useEffect(() => {
		setExamTypeFields([]);
		setExamTypeFieldsValue({});

		getExamFields(eligibilityFilter?.englishExamType).then(setExamTypeFields);
	}, [eligibilityFilter?.englishExamType]);

	const onExamTypeFieldChange = ({ key, value }) => {
		setExamTypeFieldsValue({
			...examTypeFieldsValue,
			[key]: value,
		});
	};

	return (
		<Box bgcolor='#F5F5F5' p='0.75rem' borderRadius='0.25rem' height='100%'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				Eligibility
			</Typography>

			<Grid
				container
				spacing={1}
				mt={0}
				sx={{ "& .MuiGrid-item": { width: "100%" } }}>
				<Grid item xs={12}>
					<DropdownWithSearch
						name='studentId'
						value={eligibilityFilter?.studentId}
						handleOnChange={handleOnChange}
						options={students?.map(({ id }) => id)}
						placeholder='Select Student'
						renderOption={(props, studentId) => {
							const selectedStudent = students?.filter(
								({ id }) => id === studentId
							)[0];

							return (
								<li {...props}>
									<Typography fontSize='0.75rem'>{`${selectedStudent?.salutation} ${selectedStudent?.firstName} ${selectedStudent?.lastName}`}</Typography>
								</li>
							);
						}}
						getOptionLabel={studentId => {
							const selectedStudent = students?.filter(
								({ id }) => id === studentId
							)[0];

							return `${selectedStudent?.salutation} ${selectedStudent?.firstName} ${selectedStudent?.lastName}`;
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					{eligibilityFilter?.studentId ? (
						<CustomTextField
							disabled
							placeholder='Study Permit/ VISA Details'
							value={eligibilityFilter?.hasValidVisa}
						/>
					) : (
						<DropdownWithSearch
							name='hasValidVisa'
							value={eligibilityFilter?.hasValidVisa}
							handleOnChange={handleOnChange}
							options={VisaOptions}
							placeholder='Study Permit/ VISA Details'
						/>
					)}
				</Grid>

				<Grid item xs={12}>
					{eligibilityFilter?.studentId ? (
						<CustomTextField
							disabled
							placeholder='Nationality'
							value={eligibilityFilter?.nationality}
						/>
					) : (
						<DropdownWithSearch
							name='nationality'
							value={eligibilityFilter?.nationality}
							handleOnChange={handleOnChange}
							options={countries?.map(({ name }) => name)}
							placeholder='Nationality'
						/>
					)}
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='educationCountry'
						value={eligibilityFilter?.educationCountry}
						handleOnChange={handleOnChange}
						options={countries?.map(({ name }) => name)}
						placeholder='Education Country'
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='educationLevel'
						value={eligibilityFilter?.educationLevel}
						options={SchoolTypes}
						handleOnChange={handleOnChange}
						placeholder='Education Level'
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='gradingScheme'
						value={eligibilityFilter?.gradingScheme}
						handleOnChange={handleOnChange}
						placeholder='Grading Scheme'
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='englishExamType'
						value={eligibilityFilter?.englishExamType}
						options={examTypes}
						handleOnChange={handleOnChange}
						placeholder='English Exam Type'
					/>
				</Grid>
				{examTypeFields?.map((field, index) => (
					<Grid key={index} item xs={6}>
						<CustomTextField
							value={examTypeFieldsValue[field]}
							placeholder={field}
							handleOnChange={({ value }) =>
								onExamTypeFieldChange({ key: [field], value })
							}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default EligibilityFilters;
