// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
const farmRouter = express.Router();
const cors = require('cors');

const connector = require('./local');
connector.initDB();

app.use(cors());

const port = process.env.PORT || 8080;

const fcnsDB = require('./fcnsDB.js');

// test
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// farmRouter.get('/bins/:id', fcnsDB.getBinByID);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, '10.13.160.98', () => {
//app.listen(port, '192.168.1.3', () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
  console.log('Hi');
});

farmRouter.get('/test2', require('./routes/contract/requestContract').requestContractWheat)
farmRouter.get('/test', fcnsDB.test);
farmRouter.get('/initfarms', fcnsDB.initFarms);
farmRouter.get('/initfields', fcnsDB.initFields);
farmRouter.get('/initbins', fcnsDB.initBins);

farmRouter.get('/farms', fcnsDB.getFarms);
farmRouter.get('/farms/:id', fcnsDB.getFarmByID);
farmRouter.post('/farms', fcnsDB.addFarm, function(req, res) {});
// app.put('/farms/:id', fcnsDB.editFarm);
// app.delete('/farms/:id', fcnsDB.deleteFarm);


farmRouter.get('/fields', fcnsDB.getFields);
farmRouter.post('/fields', fcnsDB.addField);
farmRouter.get('/bins', fcnsDB.getBins);
farmRouter.get('/bins/:id', fcnsDB.getBinByID, function(req, res) {});
// farmRouter.delete('/bins/:id', fcnsDB.getBinByID, function(req, res) {});
farmRouter.post('/bins', fcnsDB.addBin);
app.use('/api', farmRouter);

module.exports = app;
