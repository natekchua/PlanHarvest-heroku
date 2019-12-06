const connector = require('../../local.js');
const pool = connector.getPool();

// sketchy authentication is just for proof of concept
const loginFarmer = (req, res) => {
  const id = parseInt(req.params.id);
  const password = req.params.password;
  let pass = false;

  pool.query('SELECT Password FROM authfarmer WHERE ID = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    };

    if (password === results.rows[0].password) {
      pass = true;
    }
    console.log(results.rows[0].password);
    console.log(pass);
    console.log('possibly authenticated a farmer');
    res.status(200).json(pass);
    res.end();
  });
};

module.exports = { loginFarmer};
