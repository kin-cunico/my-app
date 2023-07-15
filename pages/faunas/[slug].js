import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/blog-card.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//REMEMBER TO CHANGE BACK TO DOTENV API_KEY
const graphcms = new GraphQLClient(
	"https://api-eu-west-2.hygraph.com/v2/cljw6sko60amd01t61iclg6ff/master"
);

//querying data from our cms from specific post that matches the slug url;
const QUERY = gql`
	query Fauna($slug: String!) {
		fauna(where: { slug: $slug }) {
			id
			name
			image {
				url
			}
			tag
			slug
			region
			publishedAt
			authors {
				name
				slug
				authorPhoto {
					url
				}
			}
			region
			description {
				html
			}
		}
	}
`;

//fetching slug list to match
const SlugList = gql`
	{
		faunas {
			slug
		}
	}
`;

// generating static path for each slug with a request to the server;
export async function getStaticPaths() {
	const { faunas } = await graphcms.request(SlugList);
	return {
		paths: faunas.map((fauna) => ({ params: { slug: fauna.slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const slug = params.slug;
	const data = await graphcms.request(QUERY, { slug });
	const fauna = data.fauna;

	return {
		props: {
			fauna,
		},
		revalidate: 10,
	};
}

export default function BlogPost({ fauna }) {
	return (
		<>
			<Navbar target="_blank" />
			<main className={styles.blogContainer}>
				<div className={styles.imgContainer}>
					<Image
						loader={() => fauna.image.url}
						src={fauna.image.url}
						className={styles.img}
						alt={`${fauna.name} image`}
						width={620}
						height={820}
					/>
				</div>
				<div className={styles.textContainer}>
					<h1 className={styles.title}>{fauna.name}</h1>
					<h4 className={styles.region}>
						Region found: <span>{fauna.region}</span>
					</h4>
					<div
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: fauna.description.html }}
					></div>
					<section>
						<p>Author: {fauna.authors[0].name}</p>
						<p>Date created: {fauna.publishedAt}</p>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
