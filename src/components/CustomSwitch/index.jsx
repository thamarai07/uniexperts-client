import { FormControlLabel, Switch, Typography } from "@mui/material";

const CustomSwitch = ({
	name,
	checked,
	label,
	handleOnChange = () => {},
	disabled,
	labelSx = {},
	...restProps
}) => {
	return (
		<FormControlLabel
			name={name}
			checked={checked}
			disabled={disabled}
			onChange={(_, value) => handleOnChange({ key: name, value })}
			control={<Switch size='small' />}
			label={
				label ? (
					<Typography fontSize='1rem' sx={{ ...labelSx }}>
						{label}
					</Typography>
				) : null
			}
			labelPlacement='start'
			sx={{
				justifyContent: "flex-end",
				ml: 0,
				"& .Mui-checked": {
					color: "#F37B21 !important",
					"& + .MuiSwitch-track": {
						backgroundColor: "#F37B21 !important",
					},
				},
			}}
			{...restProps}
		/>
	);
};
export default CustomSwitch;
