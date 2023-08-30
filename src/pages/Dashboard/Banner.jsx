import { Box } from "@mui/system";
import { Carousel } from "react-responsive-carousel";

const Banner = ({ data = [] }) => {
	if (!data?.length) return null;

	const openInNewTab = link => {
		if (!link) return;

		window.open(link, "_blank", "noopener,noreferrer");
	};

	return (
		<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
			<Carousel
				infiniteLoop
				autoPlay
				showThumbs={false}
				showStatus={false}
				showArrows={false}>
				{data?.map(({ image, link }) => (
					<Box
						key={image}
						onClick={() => openInNewTab(link)}
						sx={{
							height: "25vh",
							cursor: link ? "pointer" : "default",
							margin: "0 0.5rem",
						}}>
						<img
							src={image}
							style={{
								height: "100%",
								objectFit: "fill",
								objectPosition: "center",
							}}
						/>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default Banner;
