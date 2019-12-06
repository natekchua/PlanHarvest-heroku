const connector = require('../../../local.js');
const pool = connector.getPool();

const addField= (req, res) => {
  let ID;
  const { fieldSize, location, farmID } = req.body;

  pool.query('insert into field (FieldSize, Location, FarmID) VALUES($1, $2, $3) RETURNING fieldid', [fieldSize, location, farmID], (error, results) => {
    if (error) {
      console.log(error);
    }

    ID = results.rows[0].fieldid;
    console.log(results.rows[0]);
    console.log('added a field');
    res.status(200).json(ID);
    res.end();
  });
};
module.exports = { addField };

