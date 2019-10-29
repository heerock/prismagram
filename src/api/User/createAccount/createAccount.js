import { prisma } from '../../../../generated/prisma-client';
export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { username, email, firstName="" , lastName="", bio="" } = args;
            const exists = await prisma.$exists.user({ username });
            if(exists) {
                throw Error('이미 존재하는 유저입니다.');
            }
            try {
                const user = await prisma.createUser({
                    username, 
                    email, 
                    firstName, 
                    lastName, 
                    bio
                });
                return true;
            } catch(err) {
                return false;
            }
            
        }
    }
};