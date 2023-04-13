import { PrismaClient } from "@prisma/client";

declare global{
    const prisma : PrismaClient | undefined;
}

export const prisma =  new PrismaClient();