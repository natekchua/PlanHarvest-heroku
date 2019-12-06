const connector = require('../../../local.js');
const pool = connector.getPool();

const getShedIDs = (req, res) => {
  const farmid = parseInt(req.params.id);

  pool.query('select ShedID from shed as s, field as f where f.FarmID= $1 AND s.FieldID = f.FieldID', [farmid], (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.status(200).json(results.rows);
    res.end();
  });
};


module.exports = { getShedIDs };
