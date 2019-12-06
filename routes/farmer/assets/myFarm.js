const connector = require('../../../local.js');
const pool = connector.getPool();

const myFarm = (req, res) => {
  const farmid = parseInt(req.params.id);
  const numbers = {
    numBins: 0,
    numFields: 0,
    numSheds: 0
  };

  pool.query('select count(FieldID) from field as f where f.FarmID = $1', [farmid], (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results.rows[0]);
    numbers.numFields = results.rows[0].count;

    pool.query('select count(BinID) from bin as b, field as f where f.FarmID= $1 AND b.FieldID = f.FieldID', [farmid], (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log(results.rows[0]);
      numbers.numBins = results.rows[0].count;

      pool.query('select count(ShedID) from shed as s, field as f where f.FarmID= $1 AND s.FieldID = f.FieldID', [farmid], (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(results.rows[0]);
        numbers.numSheds = results.rows[0].count;
        res.status(200).json(numbers);
        res.end();
      });
    });
  });
};

module.exports = { myFarm };
