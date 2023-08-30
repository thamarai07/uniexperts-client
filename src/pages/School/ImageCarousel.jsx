import { Box } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images = [] }) => {
	if (!images?.length) return null;

	return (
		<Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
			{images?.map(url => (
				<Box
					key={url}
					sx={{
						height: "30vh",
						width: "100%",
					}}>
					<img
						src={url}
						style={{
							height: "100%",
							width: "100%",
							objectFit: "fill",
							objectPosition: "center",
						}}
					/>
				</Box>
			))}
		</Carousel>
	);
};

export default ImageCarousel;
