import { Dialog, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Features = ({ data = [] }) => {
	const [selectedFeature, setSelectedFeature] = useState({});

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
				<Grid container spacing={2}>
					{data?.map((feature, index) => {
						const { icon, name } = feature || {};

						return (
							<Grid key={index} item xs={12} sm={3}>
								<Box
									boxShadow='0px 2px 15px rgba(0, 0, 0, 0.12)'
									display='flex'
									flexDirection='column'
									gap='1rem'
									alignItems='center'
									justifyContent='center'
									p='1rem 1.25rem'
									borderRadius='0.625rem'
									height='100%'
									sx={{ cursor: "pointer" }}
									onClick={() => setSelectedFeature(feature)}>
									<Box height='5rem' width='5rem' overflow='hidden'>
										<img
											src={icon}
											alt=''
											style={{
												height: "100%",
												width: "100%",
												objectFit: "contain",
												objectPosition: "center",
											}}
										/>
									</Box>

									<Typography
										fontSize='0.825rem'
										fontWeight={500}
										align='center'>
										{name}
									</Typography>
								</Box>
							</Grid>
						);
					})}
				</Grid>

				<Typography fontSize='0.75rem' color='#F37B21' mt='2rem'>
					* Information listed is subject to change without notice and should
					not be construed as a commitment by ApplyBoard Inc.
				</Typography>
			</Box>

			<Dialog
				open={Boolean(Object.values(selectedFeature)?.length)}
				PaperProps={{
					sx: {
						width: { xs: "100%", sm: "80vw" },
						height: { xs: "100%", sm: "auto" },
						maxWidth: "unset",
						maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
						m: 0,
					},
				}}
				onClose={() => {
					setSelectedFeature({});
				}}>
				<Box p='1rem 2rem' display='flex' flexDirection='column' gap='1rem'>
					<Box
						display='flex'
						alignItems='flex-start'
						justifyContent='space-between'
						gap='1rem'>
						<Typography fontSize='1.2rem' fontWeight={500} color='#F37B21'>
							{selectedFeature?.name}
						</Typography>

						<IconButton sx={{ p: 0 }} onClick={() => setSelectedFeature({})}>
							<CloseIcon />
						</IconButton>
					</Box>

					<Typography fontSize='0.825rem'>
						{selectedFeature?.description}
					</Typography>

					{selectedFeature?.readMore ? (
						<Typography fontSize='0.825rem'>
							Read more:{" "}
							<a
								href={selectedFeature?.readMore}
								target='_blank'
								rel='noreferrer'>
								{selectedFeature?.readMore}
							</a>
						</Typography>
					) : null}
				</Box>
			</Dialog>
		</>
	);
};

export default Features;
