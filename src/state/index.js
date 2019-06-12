import { InMemoryCache } from "apollo-cache-inmemory"
import { BatchHttpLink } from "apollo-link-batch-http"
import { ApolloClient } from "apollo-client"
import apolloLogger from "apollo-link-logger"
import { split, ApolloLink } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { withClientState } from "apollo-link-state"

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010

const cache = new InMemoryCache()

const clientStateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {},
})

const batchHttpLink = new BatchHttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
  headers: {
    batch: "true",
  },
})

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  webSocketLink,
  ApolloLink.from([apolloLogger, clientStateLink, batchHttpLink])
)

export const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
})
