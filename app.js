// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const farmRouter = express.Router();

const connector = require('./local.js');

const fcnsDB = require('./fcnsDB.js');

// test
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

fcnsDB.newFarm();

// messy, but just run this once to create the farms table
fcnsDB.createTables();

connector.initDB();

// should let or var be used instead for pool?
const pool = connector.getPool();

/* let server = app.listen(process.env.PORT || 8080, function () {
  console.log("App now running on address: ", server.address());
});
*/

/*
farmRouter.route('/farms')
  .get((req, res) => {
    // const response = { hello: 'api test' };
    const response = fcnsDB.getFarms();
    // res.json(response);
  });
app.use('/api', farmRouter);
*/

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/farms', fcnsDB.getFarms);
app.get('/initfarms', fcnsDB.initFarms);

