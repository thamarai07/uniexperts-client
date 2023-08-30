import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Typography } from "@mui/material";
import DropdownWithSearch from "components/DropdownWithSearch";

const Step1 = ({ currencies = [], data = {}, handleOnChange, nextStep }) => {
	return (
		<>
			<Box flexGrow={1} mb='1rem'>
				<DropdownWithSearch
					name='selectedCurrency'
					value={data?.selectedCurrency}
					handleOnChange={handleOnChange}
					placeholder='Select Currency'
					options={currencies}
					renderOption={(props, currency) => {
						return (
							<li {...props}>
								<Typography fontSize='0.75rem'>{`${currency?.sign} ${currency?.name}`}</Typography>
							</li>
						);
					}}
					getOptionLabel={currency => {
						return `${currency?.sign} ${currency?.name}`;
					}}
				/>
			</Box>

			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				gap='1rem'>
				<Button
					variant='contained'
					disabled={!data?.selectedCurrency}
					onClick={nextStep}
					endIcon={<KeyboardArrowRightIcon />}
					sx={{
						bgcolor: "#f37b21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgb(0 0 0 / 12%)!important",
						},
					}}>
					Next
				</Button>
			</Box>
		</>
	);
};

export default Step1;
