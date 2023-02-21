import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = ldap.createClient({
          url: process.env.LDAP_URI,
        });

        return new Promise((resolve, reject) => {
          client.bind(credentials.username, credentials.password, (error) => {
            if (error) {
              console.error("Failed");
              reject();
            } else {
              resolve({
                username: credentials.username,
                password: credentials.password,
              });
            }
          });
        });
      },
    }),
  ],
});
