import { Autocomplete, TextField, Typography } from "@mui/material";

const DropdownWithSearch = ({
	name,
	value,
	placeholder,
	options = [],
	handleOnChange = () => {},
	sx = {},
	inputProps,
	...restProps
}) => {
	return (
		<Autocomplete
			fullWidth
			filterSelectedOptions
			value={value}
			sx={{
				"& .MuiAutocomplete-inputRoot": {
					fontSize: "0.825rem",
					bgcolor: "transparent",
				},
				...sx,
			}}
			renderInput={params => (
				<TextField
					{...params}
					{...inputProps}
					fullWidth
					size='small'
					label={placeholder}
					sx={{
						bgcolor: "transparent",
						"& .MuiInputBase-root": { fontSize: "0.825rem" },
						"& .MuiFormLabel-root.MuiInputLabel-shrink": { top: "0.25rem" },
					}}
					InputLabelProps={{ sx: { fontSize: "0.825rem" } }}
				/>
			)}
			renderOption={(props, option) => (
				<li {...props}>
					<Typography fontSize='0.75rem'>{option}</Typography>
				</li>
			)}
			options={options}
			onChange={(event, newValue) =>
				handleOnChange({ key: name, value: newValue })
			}
			{...restProps}
		/>
	);
};

export default DropdownWithSearch;
