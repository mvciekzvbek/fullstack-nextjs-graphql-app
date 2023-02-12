import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination(),
        },
      },
    },
  }),
});

export default apolloClient;