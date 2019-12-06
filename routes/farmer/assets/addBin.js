const connector = require('../../../local.js');
const pool = connector.getPool();

const addBin = (req, res) => {
  let ID;
  const { capacity, location, fieldID } = req.body;

  pool.query('insert into bin (VolumetricCapacity, Location, FieldID) VALUES($1, $2, $3) RETURNING binid', [capacity, location, fieldID], (error, results) => {
    if (error) {
      console.log(error);
    }

    ID = results.rows[0].binid;
    console.log(results.rows[0]);
    console.log('added a bin');
    res.status(200).json(ID);
    res.end();
  });
};
module.exports = { addBin };
