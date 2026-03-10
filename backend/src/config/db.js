const mongoose = require('mongoose');

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\x1b[32m✔ MongoDB conectado: ${conn.connection.host}\x1b[0m`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m✘ MongoDB falló: ${error.message}\x1b[0m`);
    process.exit(1);
  }
}

module.exports = connectDB;
