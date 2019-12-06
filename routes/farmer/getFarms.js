const connector = require('../../local.js');
const pool = connector.getPool();

const getFarms = (req, res) => {
  pool.query('SELECT * FROM FARM ORDER BY FarmID ASC', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
    res.end();
  });

};

module.exports = { getFarms };
