// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const farmRouter = express.Router();

const connector = require('./local.js');

const buildTest = require('./buildTest.js');

buildTest.newFarm();

connector.initDB();

// should let or var be used instead for pool?
const pool = connector.getPool();

/* let server = app.listen(process.env.PORT || 8080, function () {
  console.log("App now running on address: ", server.address());
});
*/

farmRouter.route('/farms')
  .get((req, res) => {
    const response = { hello: 'api test' };
    res.json(response);
  });
app.use('/api', farmRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to planHarvest api');
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

