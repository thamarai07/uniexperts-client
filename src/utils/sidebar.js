import { ReactComponent as Application } from "assets/sidebar/application.svg";
import { ReactComponent as Finance } from "assets/sidebar/finance.svg";
import { ReactComponent as Home } from "assets/sidebar/home.svg";
import { ReactComponent as Interview } from "assets/sidebar/interview.svg";
import { ReactComponent as Report } from "assets/sidebar/report.svg";
import { ReactComponent as School } from "assets/sidebar/school.svg";
import { ReactComponent as Student } from "assets/sidebar/student.svg";
import { ReactComponent as Support } from "assets/sidebar/support.svg";
import { ModuleKeys } from "constants";
import { RouteNames } from "routes/_base";

export const tabList = [
	{
		key: ModuleKeys.Home,
		label: "Home",
		Icon: Home,
		path: RouteNames.dashboard,
	},
	{
		key: ModuleKeys.ProgramAndSchool,
		label: "Program and Schools",
		Icon: School,
		path: RouteNames.programs_and_schools,
	},
	{
		key: ModuleKeys.Students,
		label: "Students",
		Icon: Student,
		path: RouteNames.students,
	},
	{
		key: ModuleKeys.Applications,
		label: "Applications",
		Icon: Application,
		path: RouteNames.applications,
	},
	{
		key: ModuleKeys.Financial,
		label: "Financial",
		Icon: Finance,
		path: RouteNames.finance,
	},
	{
		key: ModuleKeys.GenerateReports,
		label: "Generate Reports",
		Icon: Report,
		path: RouteNames.reports,
	},
	{
		key: ModuleKeys.Interview,
		label: "Interview",
		Icon: Interview,
		path: RouteNames.interview,
	},
	{
		key: ModuleKeys.Support,
		label: "Support",
		Icon: Support,
		path: RouteNames.support,
	},
];
