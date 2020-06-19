import React from 'react';
import AppContainer from './src/navigations/AppNavigation';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://565ab56348fc.ngrok.io/graphql",
})

export default function App(props) {
  return (
     <ApolloProvider client={client}>
        <AppContainer/>
     </ApolloProvider>
  );
}


