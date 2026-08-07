const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbReady = await connectDB();

  if (process.env.MONGO_URI && !dbReady) {
    console.error('[SERVER] Server cannot start without a working MongoDB connection.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`[SERVER] Listening on port ${PORT}`);
  });
};

startServer();
