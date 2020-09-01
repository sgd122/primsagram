import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [{ name }, { email }],
      });
      if (exists) {
        throw Error("사용자 이름 혹은 이메일이 이미 생성된 계정입니다.");
      }
      try {
        await prisma.createUser({
          name,
          email,
          firstName,
          lastName,
          bio,
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
