const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('[DB] MONGO_URI is not set. Skipping database connection.');
    return;
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      autoIndex: true,
    });

    console.log(`[DB] MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('[DB] MongoDB connection failed:', error.message);
  }
};

module.exports = connectDB;
