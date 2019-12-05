// remember to delete nodemon stuff from package.json before production
const express = require('express');

const app = express();
const farmRouter = express.Router();
const contractRouter = express.Router();
const authRouter = express.Router();
const cors = require('cors');

const connector = require('./local.js');
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

// app.listen(port, 'localhost', () => {
// app.listen(port, '192.168.1.3', () => {
app.listen(port, '10.13.186.178', () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
  console.log('Hi');
});

app.get('/test', fcnsDB.test);
farmRouter.get('/initfarms', fcnsDB.initFarms);
farmRouter.get('/initfields', fcnsDB.initFields);
farmRouter.get('/initbins', fcnsDB.initBins);

// authentication
authRouter.post('/adduser/customer', require('./routes/authentication/addCustomer').addCustomer);

authRouter.post('/adduser/farmer', require('./routes/authentication/addFarmer').addFarmer);

app.use('/authentication', authRouter);

// farm
farmRouter.get('/farms', require('./routes/farmer/getFarms').getFarms);

farmRouter.get('/farms/:id', require('./routes/farmer/getFarmByID').getFarmByID);

farmRouter.get('/farms/add', fcnsDB.addFarm); // temp fcn for testing
farmRouter.post('/farms', fcnsDB.addFarm);
// app.put('/farms/:id', fcnsDB.editFarm);
// app.delete('/farms/:id', fcnsDB.deleteFarm);

farmRouter.get('/assets/fields', fcnsDB.getFields);
farmRouter.post('/assets/fields', fcnsDB.addField);
farmRouter.get('/assets/bins', fcnsDB.getBins);
farmRouter.get('/assets/bins/:id', fcnsDB.getBinByID);
// farmRouter.delete('/bins/:id', fcnsDB.getBinByID, function(req, res) {});
farmRouter.post('/bins', fcnsDB.addBin);
app.use('/farmer', farmRouter);

// Contracts
contractRouter.get('/test2', require('./routes/contract/requestContract').requestContractWheat);

app.use('/contract', contractRouter);

module.exports = app;
