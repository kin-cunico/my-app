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
const QUERYFLORA = gql`
	query Flora($slug: String!) {
		flora(where: { slug: $slug }) {
			date
			id
			name
			publishedAt
			region
			slug
			tag
			image {
				url
			}
			description {
				html
			}
		}
	}
`;

//fetching slug list to match
const SlugList = gql`
	{
		floras {
			slug
		}
	}
`;

// generating static path for each slug with a request to the server;
export async function getStaticPaths() {
	const { floras } = await graphcms.request(SlugList);
	return {
		paths: floras.map((flora) => ({ params: { slug: flora.slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const slug = params.slug;
	const data = await graphcms.request(QUERYFLORA, { slug });
	const flora = data.flora;

	return {
		props: {
			flora,
		},
		revalidate: 10,
	};
}

export default function BlogPost({ flora }) {
	console.log(flora.authors);
	return (
		<>
			<Navbar target="_blank" />
			<main className={styles.blogContainer}>
				<Image
					loader={() => flora.image.url}
					src={flora.image.url}
					className={styles.img}
					alt={`${flora.name} image`}
					width={620}
					height={820}
				/>
				<div className={styles.textContainer}>
					<h1 className={styles.title}>{flora.name}</h1>
					<h4>{flora.region}</h4>
					<div
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: flora.description.html }}
					></div>
					<section>
						<p>Date created: {flora.publishedAt}</p>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
