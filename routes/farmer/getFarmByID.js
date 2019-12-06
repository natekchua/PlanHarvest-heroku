const connector = require('../../local.js');
const pool = connector.getPool();

const getFarmByID = (req, res) => {
  const farmid = parseInt(req.params.id);

  pool.query('select * from farm where farmid = $1', [farmid], (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

module.exports = { getFarmByID };
