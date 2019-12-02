// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// const connector = require('./local.js');
const connector = require('./connectDB.js');

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

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/farms', fcnsDB.getFarms);
app.get('/initfarms', fcnsDB.initFarms);
app.get('/farms/:id', fcnsDB.getFarmByID);
app.post('/farms', fcnsDB.addFarm);
// app.put('/farms/:id', fcnsDB.editFarm);
// app.delete('/farms/:id', fcnsDB.deleteFarm);
