import CustomTextField from "components/CustomTextField";
import { Field } from "formik";

const FieldInput = ({
	name,
	type,
	label,
	placeholder,
	disabled,
	isMultiline,
	error=false,
	helperText,
	...restProps

}) => {
	return (
		<Field name={name}>
			{props => {
				const { field, meta } = props || {};

				const fieldProps = {
					type: type,
					placeholder: placeholder ?? label,
					// error: meta.touched && meta.error ? true : false,
					// helperText: meta.touched && meta.error ? meta.error : null,
					disabled: disabled,
					error,
					helperText,
					...field,

					...restProps,
				};

				if (isMultiline) {
					fieldProps.multiline = true;
					fieldProps.rows = 10;
				}

				return <CustomTextField {...fieldProps} />;
			}}
		</Field>
	);
};

export default FieldInput;
