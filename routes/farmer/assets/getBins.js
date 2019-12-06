const connector = require('../../../local.js');
const pool = connector.getPool();

const getBins = (req, res) => {
  const farmid = parseInt(req.params.id);

  pool.query('select * from bin as b, field as f where f.FarmID= $1 and f.fieldid=b.fieldid', [farmid], (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results.rows);
    res.status(200).json(results.rows);
    res.end();
  });
};


module.exports = { getBins };
