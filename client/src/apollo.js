// use apollo Client connect the frontend(REACT)and the backEnd(graphQL)
//ApolloClient: connet GraphQL
//InMemoryCache: caching GraphQL data
//creatHttplink: creates an HTTP link that can communicate with a GraphQL server
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
