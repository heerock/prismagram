import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_ , __ , { request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile,
                posts
            }
        }
    },
    // 일반 resolver
    // parent는 위에 있는 resolver 즉 user임 나를 call한 resolver
}