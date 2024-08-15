import  { defineConfig } from 'drizzle-kit';
import "dotenv/config"
export default defineConfig({
  schema: './db/schema.js',
  out: './db/migration',
  dialect: 'postgresql' , // 'postgresql' | 'mysql' | 'sqlite'
  // driver:"pg",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,

  },
  ssl:process.env.DB_SSL=="true"?true:false,
  verbose:true,
  strict:true
});