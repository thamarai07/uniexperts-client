import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { getIntakes } from "apis/intake";
import { getPrograms, getProgramsV2 } from "apis/program";
import { getSchools } from "apis/school";
import { getStudents } from "apis/student";
import { getExamTypes } from "apis/testScore";
import DropdownWithSearch from "components/DropdownWithSearch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLoader } from "store";
import Filters from "./Filters";
import Programs from "./Programs";
import Schools from "./Schools";

const tabList = ["Programs", "Schools"];

const SortBy = [
	"School Rank",
	"Commission",
	"Tuition Fee High",
	"Tuition Fee Low",
	"Application Fee High",
	"Application Fee Low",
];

const ProgramsAndSchools = () => {
	const {
		location: { state: { studentId = null } = {} },
	} = useHistory();

	const dispatch = useDispatch();

	const [selectedTab, setSelectedTab] = useState(0);
	const [students, setStudents] = useState([]);
	const [schools, setSchools] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const [examTypes, setExamTypes] = useState([]);

	const [data, setData] = useState([]);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [filters, setFilters] = useState({
		eligibilityFilter: {
			studentId: studentId ?? null,
		},
		schoolFilter: {
			state: [],
			schoolType: [],
			schoolIds: [],
		},
		programFilters: {
			programLevels: [],
			subDiscipline: [],
		},
		globalSearch: {},
		sortBy: SortBy[0],
	});
	const [examTypeFieldsValue, setExamTypeFieldsValue] = useState({});

	useEffect(() => {
		Promise.all([
			//getStudents(),
			getSchools(),
			getIntakes(),
			getExamTypes(),
		]).then(([
			//students, 
			schools, intakes, examTypes]) => {
			//setStudents(students);
			setSchools(schools);
			setIntakes(intakes);
			setExamTypes(examTypes);
		});

		onFiltersApplied();
	}, []);

	const onFiltersApplied = () => {
		dispatch(setLoader(true));

		const eligibilityFilter = {
			...filters?.eligibilityFilter,
		};

		Object.keys(examTypeFieldsValue)?.forEach(fieldName => {
			const value = examTypeFieldsValue[fieldName];

			eligibilityFilter[fieldName] = value;
		});

		const reqData = {
			eligibilityFilter: eligibilityFilter,
			schoolFilter: filters?.schoolFilter,
			programFilters: filters?.programFilters,
			sortBy: filters.sortBy,
		};

		getPrograms(reqData)
			.then(data => {
				setData(data);
				setFilters({
					...filters,
					globalSearch: {},
				});
			})
			.finally(dispatch(setLoader(false)));
	};

	const onSearch = () => {
		const reqParams = {
			...filters?.globalSearch,
			sortBy: filters.sortBy,
		};

		dispatch(setLoader(true));
		getProgramsV2(reqParams)
			.then(data => {
				setData(data);
				setIsFilterVisible(false);
				setFilters({
					...filters,
					eligibilityFilter: {},
					schoolFilter: {
						state: [],
						schoolType: [],
						schoolIds: [],
					},
					programFilters: {
						programLevels: [],
						discipline: [],
						subDiscipline: [],
					},
				});
			})
			.finally(dispatch(setLoader(false)));
	};

	const onClearFilters = () => {
		setFilters({
			...filters,
			eligibilityFilter: {},
			schoolFilter: {
				state: [],
				schoolType: [],
				schoolIds: [],
			},
			programFilters: {
				programLevels: [],
				discipline: [],
				subDiscipline: [],
			},
		});

		setIsFilterVisible(false);
		onSearch();
	};

	return (
		<>
			<Filters
				filters={filters}
				setFilters={setFilters}
				onSearch={onSearch}
				onFiltersApplied={onFiltersApplied}
				onClearFilters={onClearFilters}
				isFilterVisible={isFilterVisible}
				setIsFilterVisible={setIsFilterVisible}
				students={students}
				schools={schools}
				intakes={intakes}
				examTypes={examTypes}
				examTypeFieldsValue={examTypeFieldsValue}
				setExamTypeFieldsValue={setExamTypeFieldsValue}
			/>

			<Box
				bgcolor='#fff'
				borderRadius='0.625rem'
				p='1rem 1.25rem'
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "stretch", sm: "center" }}
				justifyContent={{ xs: "unset", sm: "space-between" }}
				gap='1rem'>
				<Tabs
					variant='scrollable'
					value={selectedTab}
					onChange={(_, newValue) => setSelectedTab(newValue)}
					indicatorColor=''
					sx={{
						p: 0,
						"& .Mui-selected": {
							borderBottomColor: "#f37b21",
							color: "#f37b21 !important",
						},
					}}>
					{tabList?.map(tab => (
						<Tab
							key={tab}
							label={tab}
							sx={{
								borderBottom: "2px solid transparent",
								textTransform: "none",
							}}
						/>
					))}
				</Tabs>

				<DropdownWithSearch
					fullWidth={false}
					name='sortBy'
					options={SortBy}
					placeholder='Sort By'
					sx={{
						width: { xs: "100%", sm: "15rem" },
					}}
					defaultValue={SortBy[0]}
					value={filters?.globalSearch?.sortBy}
					handleOnChange={({ value }) => {
						setFilters({
							...filters,
							sortBy: value,
						});
					}}
				/>
			</Box>

			{selectedTab === 0 ? (
				<Programs data={data} studentList={students} />
			) : null}

			{selectedTab === 1 ? (
				<Schools data={data?.map(({ school }) => school)} />
			) : null}
		</>
	);
};

export default ProgramsAndSchools;
