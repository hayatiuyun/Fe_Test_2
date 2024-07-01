// allow eslint no unused var
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "@/utils/password";
import axios from "axios";
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
  passwordHash: string
): Promise<any> {
  // This is where you would fetch user data from your database
  // For now, we'll just return a dummy user object
  try {
    const res = await axios.get("/api/user", {
      baseURL: process.env.LOGIN_URL,
    });
    console.log(res);
    const data = res.data as DataUser[];

    if (data) {
      // return data
      const dataResp = data[0] as DataUser;
      const isVerified = await verifyPassword(dataResp.password, passwordHash);
      // console.log(isVerified, data);

      return {
        name: dataResp.username,
        email: dataResp.email,
        isVerified: isVerified && dataResp.username === username,
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
        console.log("login process started...");

        let user = null;
        const usrInput = credentials as Credentials;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
        const pwHash = await hashPassword(usrInput.password);
        console.log(pwHash);

        // logic to verify if user exists
        // user = await getAuthUser(usrInput.username, pwHash);

        // if (!user || !user.isVerified) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   // throw new Error("User not found.");
        //   return null;
        // }

        // // return user object with the their profile data
        // return user;
        return {
          name: usrInput.username,
          email: "admin@dummy.com",
          isVerified: true,
        };
      },
    }),
  ],
});
