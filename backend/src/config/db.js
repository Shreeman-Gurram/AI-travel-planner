const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () => {
  console.log('[DB] Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('[DB] Mongoose connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[DB] Mongoose disconnected');
});

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('[DB] MONGO_URI is not set. Set it in your .env file to connect to MongoDB Atlas.');
    return false;
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
      autoIndex: true,
    });

    console.log(`[DB] MongoDB connected successfully on host: ${connection.connection.host}`);
    return true;
  } catch (error) {
    console.error('[DB] MongoDB connection failed:', error.message);
    return false;
  }
};

module.exports = connectDB;
