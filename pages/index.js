import Image from "next/image";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import BlogPost from "@/components/BlogCard";
import BlogFlora from "@/components/BlogFlora";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import Footer from "@/components/Footer";
import { useEffect } from "react";

//REMEMBER TO CHANGE BACK TO DOTENV API_KEY
const graphcms = new GraphQLClient(
	"https://api-eu-west-2.hygraph.com/v2/cljw6sko60amd01t61iclg6ff/master"
);

//querying data from our cms
const QUERY = gql`
	{
		faunas {
			id
			name
			image {
				url
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
			region
			description {
				html
			}
		}
	}
`;

const QUERYFLORA = gql`
	{
		floras {
			id
			name
			image {
				url
			}
			slug
			tag
			region
			publishedAt
			description {
				html
			}
		}
	}
`;
export async function getStaticProps() {
	const { faunas } = await graphcms.request(QUERY);
	const { floras } = await graphcms.request(QUERYFLORA);

	return {
		props: {
			faunas,
			floras,
		},
		revalidate: 10,
	};
}

// end of query //

export default function Home({ faunas, floras }) {
	return (
		<div className="body">
			<Head>
				<title>Luminae Wikia</title>
			</Head>
			<Navbar />
			<main className="main">
				<h2
					className="faunaHeader"
					id="fauna"
				>
					Meet the Fauna
				</h2>
				<section className="blog-container">
					{faunas.map((fauna) => (
						//mapping our data from the cms and passing it to our blog container

						<BlogPost
							title={fauna.name}
							authors={fauna.authors}
							image={fauna.image.url}
							key={fauna.id}
							date={fauna.publishedAt}
							slug={fauna.slug}
							tag={fauna.tag}
							name={fauna.authors.name}
							region={fauna.region}
							description={fauna.description.html}
						/>
					))}
				</section>
				<h2
					className="faunaHeader"
					id="flora"
				>
					Meet the Flora
				</h2>
				<section className="blog-container">
					{floras.map((flora) => (
						//mapping our data from the cms and passing it to our blog container

						<BlogFlora
							title={flora.name}
							image={flora.image.url}
							key={flora.id}
							date={flora.publishedAt}
							slug={flora.slug}
							tag={flora.tag}
							region={flora.region}
							description={flora.description.html}
						/>
					))}
				</section>
				<Map />
				<Footer />
			</main>
		</div>
	);
}
