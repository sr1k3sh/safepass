import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import prisma from "../../../app/lib/prisma"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })

  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }:any) {
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  // secret: process.env.JWT_SECRET,
  // callbacks: {
  //   async jwt({token, account}) {
  //     if (account) {
  //       token = Object.assign({}, token, { access_token: account.access_token });
  //     }
  //     return token
  //   },
  //   async session({session, token}) {
  //   if(session) {
  //     session = Object.assign({}, session, {access_token: token.access_token})
  //     console.log(session);
  //     }
  //   return session
  //   }
  // }
}
export default NextAuth(authOptions)