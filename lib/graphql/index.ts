export * from "./generated";

import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '');
