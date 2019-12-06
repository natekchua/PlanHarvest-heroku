const connector = require('../../../local.js');
const pool = connector.getPool();

const addShed = (req, res) => {
  let ID;
  const { fieldID, location } = req.body;

  pool.query('insert into shed (Location, FieldID) VALUES($1, $2) RETURNING shedid', [location, fieldID], (error, results) => {
    if (error) {
      console.log(error);
    }

    ID = results.rows[0].shedid;
    console.log(results.rows[0]);
    console.log('added a shed');
    res.status(200).json(ID);
    res.end();
  });
};
module.exports = { addShed };
