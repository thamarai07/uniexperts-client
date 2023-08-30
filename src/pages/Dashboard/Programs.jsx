import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";

const Card = ({ id, name, icon, about: { description } = {} }) => {
	const history = useHistory();

	const onView = () => {
		history.push(RouteNames.program?.replace(":id", id));
	};

	return (
		<Box
			bgcolor='#f5f5f5'
			display='flex'
			flexDirection={{ xs: "column", sm: "row" }}
			alignItems={{ xs: "center", sm: "flex-start" }}
			p='1rem 1.25rem'
			borderRadius='0.25rem'
			gap='1rem'>
			<Avatar src={icon} alt='' />

			<Box
				flexGrow={1}
				display='flex'
				flexDirection={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "center", sm: "flex-start" }}
				justifyContent='space-between'
				gap='1rem'>
				<Box>
					<Typography fontSize='0.825rem' fontWeight={500} align='justify'>
						{name}
					</Typography>

					<Typography fontSize='0.75rem' sx={{ opacity: "0.6" }}>
						{description}
					</Typography>
				</Box>

				<Button
					variant='contained'
					size='small'
					onClick={onView}
					sx={{
						backgroundColor: "#F37B21 !important",
						textTransform: "none",
						width: { xs: "100%", sm: "unset" },
					}}>
					View
				</Button>
			</Box>
		</Box>
	);
};

const Programs = ({ data = [] }) => {
	const [programs, setPrograms] = useState([]);

	useEffect(() => {
		if (!data?.length) return;

		const tempPrograms = [];

		data?.forEach(({ school, programs = [] }) => {
			programs?.forEach(program => {
				tempPrograms.push({
					...program,
					school,
				});
			});
		});

		setPrograms(tempPrograms);
	}, [data]);

	return (
		<Box bgcolor='#fff' p='1rem 1.2rem' borderRadius='0.625rem'>
			<Typography fontSize='1.2rem' color='#f37b21' fontWeight={500}>
				Recent Programs
			</Typography>

			<Box
				display='flex'
				flexDirection='column'
				gap='1rem'
				height='100%'
				maxHeight='25rem'
				overflow='auto'
				mt='0.5rem'>
				{programs?.length ? (
					programs?.map(program => <Card key={program?.id} {...program} />)
				) : (
					<Box display='flex' alignItems='center' justifyContent='center'>
						<Typography fontSize='0.825rem' align='center'>
							No Programs Available !
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Programs;
