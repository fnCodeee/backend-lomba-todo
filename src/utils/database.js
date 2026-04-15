import mongoose from "mongoose";
import { DATABASE_URI } from "./env.js";

if (!DATABASE_URI) {
  throw new Error("DATABASE TIDAK DI TEMUKAN DI ENV!");
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(DATABASE_URI, {
      dbName: "db-lomba-todo",
    });
  }

  cache.conn = await cache.promise;

  return cache.conn;
};

export default connect;
  