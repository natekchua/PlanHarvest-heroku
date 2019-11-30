const express = require('express');

const app = express();

const port = process.env.PORT || 8080;
/* let server = app.listen(process.env.PORT || 8080, function () {
  console.log("App now running on address: ", server.address());
});
*/
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});


require('./local.js').initDB();

// should let or var be used instead for pool?
const pool = require('./local.js').getPool();

app.get('/', (req, res) => {
  res.send('Welcome to the planHarvest api');
  pool.query('select now();', [], (err, result) => {
    // done();
    if (err) {
      console.error(`query error:${err.message}`);
    } else {
      res.body = `Query success, data is: ${result.rows[0].now}`;
      // console.log(`Query success, data is: ${result.rows[0].now}`);
    }
  });
});
