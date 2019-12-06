const connector = require('../../../local.js');
const pool = connector.getPool();

const addField= (req, res) => {
  let ID;
  const { farmID, lastName, password } = req.body;

  pool.query('INSERT INTO customer (FirstName, LastName) VALUES($1, $2) RETURNING CustomerID', [firstName, lastName], (error, results) => {
    if (error) {
      console.log(error);
    };

    ID = results.rows[0].customerid;
    console.log(results.rows[0]);
    console.log('added a customer');
    // q2
    pool.query('INSERT INTO authcustomer (ID, Password) VALUES($1, $2)', [ID, password], (error, results) => {
      if (error) {
        console.log(error);
      };
      res.status(200).json(ID);
      console.log('added an AuthCustomer');
      res.end();
    });
  });
  };
module.exports = { addCustomer };
