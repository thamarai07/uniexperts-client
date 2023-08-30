import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Chip,
	Dialog,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getBranch } from "apis/branch";
import { addStaff, changeStaffActiveStatus, getStaff } from "apis/staff";
import CustomSwitch from "components/CustomSwitch";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { ModuleList } from "constants";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";
import * as Yup from "yup";

const roles = [
	{ id: "admin", name: "Admin" },
	{ id: "finance", name: "Finance" },
	{ id: "processing", name: "Processing" },
	{ id: "consultant", name: "Consultant" },
];

const initialValues = {
	fullName: "",
	email: "",
	phone: "",
	role: null,
	password: "",
	branchId: null,
	modules: [],
};

const validationSchema = Yup.object({
	fullName: Yup.string().required("Required"),
	email: Yup.string().required("Required"),
	phone: Yup.string()
		.min(10, "Enter valid phone number")
		.max(10, "Enter valid phone number")
		.required("Required"),
	role: Yup.string().nullable().required("Required"),
	password: Yup.string()
		.required("Required")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		),
	branchId: Yup.string().nullable().required("Required"),
	modules: Yup.array().min(1, "Required").required("Required"),
});

const tableHead = ["", "Name", "Mobile", "Email", "Role", "Branch", "Active"];

const ManageStaff = () => {
	const { user: { staff: { id: currentUserId } = {} } = {} } = useSelector(
		state => state
	);
	const dispatch = useDispatch();

	const formRef = useRef();

	const [staffDetails, setStaffDetails] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [branch, setBranch] = useState([]);

	useEffect(() => {
		getBranch().then(setBranch);
		_fetchData();
	}, []);

	const _fetchData = () => {
		dispatch(setLoader(true));

		getStaff()
			.then(response => setStaffDetails(response))
			.finally(dispatch(setLoader(false)));
	};

	const handleRoleChange = ({ key, value }) => {
		dispatch(setLoader(true));

		changeStaffActiveStatus(key, { isActive: value })
			.then(_fetchData)
			.finally(dispatch(setLoader(false)));
	};

	const onSubmit = values => {
		dispatch(setLoader(true));

		addStaff(values)
			.then(() => {
				_fetchData();
				setIsModalOpen(false);
			})
			.finally(() => {
				dispatch(setLoader(false));
			});
	};

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{tableHead?.map(label => (
									<TableCell key={label} sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody sx={{ backgroundColor: "#F5F5F5" }}>
							{staffDetails?.length ? (
								staffDetails.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.fullName ?? "N/A"}</TableCell>

										<TableCell>{row?.phone ?? "N/A"}</TableCell>

										<TableCell>{row?.email ?? "N/A"}</TableCell>

										<TableCell>{row?.role ?? "N/A"}</TableCell>

										<TableCell>{row?.branch ?? "N/A"}</TableCell>

										<TableCell>
											<CustomSwitch
												name={row?.id}
												disabled={row?.id === currentUserId}
												checked={row?.isActive}
												handleOnChange={handleRoleChange}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow
									key='no-data'
									style={{
										height: "10rem",
									}}>
									<TableCell colSpan={tableHead.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			<Box display='flex' justifyContent='flex-end' p='0 1.25rem'>
				<Button
					variant='contained'
					size='small'
					sx={{ textTransform: "none", bgcolor: "#f37b21 !important" }}
					startIcon={<AddIcon />}
					onClick={() => setIsModalOpen(true)}>
					Add Staff Member
				</Button>
			</Box>

			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				PaperProps={{
					sx: {
						width: { xs: "100%", sm: "80vw" },
						height: { xs: "100%", sm: "auto" },
						maxWidth: "unset",
						maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
						m: 0,
					},
				}}>
				<Box
					p='1rem 2rem'
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='100%'>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						gap='1rem'>
						<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
							Add Staff Members
						</Typography>

						<IconButton onClick={() => setIsModalOpen(false)} sx={{ p: 0 }}>
							<CloseIcon />
						</IconButton>
					</Box>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						innerRef={formRef}
						onSubmit={onSubmit}>
						<Form
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
							}}>
							<Box flexGrow={1}>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={6}>
										<FieldInput name='fullName' label='Full Name' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput name='email' label='Email ID' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<FieldInput type='tel' name='phone' label='Phone Number' />
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field name='role'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														name={field.name}
														placeholder='Role'
														options={roles?.map(({ id }) => id)}
														renderOption={(props, roleId) => {
															const selectedRole = roles?.filter(
																({ id }) => id === roleId
															)[0];

															return (
																<li {...props}>
																	<Typography fontSize='0.75rem'>
																		{selectedRole?.name}
																	</Typography>
																</li>
															);
														}}
														getOptionLabel={roleId => {
															const selectedRole = roles?.filter(
																({ id }) => id === roleId
															)[0];

															return selectedRole?.name;
														}}
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

									<Grid item xs={12} sm={6}>
										<FieldInput
											name='password'
											label='Password'
											type='password'
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field name='branchId'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														name={field.name}
														placeholder='Branch'
														options={branch?.map(({ id }) => id)}
														renderOption={(props, branchId) => {
															const selectedBranch = branch?.filter(
																({ id }) => id === branchId
															)[0];

															return (
																<li {...props}>
																	<Typography fontSize='0.75rem'>
																		{selectedBranch?.name}
																	</Typography>
																</li>
															);
														}}
														getOptionLabel={branchId => {
															const selectedBranch = branch?.filter(
																({ id }) => id === branchId
															)[0];

															return selectedBranch?.name;
														}}
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

									<Grid item xs={12}>
										<Field name='modules'>
											{props => {
												const { field, meta } = props || {};

												return (
													<DropdownWithSearch
														multiple
														disableCloseOnSelect
														name={field.name}
														placeholder='Access'
														options={ModuleList?.map(({ name }) => name)}
														renderOption={(props, moduleName) => {
															const selectedModule = ModuleList?.filter(
																({ name }) => name === moduleName
															)[0];

															return (
																<li {...props}>
																	<Typography fontSize='0.75rem'>
																		{selectedModule?.label}
																	</Typography>
																</li>
															);
														}}
														renderTags={(value, getTagProps) =>
															value.map((moduleName, index) => {
																const selectedModule = ModuleList?.filter(
																	({ name }) => name === moduleName
																)[0];

																return (
																	<Chip
																		key={index}
																		variant='filled'
																		size='small'
																		label={selectedModule?.label}
																		sx={{ fontSize: "0.75rem" }}
																		{...getTagProps({ index })}
																	/>
																);
															})
														}
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
								</Grid>
							</Box>

							<Box display='flex' justifyContent='center'>
								<Button
									variant='contained'
									size='small'
									type='submit'
									sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}>
									Send Invite
								</Button>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default ManageStaff;
