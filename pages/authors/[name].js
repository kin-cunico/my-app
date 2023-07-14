import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/author-card.module.css";
import Head from "next/head";
import Image from "next/image";

//REMEMBER TO CHANGE BACK TO DOTENV API_KEY
const graphcms = new GraphQLClient(
	"https://api-eu-west-2.hygraph.com/v2/clgo1agme69mk01uj0qkp4h6k/master"
);

//querying data from our cms from author to retrieve a list of his posts;
const QUERY = gql`
	query MyQuery {
		authors {
			posts {
				date
				slug
				tag
				title
				content {
					html
				}
				coverImage {
					url
				}
			}
		}
	}
`;

const QUERYAUTHORS = gql`
	query MyQuery {
		authors {
			authorId
			authorSlug
			id
			name
		}
	}
`;

// generating static path for each slug with a request to the server;
export async function getStaticPaths() {
	const { authors } = await graphcms.request(QUERYAUTHORS);
	return {
		paths: [{ params: { name: "authorSlug" } }],
		fallback: true,
	};
}

export async function getStaticProps() {
	const data = await graphcms.request(QUERY);
	const posts = data.authors;
	console.log(posts[0]);
	const post = posts.map((post) => {});

	return {
		props: {
			posts,
		},
		revalidate: 1000,
	};
}

export default function authorWorks({ posts }) {
	return (
		<div className={styles.authorPage}>
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
			<main className="blog-page">
				<div className={styles.authorCard}>
					<h1
						className={styles.title_main}
						color="black"
						text-align="center"
					>
						MAIN CONTAINER FOR TESTING
					</h1>
				</div>

				<div className={styles.authorPosts}>Author Page</div>
			</main>
		</div>
	);
}
