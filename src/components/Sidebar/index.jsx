import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ModuleKeys } from "constants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { tabList } from "utils/sidebar";
import style from "./style.module.scss";

const Sidebar = () => {
	const { user: { staff: { modules = [] } = {}, status } = {} } = useSelector(
		state => state
	);

	const history = useHistory();

	const { location: { pathname } = {} } = history || {};

	return (
		<Box className={style.sidebar}>
			{tabList?.map(({ key, label, Icon, path = null }) => {
				let disabled = true;

				if (status === "APPROVED") {
					if (
						modules.includes(key) ||
						key === ModuleKeys.Home ||
						key === ModuleKeys.Support ||
						key === ModuleKeys.Interview
					) {
						disabled = false;
					}
				} else {
					if (
						!(
							key === ModuleKeys.Financial || key === ModuleKeys.GenerateReports
						)
					) {
						disabled = false;
					}
				}

				return (
					<Box
						key={key}
						className={`${style.item} ${
							pathname?.includes(path) ? style.selected : ""
						} ${disabled ? style.disabled : ""}`}
						onClick={() => {
							if (!path) return;

							history.push(path);
						}}>
						<Avatar
							variant='rounded'
							className={style["icon-container"]}
							sx={{
								bgcolor: "#eceff7",
								height: "2.5rem",
								width: "2.5rem",
								borderRadius: "0.625rem",
							}}>
							<Icon className={style.img} />
						</Avatar>

						<Typography
							fontSize='0.75rem'
							fontWeight={500}
							align='center'
							sx={{ opacity: "0.6" }}>
							{label}
						</Typography>
					</Box>
				);
			})}
		</Box>
	);
};

export default Sidebar;
