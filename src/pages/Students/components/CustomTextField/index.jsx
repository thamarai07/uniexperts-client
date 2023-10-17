import { Visibility, VisibilityOff } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers-pro";
import { useState } from "react";

const CustomTextField = ({
	name,
	value,
	placeholder,
	sx = {},
	handleOnChange = () => { },
	type = "text",
	InputLabelProps = {},
	disabled = false,
	disablePast = false,
	disableFuture = false,
	error = false,
	helperText,
	...restProps
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const textFieldProps = {
		fullWidth: true,
		type: type,
		name: name,
		size: "small",
		label: placeholder,
		value: value,
		onChange: ({ target: { value } }) => handleOnChange({ key: name, value }),
		sx: {
			bgcolor: "transparent",
			"& .MuiInputBase-root": { fontSize: "0.825rem" },
			"& .MuiFormLabel-root.MuiInputLabel-shrink": { top: "0.25rem", color: "#F37B21" },
			"& .MuiOutlinedInput-root": {
				"&.Mui-focused fieldset": {
					borderColor: "#F37B21",
				},
			},
			"&:hover fieldset": { // Add this to change border color on hover
				borderColor: "#F37B21", //
			},
			...sx,
		},
		InputLabelProps: { sx: { fontSize: "0.825rem" }, ...InputLabelProps },
		...restProps,
		error,
		helperText
	};

	if (type === "number") {
		textFieldProps.onKeyDown = event => {
			const { key } = event;

			if (
				key === "e" ||
				key === "E" ||
				key === "+" ||
				key === "-" ||
				key === "ArrowDown" ||
				key === "ArrowUp"
			) {
				event.preventDefault();
			}
		};

		textFieldProps.onPaste = event => {
			event.preventDefault();
		};
	}

	if (type === "password") {
		if (showPassword) {
			textFieldProps.type = "text";
		}

		textFieldProps.InputProps = {};

		textFieldProps.InputProps.endAdornment = (
			<InputAdornment position='end'>
				<IconButton
					disableRipple
					onClick={handleClickShowPassword}
					onMouseDown={handleMouseDownPassword}
					sx={{ scale: "0.75" }}
					edge='end'>
					{showPassword ? <VisibilityOff /> : <Visibility />}
				</IconButton>
			</InputAdornment>
		);
	}

	if (type === "tel") {
		textFieldProps.onKeyDown = event => {
			const ASCIICode = event.which ? event.which : event.keyCode;

			if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
				event.preventDefault();
		};
	}

	if (disabled) {
		textFieldProps.disabled = true;
		textFieldProps.InputLabelProps = {
			...textFieldProps.InputLabelProps,
			shrink: true,
		};
	}

	if (value) {
		textFieldProps.InputLabelProps = {
			...textFieldProps.InputLabelProps,
			shrink: true,
		};
	}

	if (type === "date")
		return (
			<MobileDatePicker
				label={placeholder}
				value={value}
				name={name}
				disabled={disabled}
				disablePast={disablePast}
				disableFuture={disableFuture}
				inputFormat='dd/MM/yyyy'
				onChange={value => {
					restProps.onChange({ target: { name, value: value } });
				}}
				renderInput={params => (
					<TextField
						{...params}
						fullWidth
						size='small'
						sx={{
							bgcolor: "transparent",
							"& .MuiInputBase-root": { fontSize: "0.825rem" },
							"& .MuiFormLabel-root.MuiInputLabel-shrink": { top: "0.25rem", color: "#F37B21" },
							"& .MuiOutlinedInput-root": {
								"&.Mui-focused fieldset": {
									borderColor: "#F37B21",
								},
							},
							...sx,
						}}
						InputLabelProps={{
							sx: { fontSize: "0.825rem" },
							...InputLabelProps,
						}}
						error={error}
						helperText={helperText}
						InputProps={{
							...params?.InputProps,
							endAdornment: (
								<EventIcon
									sx={{ height: "1.25rem", color: "rgba(0, 0, 0, 0.38)" }}
								/>
							),
						}}
					/>
				)}
				sx={{
					"& .MuiPickersToolbar-penIconButton": {
						display: "none",
					},
				}}
			/>
		);

	return <TextField {...textFieldProps} />;
};

export default CustomTextField;
