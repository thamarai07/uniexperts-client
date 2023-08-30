import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Grid, Typography } from "@mui/material";
import DropdownWithSearch from "components/DropdownWithSearch";
import { SchoolTypes } from "constants";
import { useSelector } from "react-redux";
import EligibilityFilters from "./EligibilityFilters";
import ProgramFilters from "./ProgramFilters";
import SchoolFilters from "./SchoolFilters";

const Filters = ({
	filters,
	setFilters,
	onSearch,
	onFiltersApplied,
	onClearFilters,
	isFilterVisible,
	setIsFilterVisible,
	students = [],
	schools = [],
	intakes = [],
	examTypes = [],
	examTypeFieldsValue = {},
	setExamTypeFieldsValue = () => {},
}) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);

	return (
		<>
			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems='center'
				justifyContent='center'
				gap='0.5rem'>
				<DropdownWithSearch
					name='country'
					options={countries?.map(({ name }) => name)}
					placeholder='Where ?'
					sx={{
						width: { xs: "100%", sm: "15rem" },
					}}
					value={filters?.globalSearch?.country}
					handleOnChange={({ key, value }) => {
						setFilters({
							...filters,
							globalSearch: {
								...filters?.globalSearch,
								[key]: value,
							},
						});
					}}
				/>

				<DropdownWithSearch
					name='discipline'
					placeholder='What would you like to study?'
					sx={{
						"& input": { fontSize: "0.825rem", p: "8px 14px" },
						minHeight: "unset",
						width: { xs: "100%", sm: "20rem" },
					}}
					options={SchoolTypes}
					value={filters?.globalSearch?.discipline}
					handleOnChange={({ key, value }) => {
						setFilters({
							...filters,
							globalSearch: {
								...filters?.globalSearch,
								[key]: value,
							},
						});
					}}
				/>

				<Button
					variant='contained'
					size='small'
					onClick={onSearch}
					sx={{
						bgcolor: "#f37b21 !important",
						width: { xs: "100%", sm: "unset" },
						textTransform: "none",
					}}>
					Search
				</Button>
			</Box>

			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					onClick={() => setIsFilterVisible(!isFilterVisible)}
					sx={{ cursor: "pointer" }}>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						{isFilterVisible ? "Show Less Filters" : `Show More Filters`}
					</Typography>

					{isFilterVisible ? (
						<KeyboardArrowUpIcon />
					) : (
						<KeyboardArrowDownIcon />
					)}
				</Box>

				{isFilterVisible ? (
					<Box>
						<Grid container spacing={1} mt={0}>
							<Grid item xs={12} sm={4}>
								<EligibilityFilters
									students={students}
									examTypes={examTypes}
									examTypeFieldsValue={examTypeFieldsValue}
									setExamTypeFieldsValue={setExamTypeFieldsValue}
									eligibilityFilter={filters?.eligibilityFilter}
									handleOnChange={({ key, value }) => {
										setFilters({
											...filters,
											eligibilityFilter: {
												...filters?.eligibilityFilter,
												[key]: value,
											},
										});
									}}
									setFilters={setFilters}
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<SchoolFilters
									schools={schools}
									schoolFilter={filters?.schoolFilter}
									handleOnChange={({ key, value }) => {
										setFilters({
											...filters,
											schoolFilter: {
												...filters?.schoolFilter,
												[key]: value,
											},
										});
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<ProgramFilters
									intakes={intakes}
									programFilters={filters?.programFilters}
									handleOnChange={({ key, value }) => {
										setFilters({
											...filters,
											programFilters: {
												...filters?.programFilters,
												[key]: value,
											},
										});
									}}
								/>
							</Grid>
						</Grid>

						<Box
							display='flex'
							alignItems='center'
							justifyContent={{ xs: "center", sm: "flex-end" }}
							gap='1rem'
							mt='1rem'>
							<Button
								variant='text'
								size='small'
								onClick={onClearFilters}
								sx={{
									color: "#f37b21 !important",
									width: { xs: "100%", sm: "unset" },
									textTransform: "none",
								}}>
								Clear Filters
							</Button>

							<Button
								variant='contained'
								size='small'
								onClick={onFiltersApplied}
								sx={{
									bgcolor: "#f37b21 !important",
									width: { xs: "100%", sm: "unset" },
									textTransform: "none",
								}}>
								Apply Filters
							</Button>
						</Box>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default Filters;
