import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<{}>;

interface GlobalWithFetch extends NodeJS.Global {
  fetch?: any;
}

declare var global: GlobalWithFetch;

// Polyfill fetch() on the server (used by apollo-client)
const isBrowser = typeof window !== 'undefined';
if (!isBrowser) {
  global.fetch = fetch;
}

function create(initialState: {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: isBrowser,
    link: new HttpLink({
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      uri: 'http://localhost:4000/graphql' // Server URL (must be absolute)
    }),
    ssrMode: !isBrowser // Disables forceFetch on the server (so queries are only run once)
  });
}

export default function initApollo(initialState: {} = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
