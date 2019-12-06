const connector = require('../../../local.js');
const pool = connector.getPool();

const displayBin = (req, res) => {
  const binid = parseInt(req.params.id);

  pool.query('select * from bin as b, product as p, grain as g where b.binid = $1 and g.binid = b.binid and p.productid = g.productid group by b.binid', [binid], (errors, results) => {
    if (errors) {
      console.log(error);
    }

    console.log(results.rows);
    res.status(200).json(results.rows);
    res.end();
  });

  //pool.query('select
};

module.exports = { displayBin };
