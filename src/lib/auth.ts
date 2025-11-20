import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        accessToken: { label: "accessToken", type: "text" },
        refreshToken: { label: "refreshToken", type: "text" },
        userId: { label: "userId", type: "text" },
        userName: { label: "userName", type: "text" },
        emailId: { label: "emailId", type: "text" },
        role: { label: "role", type: "text" },
        isLoggedIn: { label: "isLoggedIn", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.userId ||
          !credentials.userName ||
          !credentials.emailId ||
          !credentials.isLoggedIn ||
          !credentials.role ||
          !credentials.accessToken ||
          !credentials.refreshToken
        ) {
          return null;
        }

        try {
          return {
            id: credentials?.userId,
            name: credentials?.userName,
            email: credentials?.emailId,
            accessToken: credentials?.accessToken,
            refreshToken: credentials?.refreshToken,
            role: credentials?.role,
            isLoggedIn: credentials?.isLoggedIn === "true",
          };
          // throw new Error(result?.response?.message || "Invalid credentials");
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // token.id = user.id;
        token.role = user.role;
        token.isLoggedIn = user.isLoggedIn;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      // session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.isLoggedIn = token.isLoggedIn;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
