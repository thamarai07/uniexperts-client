import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import Cases from "./Cases";
import FAQs from "./FAQs";
import Tabs from "./Tabs";

const tabs = ["Cases", "FAQs"];

const Support = () => {
	const history = useHistory();

	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);

	const createCase = () => {
		history.push(RouteNames.new_case);
	};

	return (
		<>
			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Box display='flex' alignItems='center' justifyContent='space-between'>
					<Typography fontSize='1.2rem' color='#f37b21' fontWeight={700}>
						Support
					</Typography>

					<Button
						variant='contained'
						size='small'
						onClick={createCase}
						style={{
							backgroundColor: "#F37B21",
							textTransform: "none",
						}}>
						Create Case
					</Button>
				</Box>
			</Box>

			<Tabs
				tabs={tabs}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>

			{selectedTab === 0 ? <Cases /> : null}

			{selectedTab === 1 ? <FAQs /> : null}
		</>
	);
};

export default Support;
