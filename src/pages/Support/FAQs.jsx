import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Typography } from "@mui/material";
import { getFAQ } from "apis/support";
import CustomTextField from "components/CustomTextField";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const Question = ({ title, body, attachment, isVideo }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor='#fff' p='0.5rem 0.75rem' borderRadius='0.25rem'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'
				mb='0.25rem'
				onClick={() => setIsOpen(!isOpen)}
				sx={{ cursor: "pointer" }}>
				<Typography
					fontSize='0.825rem'
					fontWeight={500}
					align='justify'
					maxWidth='60vw'
					noWrap={!isOpen}>
					{title}
				</Typography>

				{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</Box>

			{isOpen ? (
				<Box display='flex' flexDirection='column' gap='0.75rem'>
					<Typography fontSize='0.75rem' align='justify'>
						{body}
					</Typography>

					{attachment ? (
						<Box
							overflow='hidden'
							sx={{ height: { xs: "10rem", sm: "20rem" } }}>
							{isVideo ? (
								<video src={attachment} controls height='100%' width='100%' />
							) : (
								<img
									src={attachment}
									alt=''
									style={{
										height: "100%",
										width: "100%",
										objectFit: "contain",
										objectPosition: "center",
									}}
								/>
							)}
						</Box>
					) : null}

					<Typography fontSize='0.825rem' fontWeight={500}>
						Please contact{" "}
						<Link
							to={RouteNames.new_case}
							style={{
								color: "rgb(51,102,204)",
							}}>
							support
						</Link>{" "}
						if this does not resolve your problem.
					</Typography>
				</Box>
			) : null}
		</Box>
	);
};

const Card = ({ name, updatedAt, questions = [] }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor='#F5F5F5' p='0.5rem 0.75rem' borderRadius='0.25rem'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'
				mb='0.25rem'
				onClick={() => setIsOpen(!isOpen)}
				sx={{ cursor: "pointer" }}>
				<Box>
					<Typography
						fontSize='0.825rem'
						fontWeight={500}
						align='justify'
						maxWidth='60vw'
						noWrap={!isOpen}>
						{name}
					</Typography>

					<Typography fontSize='0.75rem'>
						{format(new Date(updatedAt), "PPP")}
					</Typography>
				</Box>

				{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</Box>

			{isOpen && questions?.length ? (
				<Box display='flex' flexDirection='column' gap='1rem' mt='1rem'>
					{questions?.map((question, index) => (
						<Question key={index} {...question} />
					))}
				</Box>
			) : null}
		</Box>
	);
};

const FAQs = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		getFAQ(search)
			.then(setData)
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box
			sx={{
				bgcolor: "#fff",
				p: "1rem 1.25rem",
				borderRadius: "0.625rem",
			}}>
			<Typography fontSize='1rem' fontWeight={500} color='#F37B21'>
				NEED ANSWERS FAST
			</Typography>

			<Box display='flex' alignItems='center' gap='1rem' mt='1rem'>
				<CustomTextField
					value={search}
					handleOnChange={({ value }) => setSearch(value)}
					onKeyDown={({ key }) => {
						if (key === "Enter") _fetchData();
					}}
					type='search'
				/>

				<Button
					variant='contained'
					size='small'
					onClick={_fetchData}
					sx={{
						textTransform: "none",
						bgcolor: "#F37B21 !important",
					}}>
					Search
				</Button>
			</Box>

			<Box
				display='flex'
				flexDirection='column'
				gap='0.75rem'
				mt='1rem'
				overflow='auto'
				maxHeight='95.7vh'>
				{data?.length ? (
					data?.map((elm, index) => <Card key={index} {...elm} />)
				) : (
					<Box bgcolor='#F5F5F5' p='0.5rem 0.75rem' borderRadius='0.25rem'>
						<Typography fontSize='0.825rem' align='center'>
							No Data Available
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default FAQs;
