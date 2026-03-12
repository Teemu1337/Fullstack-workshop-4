require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from .env');
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'opiskelijat'
    });

    // Optional lightweight connection check
    await mongoose.connection.db.admin().ping();

    console.log('✅ Connected to MongoDB Atlas with Mongoose');
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

main();