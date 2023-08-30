import { Box, Tab, Tabs, Typography } from "@mui/material";
import { getAgentEarning } from "apis/report";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const AgentEarning = () => {
	const [data, setData] = useState([]);
	const [selectedTime, setSelectedTime] = useState("MONTH");

	useEffect(() => {
		_fetchData();
	}, [selectedTime]);

	const _fetchData = () => {
		getAgentEarning(selectedTime).then(data => {
			setData(
				data?.map(item => {
					return {
						...item,
						key: item?.key?.split(" ")[0],
					};
				})
			);
		});
	};

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Box>
				<Typography fontSize='1.2rem' color='#f37b21' fontWeight={500}>
					Agent wise earnings
				</Typography>

				{data?.length ? (
					<Tabs
						value={selectedTime}
						indicatorColor={null}
						variant='scrollable'
						scrollButtons='auto'
						onChange={(_, newValue) => setSelectedTime(newValue)}
						sx={{
							minHeight: "unset",
							"& .MuiTabs-scroller": {
								display: "flex",
								justifyContent: "flex-end",
								my: "1rem !important",
							},
							"& .MuiButtonBase-root": {
								textTransform: "none",
								fontSize: "0.75rem",
								color: "#f37b21 !important",
								p: "0.125rem 0.825rem",
								minHeight: "unset",
								minWidth: "unset",
								borderRadius: "0.25rem",
							},
							"& .Mui-selected": {
								bgcolor: "#f37b21 !important",
								color: "#fff !important",
							},
						}}>
						<Tab value='MONTH' label='Month' />

						<Tab value='YEAR' label='Year' />
					</Tabs>
				) : null}
			</Box>

			{data?.length ? (
				<ResponsiveContainer height={300}>
					<BarChart data={data} style={{ marginLeft: "-1rem" }}>
						<CartesianGrid strokeDasharray='3 3' />

						<Bar
							dataKey='value'
							fill='#51459E'
							radius={[4, 4, 0, 0]}
							barSize={30}
						/>

						<YAxis style={{ fontSize: "0.75rem" }} />

						<XAxis
							dataKey='key'
							tickLine={false}
							style={{ fontSize: "0.75rem" }}
						/>

						<Tooltip
							cursor={{ fill: "transparent" }}
							content={<CustomToolTip />}
						/>
					</BarChart>
				</ResponsiveContainer>
			) : (
				<Box>
					<Typography>No Data !</Typography>
				</Box>
			)}
		</Box>
	);
};

const CustomToolTip = ({ active, payload, label }) => {
	if (!active) return null;

	return (
		<Box
			bgcolor='#f37b21'
			color='#fff'
			minWidth='12rem'
			p='0.5rem 1rem'
			borderRadius='0.5rem'>
			<Typography fontSize='1rem' fontWeight={500}>
				{label}
			</Typography>

			{payload.map(({ color, value }, index) => (
				<Box
					key={index}
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					mt='0.5rem'>
					<Box display='flex' alignItems='center' gap='0.75rem'>
						<Box
							sx={{
								bgcolor: color,
								height: "0.5rem",
								width: "0.5rem",
								borderRadius: "50%",
							}}
						/>

						<Typography fontSize='0.825rem' fontWeight={700}>
							{value}
						</Typography>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default AgentEarning;
