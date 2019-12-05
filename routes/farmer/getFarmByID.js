const connector = require('../../local.js');
const pool = connector.getPool();

const getFarmByID = (req, res) => {
  const FarmID = parseInt(req.params.id);

  pool.query('SELECT * FROM FARM WHERE FarmID = $1', [FarmID], (error, results) => {
    if (error) {
      throw error;
    };
    res.status(200).json(results.rows);
    res.end();
  });
};

module.exports = { getFarmByID };
