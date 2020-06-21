import React from 'react';
import AppContainer from './src/navigations/AppNavigation';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://33574e20d48b.ngrok.io/graphql",
})

export default function App() {
  return (
     <ApolloProvider client={client}>
        <AppContainer/>
     </ApolloProvider>
  );
}


