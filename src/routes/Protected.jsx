import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { Redirect, Route } from "react-router-dom";
import { _getToken } from "utils/token";
import style from "./style.module.scss";
import { RouteNames } from "./_base";

const Protected = ({ exact, path, Component }) => {
	const token = _getToken();

	if (!token) return <Redirect to={RouteNames.login} />;

	if (path === RouteNames.upload_documents || path === RouteNames.tnc)
		return (
			<Route exact={exact} path={path}>
				<Component />
			</Route>
		);

	return (
		<Route exact={exact} path={path}>
			<div className={style.container}>
				<Sidebar />

				<div className={style.wrapper}>
					<Header />

					<Component />
				</div>
			</div>
		</Route>
	);
};

Protected.defaultProps = {
	exact: true,
	path: "/",
	Component: null,
};

export default Protected;
