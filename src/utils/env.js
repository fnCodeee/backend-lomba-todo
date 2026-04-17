import dotenv from 'dotenv'
dotenv.config()
const DATABASE_URI = process.env.DATABASE_URI || ""
const SECRET = process.env.SECRET || ""
const PORT = process.env.PORT || 3000
export {
  DATABASE_URI,
  SECRET,
  PORT
}