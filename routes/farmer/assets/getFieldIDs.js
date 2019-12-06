// Returns a Table of Farmer-owned FieldIDs
const connector = require('../../../local.js');
const pool = connector.getPool();

const getFieldIDs = (req, res) => {
  const farmid = parseInt(req.params.id);

  pool.query('select FieldID from field as f where f.FarmID = $1', [farmid], (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results.rows);
    res.status(200).json(results.rows);
    res.end();
  });
};

module.exports = { getFieldIDs };
