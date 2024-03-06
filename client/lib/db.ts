//IMPORT MONGOOSE
import mongoose from "mongoose"

import { MongoClient } from "mongodb"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .then(() => console.log("Mongoose Connection Established"))
    .catch((err) => console.log(err))

  return conn
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options)
clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
