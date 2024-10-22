// utils/db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

class DBUtils {
  static async isAlive() {
    try {
      const client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(dbName);
      await db.admin().ping();
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getNumberOfUsers() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const count = await db.collection('users').countDocuments();
    await client.close();
    return count;
  }

  static async getNumberOfFiles() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const count = await db.collection('files').countDocuments();
    await client.close();
    return count;
  }
}

module.exports = DBUtils;
