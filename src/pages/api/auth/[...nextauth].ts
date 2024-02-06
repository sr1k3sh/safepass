import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
// import prisma from "../../../app/lib/prisma"
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials:any) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user?.password && bcrypt.compareSync(credentials.password, user.password)) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }

      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session}) {

      return session
    },
    async jwt({ token}:any) {
      return token
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,

  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days

    strategy: 'jwt',

  },
  events: {
    async signOut({ token }) {
      console.log('signOut', token)

    }
  },
  adapter: PrismaAdapter(prisma),
}
export default NextAuth(authOptions)