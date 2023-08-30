import { Avatar, Box, Button, Typography } from "@mui/material";
import { getInterviewPartner } from "apis/interview";
import InterviewDetails from "components/InterviewDetails";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import Filters from "./Filters";

const interviewTypeList = [
	{ value: "PRE_SCREENING", label: "Pre Screening" },
	{ value: "PARTNER_SUPPORT", label: "Partner Support" },
	{ value: "CREDIBILITY_INTERVIEW", label: "Credibility Interview" },
	{ value: "MOCK_PRE_SCREENING", label: "Mock Pre Screening" },
	{ value: "MOCK_CREDIBILITY_INTERVIEW", label: "Mock Credibility Interview" },
];

const interviewTimeList = [
	{ value: "TODAY", label: "Today" },
	{ value: "TOMORROW", label: "Tomorrow" },
	{ value: "THIS_WEEK", label: "This Week" },
	{ value: "PREVIOUS_WEEK", label: "Previous Week" },
	{ value: "UPCOMING_WEEK", label: "Upcoming Week" },
	{ value: "THIS_MONTH", label: "This Month" },
	{ value: "PREVIOUS_MONTH", label: "Previous Month" },
];

const Card = ({ setShowDetails, data }) => {
	const { title, description, organizer, startTime } = data || {};

	return (
		<Box
			bgcolor='#fff'
			display='flex'
			alignItems='flex-start'
			justifyContent='space-between'
			p='1rem 1.25rem'
			borderRadius='0.625rem'>
			<Box display='flex' alignItems='center' gap='1rem'>
				<Avatar src={organizer?.dp} alt={organizer?.name} />

				<Box display='flex' flexDirection='column' gap='0.5rem'>
					<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
						{title}
					</Typography>

					<Typography fontSize='0.825rem' fontWeight={500}>
						{description}
					</Typography>

					<Typography fontSize='0.825rem'>{`${format(
						new Date(startTime),
						"PPp"
					)}`}</Typography>
				</Box>
			</Box>

			<Button
				variant='contained'
				size='small'
				sx={{
					bgcolor: "#f37b21 !important",
					textTransform: "none",
				}}
				onClick={() => setShowDetails(data)}>
				Details
			</Button>
		</Box>
	);
};

const Interview = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [selectedInterview, setSelectedInterview] = useState({});

	const [filters, setFilters] = useState({
		dateRange: [null, null],
		type: null,
		time: null,
	});
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

		_fetchData();
	}, []);

	const _fetchData = () => {
		let requestParams = {
			time: filters?.time,
		};

		if (filters?.type) {
			requestParams.type = filters?.type;
		}

		const [startTime, endTime] = filters?.dateRange || [];

		if (startTime && endTime) {
			requestParams.startTime = startTime;
			requestParams.endTime = endTime;
		}

		dispatch(setLoader(true));

		getInterviewPartner(requestParams)
			.then(setData)
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<>
			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<Typography fontSize='1.2rem' color='#f37b21' fontWeight={700}>
						Interviews
					</Typography>

					<Button
						variant='outlined'
						size='small'
						onClick={() => setShowFilters(!showFilters)}
						sx={{
							color: "#f37b21 !important",
							borderColor: "#f37b21 !important",
							textTransform: "none",
						}}>
						{`${showFilters ? "Hide" : "Show"} Filters`}
					</Button>
				</Box>

				<Filters
					filters={filters}
					setFilters={setFilters}
					interviewTypeList={interviewTypeList}
					interviewTimeList={interviewTimeList}
					showFilters={showFilters}
					_fetchData={_fetchData}
				/>
			</Box>

			{data?.map(elm => (
				<Card key={elm?.id} setShowDetails={setSelectedInterview} data={elm} />
			))}

			{Object.values(selectedInterview)?.length !== 0 && (
				<InterviewDetails
					open={Object.values(selectedInterview)?.length !== 0}
					onClose={() => setSelectedInterview({})}
					onBackdropClick={() => setSelectedInterview({})}
					data={selectedInterview}
				/>
			)}
		</>
	);
};

export default Interview;
