import React from 'react';
import { AwesomeLink } from '../components/AwesomeLink';
import { gql, useQuery } from '@apollo/client';
import type { Link as LinkType } from '.prisma/client';
import Link from 'next/link';
import {useUser} from "@auth0/nextjs-auth0/client";

const FavoritesQuery = gql`
  query {
    favorites {
      title
      id
      url
      imageUrl
      description
      category
      }
    }
`;

const Favorites = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(FavoritesQuery);
  if (!user) {
    return (
      <div className="flex items-center justify-center">
        To view favorite links you need to{' '}
        <Link href="/api/auth/login" className=" block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5">My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.favorites.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven't bookmarked any links yet 👀
            </p>
          ) : (
            data.favorites.map((link: LinkType) => (
              <div key={link.id}>
                <AwesomeLink
                  title={link.title}
                  description={link.description}
                  category={link.category}
                  imageUrl={link.imageUrl}
                  url={link.url}
                  id={link.id}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
