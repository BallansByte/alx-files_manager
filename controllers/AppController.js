// controllers/AppController.js
const redisUtils = require('../utils/redis');
const dbUtils = require('../utils/db');

class AppController {
  // Handle GET /status
  static async getStatus(req, res) {
    try {
      // Check if Redis and DB are alive
      const redisAlive = await redisUtils.isAlive();
      const dbAlive = await dbUtils.isAlive();

      return res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Handle GET /stats
  static async getStats(req, res) {
    try {
      // Fetch number of users and files in the DB
      const usersCount = await dbUtils.getNumberOfUsers();
      const filesCount = await dbUtils.getNumberOfFiles();

      return res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AppController;
