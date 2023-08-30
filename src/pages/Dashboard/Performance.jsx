import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import style from "./style.module.scss";

const data = [
	{
		name: "JAN",
		INR: 4000,
		USD: 2400,
	},
	{
		name: "FEB",
		INR: 3000,
		USD: 1398,
	},
	{
		name: "MAR",
		INR: 2000,
		USD: 9800,
	},
	{
		name: "ARP",
		INR: 2780,
		USD: 3908,
	},
	{
		name: "MAY",
		INR: 1890,
		USD: 4800,
	},
	{
		name: "JUN",
		INR: 2390,
		USD: 3800,
	},
];

const Performance = () => {
	const [selectedtab, setSelectedtab] = useState(0);
	const [selectedYear, setSelectedYear] = useState(2022);

	const onChangeTab = (event, newValue) => setSelectedtab(newValue);

	const onChangeYear = (event, newValue) => setSelectedYear(newValue);

	return (
		<div className={style["performance-wrapper"]}>
			<h1>Performance by Month</h1>

			<div className={style.body}>
				<div className={style["selection-wrapper"]}>
					<Tabs
						className={style.tabs}
						value={selectedtab}
						indicatorColor={null}
						variant='scrollable'
						scrollButtons='auto'
						onChange={onChangeTab}>
						<Tab label='Paid Applications' />

						<Tab label='Paid Students' />

						<Tab label='Students Accepted this Week' />
					</Tabs>

					<Tabs
						className={style.year}
						value={selectedYear}
						indicatorColor={null}
						variant='scrollable'
						scrollButtons='auto'
						onChange={onChangeYear}>
						<Tab value={2020} label='2020' />

						<Tab value={2021} label='2021' />

						<Tab value={2022} label='2022' />
					</Tabs>
				</div>

				<ResponsiveContainer width='100%' height={300}>
					<BarChart width={500} height={300} data={data}>
						<Bar dataKey='INR' fill='#51459E' radius={[4, 4, 4, 4]} />
						<Bar dataKey='USD' fill='#84E8F4' radius={[4, 4, 4, 4]} />

						<YAxis
							tickCount={6}
							tickLine={false}
							tickFormatter={value => {
								if (!value) return value;

								return `${value / 1000} k`;
							}}
						/>
						<XAxis dataKey='name' tickLine={false} />

						<Tooltip
							cursor={{ fill: "transparent" }}
							content={<CustomToolTip selectedYear={selectedYear} />}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

const CustomToolTip = ({ active, payload, label, selectedYear = "" }) => {
	if (!active) return null;

	return (
		<div className={style["custom-tooltip"]}>
			<p className={style.month}>{`${label} ${selectedYear}`}</p>

			{payload.map(({ color, name, value }, index) => (
				<div key={index} className={style.payload}>
					<div className={style["name-conatiner"]}>
						<div className={style.color} style={{ backgroundColor: color }} />
						<p className={style.name}>{name}</p>
					</div>

					<p className={style.value}>{value}</p>
				</div>
			))}
		</div>
	);
};

export default Performance;
