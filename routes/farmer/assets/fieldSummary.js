const connector = require('../../../local.js');
const pool = connector.getPool();

const fieldSummary = (req, res) => {
  const farmid = parseInt(req.params.id);
  const numbers = {
    FieldID: 0,
    Location: null,
    numBins: 0,
    numSheds: 0
  };

  pool.query('select f.FieldID, f.Location', [farmid], (errors, results) => {
    if (errors) {
      console.log(error);
    }

    console.log(results.rows);
    res.status(200).json(results.rows);
    res.end();
  });

  //pool.query('select
};

module.exports = { fieldSummary };
