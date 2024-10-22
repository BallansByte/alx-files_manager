// utils/redis.js
const redis = require('redis');
const client = redis.createClient();

class RedisUtils {
  static async isAlive() {
    return new Promise((resolve) => {
      client.ping((err, response) => {
        if (err || response !== 'PONG') resolve(false);
        else resolve(true);
      });
    });
  }
}

module.exports = RedisUtils;
