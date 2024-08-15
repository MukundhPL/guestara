import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js" ;
import pg from "pg";
import "dotenv/config"
const dbCredentials={
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl:process.env.DB_SSL=="true"?true:false
}

const client = new pg.Client(dbCredentials)
await client.connect()

const db = drizzle(client,{schema,logger:true}) 
export default db