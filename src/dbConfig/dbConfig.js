const mongoose = require("mongoose");

let cachedDb = null;

/**
 * Connects to the MongoDB database using the provided connection string and options.
 * If a cached connection exists, it returns the cached connection instead of creating a new one.
 * @returns {Promise<mongoose.Connection>} A Promise that resolves to the MongoDB database connection.
 * @throws {Error} If there is an error connecting to the database.
 */
export async function connectToDatabase() {
   if (cachedDb) {
      return cachedDb;
   }

   const connString = process.env.MONGODB_URI;
   const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   };
   console.log("Connecting to database..");
   try {
      const db = await mongoose.connect(connString, options);
      cacheDbConnection(db);
      console.error("Connected to database");
      return db;
   } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
   }
}

/**
 * Caches the provided MongoDB database connection.
 * If the connection is disconnected, the cached connection is set to null.
 * @param {mongoose.Connection} db - The MongoDB database connection to cache.
 */
function cacheDbConnection(db) {
   cachedDb = db;
   db.connection.on("disconnected", () => {
      cachedDb = null;
   });
}
