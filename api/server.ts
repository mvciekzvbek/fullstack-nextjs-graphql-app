import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from "./graphql/schema";
import prisma from "./lib/prisma";
import {Context, createContext} from "./graphql/context";

const start = async() => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, () => {
    resolve(true)
  }));
}

start().then(() => {
  console.log(`🚀 Server ready at http://localhost:4000`);
})