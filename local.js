// connect via pool or client
// https://dev.to/ogwurujohnson/-persisting-a-node-api-with-postgresql-without-the-help-of-orms-like-sequelize-5dc5
const { Pool } = require('pg');

const pool = new Pool({
  user: 'stamper',
  password: 'forBer88',
  host: '127.0.0.1',
  database: 'planHarvest',
  port: '5432',
  // ssl: true
});

function initDB() {
  pool.connect((err, client, done) => {
    if (err) {
      console.error(`Connect query:${err.message}`);
      return;
    }
  });
}

function getPool() {
  return pool;
}

module.exports = { initDB, getPool };
