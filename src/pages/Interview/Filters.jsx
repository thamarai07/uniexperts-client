import { Box, Button, Grid, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import CustomTextField from "components/CustomTextField";
import DropdownWithSearch from "components/DropdownWithSearch";

const Filters = ({
	filters,
	setFilters,
	interviewTypeList,
	interviewTimeList,
	_fetchData,
	showFilters,
}) => {
	const handleOnChange = ({ key, value }) => {
		setFilters({
			...filters,
			[key]: value,
		});
	};

	const applyFilters = () => {
		_fetchData();
	};

	return (
		<Box mt='0.5rem'>
			<Grid
				container
				spacing={2}
				mt={0}
				display={showFilters ? "flex" : "none"}>
				<Grid item sm={4} xs={12}>
					<DateRangePicker
						inputFormat='dd/MM/yyyy'
						calendars={2}
						value={filters?.dateRange}
						onChange={value => handleOnChange({ key: "dateRange", value })}
						renderInput={(startProps, endProps) => (
							<>
								<CustomTextField
									disabled={startProps?.disabled}
									placeholder={startProps?.label}
									inputProps={{
										...startProps.inputProps,
									}}
								/>

								<Box sx={{ mx: 2 }}>
									<Typography fontSize='0.825rem'>to</Typography>{" "}
								</Box>

								<CustomTextField
									disabled={endProps?.disabled}
									placeholder={endProps?.label}
									inputProps={{
										...endProps.inputProps,
									}}
								/>
							</>
						)}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<DropdownWithSearch
						name='time'
						value={filters?.time}
						handleOnChange={handleOnChange}
						placeholder='Select Time'
						options={interviewTimeList?.map(({ value }) => value)}
						renderOption={(props, option) => {
							const selectedOption = interviewTimeList?.filter(
								({ value }) => value === option
							)[0];

							return (
								<li {...props}>
									<Typography fontSize='0.75rem'>
										{selectedOption?.label}
									</Typography>
								</li>
							);
						}}
						getOptionLabel={option => {
							const selectedOption = interviewTimeList?.filter(
								({ value }) => value === option
							)[0];

							return selectedOption?.label;
						}}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<DropdownWithSearch
						name='type'
						value={filters?.type}
						handleOnChange={handleOnChange}
						placeholder='Select Type'
						options={interviewTypeList?.map(({ value }) => value)}
						renderOption={(props, option) => {
							const selectedOption = interviewTypeList?.filter(
								({ value }) => value === option
							)[0];

							return (
								<li {...props}>
									<Typography fontSize='0.75rem'>
										{selectedOption?.label}
									</Typography>
								</li>
							);
						}}
						getOptionLabel={option => {
							const selectedOption = interviewTypeList?.filter(
								({ value }) => value === option
							)[0];

							return selectedOption?.label;
						}}
					/>
				</Grid>

				<Grid item sm={2} xs={12}>
					<Button
						variant='contained'
						onClick={applyFilters}
						size='small'
						sx={{
							bgcolor: "#f37b21",
							textTransform: "none",
							"&:hover": {
								bgcolor: "#f37b21",
							},
						}}>
						Apply Filters
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Filters;
