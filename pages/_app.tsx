import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import '../styles/tailwind.css';
import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}