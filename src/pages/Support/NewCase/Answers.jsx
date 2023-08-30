import { Box, Button, Typography } from "@mui/material";
import { getFAQ } from "apis/support";
import CustomTextField from "components/CustomTextField";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const Card = ({ title, updatedAt, body }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor='#F5F5F5' p='0.5rem 0.75rem' borderRadius='0.25rem'>
			<Box
				mb='0.25rem'
				onClick={() => setIsOpen(!isOpen)}
				sx={{ cursor: "pointer" }}>
				<Typography
					fontSize='0.825rem'
					fontWeight={500}
					align='justify'
					noWrap={!isOpen}>
					{title}
				</Typography>

				{!isOpen ? (
					<Typography fontSize='0.75rem'>
						{format(new Date(updatedAt), "PPP")}
					</Typography>
				) : null}
			</Box>

			{isOpen ? (
				<Typography fontSize='0.75rem' align='justify'>
					{body}
				</Typography>
			) : null}
		</Box>
	);
};

const Answers = ({ faqs = [] }) => {
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!faqs?.length) return;

		_formatData(faqs);
	}, [faqs]);

	const _formatData = faqs => {
		const tempData = [];

		faqs?.forEach(({ name, questions = [] }) => {
			questions?.forEach(question => {
				tempData.push({
					category: name,
					...question,
				});
			});
		});

		setData(tempData);
	};

	const onSearch = () => {
		dispatch(setLoader(true));

		getFAQ(search)
			.then(_formatData)
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
					type='search'
					value={search}
					handleOnChange={({ value }) => setSearch(value)}
					onKeyDown={({ key }) => {
						if (key === "Enter") onSearch();
					}}
				/>

				<Button
					variant='contained'
					size='small'
					onClick={onSearch}
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

export default Answers;
