import Head from 'next/head';
import Link from 'next/link';
import {gql, useQuery} from "@apollo/client";
import { AwesomeLink } from "../components/AwesomeLink";
import {useUser} from "@auth0/nextjs-auth0/client";

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

export default function Home() {
  const { user } = useUser();
  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 3 },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        To view the awesome links you need to{' '}
        <Link href="/api/auth/login" className=" block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data?.links.pageInfo;
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }, i) => (
            <Link href={`/link/${node.id}`} key={i}>
              <AwesomeLink
                title={node.title}
                category={node.category}
                url={node.url}
                id={node.id}
                description={node.description}
                imageUrl={node.imageUrl}
              />
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!
          </p>
        )}
      </div>
    </div>
  );
}