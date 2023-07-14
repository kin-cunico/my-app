import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/blog-card.module.css";
import Image from "next/image";
import Head from "next/head";
import astToHtmlString from "@graphcms/rich-text-types";

//REMEMBER TO CHANGE BACK TO DOTENV API_KEY
const graphcms = new GraphQLClient(
	"https://api-eu-west-2.hygraph.com/v2/cljw6sko60amd01t61iclg6ff/master"
);

//querying data from our cms from specific post that matches the slug url;
const QUERY = gql`
	query Fauna($slug: String!) {
		faunas {
			id
			name
			image {
				url
				createdBy {
					name
					picture
				}
			}
			tag
			region
			publishedAt
			slug
			authors {
				name
				slug
				authorPhoto {
					url
				}
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
		<div className={styles.parentContainer}>
			<Head>
				<title>Curious Humans</title>
			</Head>
			<nav>
				<Image
					src="/"
					alt="logo"
					width={50}
					height={50}
				/>
				<ul className="nav-list">
					<li className="list-item">HOME</li>
					<li className="list-item">ABOUT</li>
					<li className="list-item">DONATE</li>
				</ul>
			</nav>
			<main className={styles.blogContainer}>
				<Image
					loader={() => fauna.coverImage.url}
					src={fauna.image.url}
					className={styles.img}
					width={700}
					height={400}
					alt="fauna image"
				/>
				<h1 className={styles.title}>{fauna.title}</h1>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: fauna.content.html }}
				></div>
			</main>
		</div>
	);
}
