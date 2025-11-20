// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn?: boolean;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    isLoggedIn?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn?: boolean;
  }
}
