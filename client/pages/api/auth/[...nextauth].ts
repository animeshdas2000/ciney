import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {
  MongoDBAdapter,
  MongoDBAdapterOptions,
} from "@next-auth/mongodb-adapter"
import clientPromise, { connect } from "../../../lib/db"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)
