import {
	Checkbox,
	Chip,
	FormControlLabel,
	Grid,
	Slider,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DropdownWithSearch from "components/DropdownWithSearch";
import { SubDisciplines } from "constants";
import { Disciplines } from "constants";
import { SchoolTypes } from "constants";
import { useEffect } from "react";

const ProgramFilters = ({ intakes = [], programFilters, handleOnChange }) => {
	useEffect(() => {
		handleOnChange({ key: "subDiscipline", value: [] });
	}, [programFilters?.discipline]);

	return (
		<Box bgcolor='#F5F5F5' p='0.75rem' borderRadius='0.25rem' height='100%'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				Program Filters
			</Typography>

			<Grid
				container
				spacing={1}
				mt={0}
				sx={{ "& .MuiGrid-item": { width: "100%" } }}>
				<Grid item xs={12}>
					<DropdownWithSearch
						multiple
						disableCloseOnSelect
						name='programLevels'
						value={programFilters?.programLevels}
						handleOnChange={handleOnChange}
						options={SchoolTypes}
						placeholder='Program Levels'
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip
									key={index}
									variant='filled'
									size='small'
									label={option}
									sx={{ fontSize: "0.75rem" }}
									{...getTagProps({ index })}
								/>
							))
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='intakeId'
						value={programFilters?.intakeId}
						handleOnChange={handleOnChange}
						options={intakes?.map(({ id }) => id)}
						placeholder='Intakes'
						renderOption={(props, intakeId) => {
							const selectedIntake = intakes?.filter(
								({ id }) => id === intakeId
							)[0];

							return (
								<li {...props}>
									<Typography fontSize='0.75rem'>{`${selectedIntake?.month} ${selectedIntake?.year}`}</Typography>
								</li>
							);
						}}
						getOptionLabel={intakeId => {
							const selectedIntake = intakes?.filter(
								({ id }) => id === intakeId
							)[0];

							return `${selectedIntake?.month} ${selectedIntake?.year}`;
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='discipline'
						value={programFilters?.discipline}
						handleOnChange={handleOnChange}
						options={Disciplines}
						placeholder='Discipline'
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						multiple
						disableCloseOnSelect
						disabled={!programFilters?.discipline}
						name='subDiscipline'
						value={programFilters?.subDiscipline}
						handleOnChange={handleOnChange}
						options={SubDisciplines?.[programFilters?.discipline] ?? []}
						placeholder='Sub Discipline'
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip
									key={index}
									variant='filled'
									size='small'
									label={option}
									sx={{ fontSize: "0.75rem" }}
									{...getTagProps({ index })}
								/>
							))
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography fontSize='0.75rem' align='justify'>
						All amounts are listed in the currency charged by the school. For
						best results, please specify a country of the school.
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						value={programFilters?.includeLivingCost}
						onChange={(_, value) =>
							handleOnChange({ key: "includeLivingCost", value })
						}
						control={
							<Checkbox size='small' sx={{ color: "#f37b21 !important" }} />
						}
						label={
							<Typography fontSize='0.75rem'>Include living costs</Typography>
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography fontSize='0.75rem'>Tution Fees</Typography>

					<Slider
						size='small'
						valueLabelDisplay='auto'
						value={programFilters?.tuitionFee}
						onChange={(_, value) =>
							handleOnChange({ key: "tuitionFee", value })
						}
						max={500000}
						marks={[
							{
								value: 0,
								label: "0k",
							},
							{
								value: 500000,
								label: "500k",
							},
						]}
						sx={{
							"& .MuiSlider-markLabel": {
								top: "1rem !important",
								fontSize: "0.75rem",
							},
							color: "#f37b21",
							p: "0 0 1rem !important",
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<Typography fontSize='0.75rem'>Application Fees</Typography>

					<Slider
						size='small'
						valueLabelDisplay='auto'
						value={programFilters?.applicationFee}
						onChange={(_, value) =>
							handleOnChange({ key: "applicationFee", value })
						}
						max={10000}
						marks={[
							{
								value: 0,
								label: "0k",
							},
							{
								value: 10000,
								label: "10k",
							},
						]}
						sx={{
							"& .MuiSlider-markLabel": {
								top: "1rem !important",
								fontSize: "0.75rem",
							},
							color: "#f37b21",
							p: "0 0 1rem !important",
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProgramFilters;
