const connector = require('../../local.js');
const pool = connector.getPool();

// sketchy authentication is just for proof of concept
const loginCustomer = (req, res) => {
  const id = parseInt(req.params.id);
  const password = req.params.password;
  let pass = false;

  pool.query('SELECT Password FROM authcustomer WHERE ID = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    };

    if (password === results.rows[0].password) {
      pass = true;
    }
    console.log(results.rows[0].password);
    console.log(pass);
    console.log('possibly authenticated a customer');
    res.status(200).json(pass);
    // res.pass = pass;
    // res.status(200);
    res.end();
  });
};

module.exports = { loginCustomer };
