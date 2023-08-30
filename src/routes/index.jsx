import Application from "pages/Application";
import Applications from "pages/Applications";
import Dashboard from "pages/Dashboard";
import Finance from "pages/Finance";
import Forgot from "pages/Forgot";
import GenerateReports from "pages/GenerateReports";
import Interview from "pages/Interview";
import Login from "pages/Login";
import Notifications from "pages/Notifications";
import Profile from "pages/Profile";
import Program from "pages/Program";
import ProgramsAndSchools from "pages/ProgramsAndSchools";
import Register from "pages/Register";
import Reset from "pages/Reset";
import School from "pages/School";
import Settings from "pages/Settings";
import AddNewStudent from "pages/Students/AddNew";
import EditStudent from "pages/Students/Edit";
import Students from "pages/Students/ListView";
import Support from "pages/Support";
import NewCase from "pages/Support/NewCase";
import SingleCase from "pages/Support/SingleCase";
import TermsAndCondition from "pages/TermsAndCondition";
import UploadDocuments from "pages/UploadDocuments";
import { Redirect, Route, Switch } from "react-router-dom";
import Protected from "./Protected";
import Public from "./Public";
import { RouteNames } from "./_base";

const Routes = () => {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Redirect to={RouteNames.login} />
				</Route>

				<Public exact path={RouteNames.login} Component={Login} />
				<Public exact path={RouteNames.forgot} Component={Forgot} />
				<Public exact path={RouteNames.reset} Component={Reset} />
				<Public exact path={RouteNames.register} Component={Register} />

				<Protected path={RouteNames.tnc} Component={TermsAndCondition} />

				<Public
					path={RouteNames.upload_documents}
					Component={UploadDocuments}
				/>

				<Protected path={RouteNames.dashboard} Component={Dashboard} />

				<Protected path={RouteNames.students} Component={Students} />
				<Protected path={RouteNames.new_student} Component={AddNewStudent} />
				<Protected path={RouteNames.edit_student} Component={EditStudent} />

				<Protected path={RouteNames.applications} Component={Applications} />
				<Protected path={RouteNames.application} Component={Application} />

				<Protected path={RouteNames.finance} Component={Finance} />

				<Protected path={RouteNames.interview} Component={Interview} />

				<Protected path={RouteNames.support} Component={Support} />
				<Protected path={RouteNames.support_case} Component={SingleCase} />
				<Protected path={RouteNames.new_case} Component={NewCase} />

				<Protected
					path={RouteNames.programs_and_schools}
					Component={ProgramsAndSchools}
				/>
				<Protected path={RouteNames.school} Component={School} />
				<Protected path={RouteNames.program} Component={Program} />

				<Protected path={RouteNames.profile} Component={Profile} />

				<Protected path={RouteNames.settings} Component={Settings} />

				<Protected path={RouteNames.notifications} Component={Notifications} />

				<Protected path={RouteNames.reports} Component={GenerateReports} />

				<Route path='*'>
					<Redirect to={RouteNames.login} />
				</Route>
			</Switch>
		</>
	);
};

export default Routes;
