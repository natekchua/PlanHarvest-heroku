const connector = require('../../../local.js');
const pool = connector.getPool();

const addBin = (req, res) => {
  const { location, fieldID } = req.body;

  pool.query('insert into bin (Location, FieldID) VALUES($1, $2)', [location, fieldID], (error, results) => {
    if (error) {
      console.log(error);
    }

    console.log('added a bin');
    res.status(200);
    res.end();
  });
};
module.exports = { addBin };
