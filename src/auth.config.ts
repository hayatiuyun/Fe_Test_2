import type { NextAuthConfig } from "next-auth";


export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },

  debug: process.env.NODE_ENV === "development",
  providers: []
};
