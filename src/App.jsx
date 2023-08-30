import { LicenseInfo, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getProfileData } from "apis/auth";
import { getCountries, getTimezone } from "apis/geography";
import Loader from "components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouteNames } from "routes/_base";
import { setUser } from "store";
import { setCountries, setTimezone } from "store/appStore/actions";
import { _getToken } from "utils/token";
import Routes from "./routes";

const App = () => {
	const {
		user = {},
		app: { isLoading, countries = [], timezone = [] },
	} = useSelector(state => state);
	const dispatch = useDispatch();

	const history = useHistory();

	// eslint-disable-next-line no-undef
	LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);

	useEffect(() => {
		if (!Object.keys(user).length && _getToken()) {
			getProfileData().then(userDetails => dispatch(setUser(userDetails)));
		}

		if (!countries.length)
			getCountries().then(countries => dispatch(setCountries(countries)));

		if (!timezone.length)
			getTimezone().then(timezone => dispatch(setTimezone(timezone)));
	});

	useEffect(() => {
		if (!Object.keys(user).length) return;

		const { isDocumentsRequired, isTncAccepted } = user || {};

		if (isDocumentsRequired) {
			history.replace(RouteNames.upload_documents);
			return;
		}

		if (!isTncAccepted) {
			history.replace(RouteNames.tnc);
			return;
		}
	}, [user]);

	// eslint-disable-next-line no-undef
	if (process.env.NODE_ENV === "production") {
		console.log = () => {};
		console.warn = () => {};
		console.info = () => {};
	}

	return (
		<>
			{isLoading ? <Loader /> : null}

			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme='colored'
			/>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Routes />
			</LocalizationProvider>
		</>
	);
};

export default App;
