import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';
import { Claims, getSession } from "@auth0/nextjs-auth0";

export type Context = {
  prisma: PrismaClient;
  user: Claims
  accessToken: string;
};

export async function createContext({ req, res }): Promise<Context> {
  const { user, accessToken } = await getSession(req, res);
  return {
    user,
    accessToken,
    prisma,
  };
}