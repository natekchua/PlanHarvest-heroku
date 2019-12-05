const connector = require('../../local.js');
const pool = connector.getPool();

const addFarmer = (req, res) => {
  let ID;
  const { officeLocation } = req.body;

  pool.query('INSERT INTO (OfficeLocation) VALUES($2) RETURNING FarmID', [firstName, lastName], (error, results) => {
    if (error) {
      console.log(error);
    };

    ID = results.rows[0].farmid;
    console.log(results.rows[0]);
    console.log('added a farm');
    // q2
    pool.query('INSERT INTO authcustomer (ID, Password) VALUES($1, $2)', [ID, password], (error, results) => {
      if (error) {
        console.log(error);
      };
      res.status(200).json(ID);
      console.log('added an AuthFarmer');
      res.end();
    });
  });
};
module.exports = { addFarmer };
