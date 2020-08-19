import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return "TOKEN";
      } else {
        throw Error("이메일/비밀값의 조합이 잘못되었습니다.");
      }
    },
  },
};
