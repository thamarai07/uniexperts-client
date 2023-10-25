import { Grid } from "@mui/material";
import { getAccountManager } from "apis/agent";
import { getApplications } from "apis/application";
import {
	getDashboardBanners,
	getDashboardCount,
	getIntakes,
	getInterviews,
	getTopSchools,
} from "apis/dashboard";
import { getCurrencies } from "apis/payment";
import { getPrograms } from "apis/program";
import { ModuleKeys } from "constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";
import AccountManager from "./AccountManager";
import Application from "./Application";
import Balance from "./Balance";
import Banner from "./Banner";
import Intake from "./Intake";
import Interview from "./Interview";
import Performance from "./Performance";
import Programs from "./Programs";
import Schools from "./Schools";
import Welcome from "./Welcome";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
	const history = useHistory()
	const { user: { status, staff: { modules = [] } = {} } = {} } = useSelector(
		state => state
	);

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [isAccountDisabled, setIsAccountDisabled] = useState(false);

	useEffect(() => {

		dispatch(setLoader(true));

		Promise.all([
			//getDashboardBanners(),
			//getDashboardCount(),
			getAccountManager(),
			//getApplications(),
			getCurrencies(),
			//getTopSchools(),
			getPrograms(),
			//getInterviews(),
			//getIntakes(),
		])
			.then(
				([
					//banner,
					//count,
					accountManager,
					//applications,
					currencies,
					//topSchools,
					programs,
					//interviews,
					//intakes,
				]) => {
					setData({
						//banner,
						//count,
						accountManager,
						//applications: applications?.data,
						currencies,
						//topSchools,
						programs,
						//interviews,
						//intakes,
					});
				}
			)
			.finally(dispatch(setLoader(false)));
	}, []);

	useEffect(() => {
		if (status === "APPROVED") {
			setIsAccountDisabled(false);
			return;
		}

		setIsAccountDisabled(true);
	}, [status]);

	useEffect(()=> {
		if(localStorage.getItem("docUploaded")==="false"){
			history.push("/auth/register")
		}
	}, [])

	return (
		<>
			<Grid container spacing={2} bgcolor="#f5f5f5">
				{data?.intakes?.length ? (
					<Grid item xs={12}>
						<Intake data={data?.intakes} />
					</Grid>
				) : null}

				{data?.banner?.length ? (
					<Grid item xs={12}>
						<Banner data={data?.banner} />
					</Grid>
				) : null}

				<Grid item xs={12} md={8} bgcolor="#f5f5f5" >
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Welcome
								data={data?.count}
								isAccountDisabled={isAccountDisabled}
							/>
						</Grid>

						<Grid item xs={12}>
							<Performance />
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} md={4} bgcolor="#f5f5f5">
					<Interview data={data?.interviews} />
				</Grid>

				<Grid item xs={12} md={8} bgcolor="#f5f5f5">
					<Application
						data={data?.applications}
						isAccountDisabled={isAccountDisabled}
					/>
				</Grid>

				<Grid item xs={12} md={4} bgcolor="#f5f5f5">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<AccountManager data={data?.accountManager} />
						</Grid>

						<Grid item xs={12}>
							<Balance
								currencies={data?.currencies}
								isAccountDisabled={isAccountDisabled}
							/>
						</Grid>
					</Grid>
				</Grid>

				{modules?.includes(ModuleKeys.ProgramAndSchool) ? (
					<Grid item xs={12} bgcolor="#f5f5f5">
						<Schools data={data?.topSchools} />
					</Grid>
				) : null}

				{modules?.includes(ModuleKeys.ProgramAndSchool) ? (
					<Grid item xs={12} bgcolor="#f5f5f5">
						<Programs data={data?.programs} />
					</Grid>
				) : null}
			</Grid>
		</>
	);
};

export default Dashboard;
