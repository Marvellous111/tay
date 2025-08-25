import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { username } from "better-auth/plugins"


const config = useRuntimeConfig()

const server_api = config.server

const client = new MongoClient(`${server_api.connection_uri}`)
const db = client.db("CronTasks")
 
export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [
    username()
  ],
  emailAndPassword: {
    enabled: true
  },
  secret: process.env.BETTER_AUTH_SECRET
});