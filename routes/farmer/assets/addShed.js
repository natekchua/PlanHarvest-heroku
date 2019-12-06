const connector = require('../../../local.js');
const pool = connector.getPool();

const addShed = (req, res) => {
  let ID;
  const { numRows, stacksPerRow, fieldID, location } = req.body;

  pool.query('insert into shed (numRows, StacksPerRow, Location, FieldID) VALUES($1, $2, $3, $4) RETURNING shedid', [numRows, stacksPerRow, location, fieldID], (error, results) => {
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
