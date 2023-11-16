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
	setExamTypeFieldsValue = () => { },
}) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);

	const countryList = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bhutan",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Côte d'Ivoire",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo (Congo-Brazzaville)",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czechia (Czech Republic)",
		"Democratic Republic of the Congo",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini (fmr. 'Swaziland')",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Holy See",
		"Honduras",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Morocco",
		"Mozambique",
		"Myanmar (formerly Burma)",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"North Korea",
		"North Macedonia",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestine State",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Vincent and the Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Korea",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Sweden",
		"Switzerland",
		"Syria",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor-Leste",
		"Togo",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States of America",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe"
	];

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
					options={countryList?.map(name => name)}
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
