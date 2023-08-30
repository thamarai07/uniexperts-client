import { Dialog } from "@mui/material";
import style from "./style.module.scss";

const Loader = () => {
	return (
		<Dialog
			open
			fullScreen
			PaperProps={{ sx: { bgcolor: "rgba(243, 123, 33, 0.2)" } }}>
			<div className={style.loader}>
				<div className={style["lds-ring"]}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</Dialog>
	);
};

export default Loader;
