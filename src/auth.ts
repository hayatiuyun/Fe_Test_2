// allow eslint no unused var
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "@/utils/password";
import axios from "axios";
import API from "./utils/api";
// import { createHash } from "crypto"

interface Credentials {
  username: string;
  password: string;
}

interface DataUser {
  username: string;
  email: string;
  password: string;
}

async function getAuthUser(
  username: string,
  password: string
): Promise<any> {
  // This is where you would fetch user data from your database
  // For now, we'll just return a dummy user object
  try {
    const res = await API.post("/auth/login", {username, password });
    const data = res.data;

    if (data) {
      // return data
      const dataResp = data;
      return {
        name: username,
        email: 'admin@admin.com',
        isVerified: dataResp.is_logged_in === 1,
      };
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {

        let user = null;
        const usrInput = credentials as Credentials;

        // logic to verify if user exists
        user = await getAuthUser(usrInput.username, usrInput.password);

        if (!user || !user.isVerified) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          // throw new Error("User not found.");
          return null;
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
});
