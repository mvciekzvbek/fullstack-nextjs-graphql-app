import { makeSchema, connectionPlugin } from 'nexus'
import { join } from "path";
import * as types from "./types";

export const schema = makeSchema({
  types,
  plugins: [
    connectionPlugin(),
  ],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules","@types","nexus-typegen","index.d.ts"
    ),
    schema: join(process.cwd(), "api/graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "api/graphql", "context.ts"),
  },
});