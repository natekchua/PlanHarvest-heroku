// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
var cors = require('cors');

app.use(cors());

const port = process.env.PORT || 8080;

// const connector = require('./local.js');
// const connector = require('./connectDB.js');

const fcnsDB = require('./fcnsDB.js');

// test
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// fcnsDB.newFarm();

// messy, but just run this once to create the farms table
// fcnsDB.createTables();

// connector.initDB();

// should let or var be used instead for pool?
// const pool = connector.getPool();

// app.listen(port, '10.13.189.72', () => {
app.listen(port, '192.168.1.3', () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
  console.log('Hi');
});

app.get('/test', fcnsDB.test);
app.get('/initfarms', fcnsDB.initFarms);
app.get('/initfields', fcnsDB.initFields);
app.get('/initbins', fcnsDB.initBins);

app.get('/farms', fcnsDB.getFarms);
app.get('/farms/:id', fcnsDB.getFarmByID);
app.post('/farms', fcnsDB.addFarm);
// app.put('/farms/:id', fcnsDB.editFarm);
// app.delete('/farms/:id', fcnsDB.deleteFarm);

<<<<<<< HEAD

app.get('/fields', fcnsDB.getFields);
app.get('/bins', fcnsDB.getBins);
=======
module.exports = app;
>>>>>>> 44afbfd4d626792f3343bc95506f7be1a636b6d3
