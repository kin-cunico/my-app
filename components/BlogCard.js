import Link from "next/link";
import styles from "../styles/BlogCard.module.css";
import Image from "next/image";
export default function BlogPost({
	title,
	authors,
	image,
	date,
	slug,
	tag,
	description,
	region,
}) {
	return (
		<main className={styles.card}>
			<Link href={"/fauna/" + slug}>
				<div className={styles.imgContainer}>
					<Image
						loader={() => image.url}
						width={700}
						height={400}
						src={image}
						alt="cover image"
					/>
					<section className={styles.textsContainer}>
						<h2 className={styles.title}>{title}</h2>

						<div
							className={styles.description}
							dangerouslySetInnerHTML={{ __html: description }}
						></div>
						<p className={styles.region}>{`Region: ${region}`}</p>
						<tag className={styles.tag}>{`Species: ${tag}`}</tag>
					</section>
				</div>
			</Link>
		</main>
	);
}
