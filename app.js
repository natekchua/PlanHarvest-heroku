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

// authentication ----------------------------------------------------
authRouter.post('/addUser/customer', require('./routes/authentication/addCustomer').addCustomer);

authRouter.post('/addUser/farmer', require('./routes/authentication/addFarmer').addFarmer);

authRouter.get('/login/customer/:id/:password', require('./routes/authentication/loginCustomer').loginCustomer);

authRouter.get('/login/farmer/:id/:password', require('./routes/authentication/loginFarmer').loginFarmer);

app.use('/authentication', authRouter);

// farm --------------------------------------------------------------
farmRouter.get('/farms', require('./routes/farmer/getFarms').getFarms);

farmRouter.get('/farms/:id', require('./routes/farmer/getFarmByID').getFarmByID);

// farmer dashboard
farmRouter.get('/assets/myFarm/:id', require('./routes/farmer/assets/myFarm').myFarm);

// field summary
farmRouter.get('/assets/fieldSummary/:id', require('./routes/farmer/assets/fieldSummary').fieldSummary);


// Returns a list of all farmer-owned fieldIDs.
farmRouter.get('/assets/fieldIDs/:id', require('./routes/farmer/assets/getFieldIDs').getFieldIDs);

// Returns a list of all farmer-owned bins.
farmRouter.get('/assets/binIDs/:id', require('./routes/farmer/assets/getBinIDs').getBinIDs);

// Returns a list of all farmer-owned sheds.
farmRouter.get('/assets/shedIDs/:id', require('./routes/farmer/assets/getShedIDs').getShedIDs);

//farmRouter.get('/assets/bins', fcnsDB.getBins);
//farmRouter.get('/assets/bins/:id', fcnsDB.getBinByID);
// farmRouter.delete('/bins/:id', fcnsDB.getBinByID, function(req, res) {});
farmRouter.post('/bins', fcnsDB.addBin);
app.use('/farmer', farmRouter);

// Inventory --------------------------------------------------------
farmRouter.post('/inventory/addProduct/grain', require('./routes/farmer/inventory/addGrain').addGrain);

// Contracts
contractRouter.get('/test2', require('./routes/contract/requestContract').requestContractWheat);

app.use('/contract', contractRouter);

module.exports = app;
