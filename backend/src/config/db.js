const mongoose = require("mongoose");

const mainDb = mongoose.createConnection(process.env.MONGO_URI);
const sharedDb = mongoose.createConnection(process.env.MONGO_URI_SHARED);

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ Missing required environment variable: MONGO_URI");
    process.exit(1);
  }

  if (!process.env.MONGO_URI_SHARED) {
    console.error("❌ Missing required environment variable: MONGO_URI_SHARED");
    process.exit(1);
  }

  try {
    await Promise.all([mainDb.asPromise(), sharedDb.asPromise()]);
    console.log("✅ MongoDB mainDb connected");
    console.log("✅ MongoDB sharedDb connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.mainDb = mainDb;
module.exports.sharedDb = sharedDb;
