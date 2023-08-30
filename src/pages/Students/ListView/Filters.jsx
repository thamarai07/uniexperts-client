import { Box, Button, Grid, Typography } from "@mui/material";
import CustomTextField from "components/CustomTextField";
import DropdownWithSearch from "components/DropdownWithSearch";

const Filters = ({
	filters,
	setFilters,
	daysList,
	sortByList,
	sortByTypeList,
	_fetchData = () => {},
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
			<Grid container spacing={2} mt='0.5rem' display='flex'>
				<Grid item sm={3} xs={12}>
					<CustomTextField
						name='queryName'
						value={filters?.queryName}
						placeholder='Search by Name'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<CustomTextField
						name='queryEmail'
						value={filters?.queryEmail}
						placeholder='Search by Email'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<CustomTextField
						name='queryMobile'
						value={filters?.queryMobile}
						placeholder='Search by Mobile'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<DropdownWithSearch
						name='days'
						value={filters?.days}
						handleOnChange={handleOnChange}
						placeholder='Select no of days'
						options={daysList?.map(({ value }) => value)}
						renderOption={(props, option) => {
							const selectedOption = daysList?.filter(
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
							const selectedOption = daysList?.filter(
								({ value }) => value === option
							)[0];

							return selectedOption?.label;
						}}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<DropdownWithSearch
						name='sortBy'
						value={filters?.sortBy}
						handleOnChange={handleOnChange}
						placeholder='Sort By'
						options={sortByList?.map(({ value }) => value)}
						renderOption={(props, option) => {
							const selectedOption = sortByList?.filter(
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
							const selectedOption = sortByList?.filter(
								({ value }) => value === option
							)[0];

							return selectedOption?.label;
						}}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<DropdownWithSearch
						name='sortByType'
						value={filters?.sortByType}
						handleOnChange={handleOnChange}
						placeholder='Sort By Type'
						options={sortByTypeList}
					/>
				</Grid>

				<Grid item sm={3} xs={12}>
					<Button
						variant='contained'
						size='small'
						onClick={applyFilters}
						sx={{
							bgcolor: "#f37b21 !important",
							textTransform: "none",
						}}>
						Apply Filters
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Filters;
