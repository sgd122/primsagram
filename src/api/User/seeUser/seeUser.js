import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { name } = args;
      return prisma.user({ name });
      // const user = await prisma.user({ name });
      // const posts = await prisma.user({ name }).posts();
      // return { user, posts };
    },
  },
};
