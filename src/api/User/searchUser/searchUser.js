import { printSchema } from "graphql";
import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchUser: async(_, args) => {
            const { username } = args;
            return prisma.user({ username });
        }
            
    }
};