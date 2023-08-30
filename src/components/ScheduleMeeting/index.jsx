import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import {
	Box,
	Button,
	Dialog,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import { scheduleMeeting } from "apis/interview";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { InterviewReasons } from "constants";
import { add } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import * as Yup from "yup";

const initialValues = {
	title: "",
	reason: null,
	description: "",
	date: null,
	time: null,
};

const validationSchema = Yup.object({
	title: Yup.string().required("Required"),
	reason: Yup.string().nullable().required("Required"),
	description: Yup.string().required("Required"),
	date: Yup.string().nullable().required("Required"),
	time: Yup.mixed().nullable().required("Required"),
});

const slotList = [
	{
		value: {
			hours: 10,
			minutes: 0,
		},
		label: "10:00am Onwards",
	},
	{
		value: {
			hours: 10,
			minutes: 30,
		},
		label: "10:30am Onwards",
	},
	{
		value: {
			hours: 11,
			minutes: 0,
		},
		label: "11:00am Onwards",
	},
	{
		value: {
			hours: 11,
			minutes: 30,
		},
		label: "11:30am Onwards",
	},
	{
		value: {
			hours: 12,
			minutes: 0,
		},
		label: "12:00pm Onwards",
	},
	{
		value: {
			hours: 12,
			minutes: 30,
		},
		label: "12:30pm Onwards",
	},
	{
		value: {
			hours: 13,
			minutes: 0,
		},
		label: "01:00pm Onwards",
	},
	{
		value: {
			hours: 13,
			minutes: 30,
		},
		label: "01:30pm Onwards",
	},
	{
		value: {
			hours: 14,
			minutes: 0,
		},
		label: "02:00pm Onwards",
	},
	{
		value: {
			hours: 14,
			minutes: 30,
		},
		label: "02:30pm Onwards",
	},
	{
		value: {
			hours: 15,
			minutes: 0,
		},
		label: "03:00pm Onwards",
	},
	{
		value: {
			hours: 15,
			minutes: 30,
		},
		label: "03:30pm Onwards",
	},
	{
		value: {
			hours: 16,
			minutes: 0,
		},
		label: "04:00pm Onwards",
	},
	{
		value: {
			hours: 16,
			minutes: 30,
		},
		label: "04:30pm Onwards",
	},
	{
		value: {
			hours: 17,
			minutes: 0,
		},
		label: "05:00pm Onwards",
	},
	{
		value: {
			hours: 17,
			minutes: 30,
		},
		label: "05:30pm Onwards",
	},
	{
		value: {
			hours: 18,
			minutes: 0,
		},
		label: "06:00pm Onwards",
	},
	{
		value: {
			hours: 18,
			minutes: 30,
		},
		label: "06:30pm Onwards",
	},
	{
		value: {
			hours: 19,
			minutes: 0,
		},
		label: "07:00pm Onwards",
	},
];

const ScheduleMeeting = ({
	open = false,
	onBackdropClick = () => {},
	onClose = () => {},
}) => {
	const dispatch = useDispatch();

	const onSubmit = values => {
		const date = values?.date;
		const startTime = add(date, values.time.value);
		const endTime = add(startTime, { minutes: 30 });

		const reqData = {
			title: values?.title,
			description: values?.description,
			reason: values?.reason,
			startTime,
			endTime,
		};

		dispatch(setLoader(true));
		scheduleMeeting(reqData)
			.then(onClose)
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Dialog
			open={open}
			onBackdropClick={onBackdropClick}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: { xs: "100%", sm: "60vw" },
					height: { xs: "100%", sm: "auto" },
					maxWidth: "unset",
					maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
					m: 0,
				},
			}}>
			<Box
				sx={{
					p: "1rem 2rem",
					overflow: "auto",
				}}>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Schedule a Meeting
					</Typography>

					<IconButton onClick={onClose} sx={{ p: 0 }}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}>
					<Form>
						<Grid container spacing={1} mt={0}>
							<Grid item md={12} sm={12} xs={12}>
								<FieldInput name='title' label='Title' />
							</Grid>

							<Grid item md={12} sm={12} xs={12}>
								<Field name='reason'>
									{props => {
										const { field, meta } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Reason'
												options={InterviewReasons}
												handleOnChange={({ key, value }) => {
													field.onChange({ target: { name: key, value } });
												}}
												inputProps={{
													error: meta.touched && meta.error ? true : false,
													helperText:
														meta.touched && meta.error ? meta.error : null,
												}}
											/>
										);
									}}
								</Field>
							</Grid>

							<Grid item md={6} sm={6} xs={12}>
								<FieldInput
									type='date'
									disablePast={true}
									name='date'
									label='Select Date'
								/>
							</Grid>

							<Grid item md={6} sm={6} xs={12}>
								<Field name='time'>
									{props => {
										const { field, meta, form } = props || {};

										return (
											<DropdownWithSearch
												name={field.name}
												value={field.value}
												placeholder='Select Time Slot'
												disabled={!form.values.date}
												options={slotList}
												handleOnChange={({ key, value }) => {
													field.onChange({ target: { name: key, value } });
												}}
												renderOption={(props, option) => {
													return (
														<li {...props}>
															<Typography fontSize='0.75rem'>
																{option.label}
															</Typography>
														</li>
													);
												}}
												getOptionLabel={option => option.label}
												inputProps={{
													error: meta.touched && meta.error ? true : false,
													helperText:
														meta.touched && meta.error ? meta.error : null,
												}}
											/>
										);
									}}
								</Field>
							</Grid>

							<Grid item md={12} sm={12} xs={12}>
								<FieldInput
									type='textarea'
									multiline
									rows={4}
									name='description'
									label='Description'
								/>
							</Grid>

							<Grid
								item
								xs={12}
								display='flex'
								gap='0.125rem'
								alignItems='center'
								sx={{ opacity: "0.6" }}>
								<LanguageIcon sx={{ height: "1rem" }} />
								<Typography fontSize='0.75rem' fontWeight={500}>
									{`India Standard Time (UTC +5:30)`}
								</Typography>
							</Grid>
						</Grid>

						<Box display='flex' justifyContent='center' m='1rem 0'>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{
									bgcolor: "#f37b21 !important",
									textTransform: "none",
									minWidth: "8rem",
								}}>
								Submit
							</Button>
						</Box>
					</Form>
				</Formik>
			</Box>
		</Dialog>
	);
};

export default ScheduleMeeting;
