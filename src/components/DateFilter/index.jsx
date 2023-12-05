import EventIcon from "@mui/icons-material/Event";
import { Box, MenuItem, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import CustomTextField from "components/CustomTextField";
import { TimelineFilters } from "constants";
import { useState } from "react";
import { setDateRangeValueFromFilter } from "utils/functions";

export const DateFilter = ({ dateRange, setDateRange, sx }) => {
	const [selectedFilter, setSelectedFilter] = useState(null);

	return (
		<Box display={"flex"} gap={2} justifyContent={"end"} sx={sx}>
			<DateRangePicker
				inputFormat='dd-MM-yyyy'
				calendars={2}
				value={dateRange}
				onChange={setDateRange}
				renderInput={(startProps, endProps) => (
					<>
						<CustomTextField
							disabled={startProps?.disabled}
							placeholder={"Start Date"}
							inputProps={{
								...startProps.inputProps,
							}}
							InputProps={{
								endAdornment: (
									<EventIcon
										sx={{ height: "1.25rem", color: "rgba(0, 0, 0, 0.38)" }}
									/>
								),
							}}
						/>

						<Box sx={{ mx: 2 }}>
							<Typography fontSize='0.825rem'>to</Typography>{" "}
						</Box>

						<CustomTextField
							disabled={endProps?.disabled}
							placeholder={"End Date"}
							inputProps={{
								...endProps.inputProps,
							}}
							InputProps={{
								endAdornment: (
									<EventIcon
										sx={{ height: "1.25rem", color: "rgba(0, 0, 0, 0.38)" }}
									/>
								),
							}}
						/>
					</>
				)}
			/>
			<CustomTextField
				select
				label='Select Filter'
				size='small'
				value={selectedFilter}
				sx={{
					maxWidth: "200px",
				}}
				handleOnChange={({ value }) => {
					setSelectedFilter(value);
					setDateRangeValueFromFilter(
						value,
						dateRange,
						([startDate, endDate]) => {
							setDateRange([startDate, endDate]);
						}
					);
				}}>
				{Object.values(TimelineFilters).map(option => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</CustomTextField>
		</Box>
	);
};
