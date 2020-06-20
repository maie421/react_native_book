import React from 'react';
import AppContainer from './src/navigations/AppNavigation';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://a56769c02455.ngrok.io/graphql",
})

export default function App() {
  return (
     <ApolloProvider client={client}>
        <AppContainer/>
     </ApolloProvider>
  );
}


