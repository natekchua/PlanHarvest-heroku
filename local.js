// connect via pool or client
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

    pool.query('select now();', [], (err, result) => {
      done();
      if (err) {
        console.error(`query error:${err.message}`);
      } else {
        console.log(`Query success, data is: ${result.rows[0].now}`);
      }
    });
  });
}

function getPool() {
  return pool;
}

//
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

module.exports = { initDB, getPool };
