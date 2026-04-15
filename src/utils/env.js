import dotenv from 'dotenv'
dotenv.config()
const DATABASE_URI = process.env.DATABASE_URI || ""
const SECRET = process.env.SECRET || ""
export {
  DATABASE_URI,
  SECRET
}