import Image from "next/image";
import React from "react";
import map from "public/Luminae.jpg";
import styles from "@/styles/Map.module.css";

function Map() {
	return (
		<div
			className={styles.main}
			id="mapDiv"
		>
			<h2 id="map">Luminae Map</h2>
			<Image
				src={map}
				alt="map image"
			></Image>
		</div>
	);
}

export default Map;
