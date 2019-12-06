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
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.listen(port, 'localhost', () => {
// app.listen(port, '192.168.1.3', () => {
app.listen(port, '10.13.169.154', () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
  console.log('Hi');
});

// authentication ----------------------------------------------------
authRouter.post('/addUser/customer', require('./routes/authentication/addCustomer').addCustomer);

authRouter.post('/addUser/farmer', require('./routes/authentication/addFarmer').addFarmer);

authRouter.get('/login/customer/:id/:password', require('./routes/authentication/loginCustomer').loginCustomer);

authRouter.get('/login/farmer/:id/:password', require('./routes/authentication/loginFarmer').loginFarmer);

app.use('/authentication', authRouter);

// farm --------------------------------------------------------------
farmRouter.get('/farms', require('./routes/farmer/getFarms').getFarms);

farmRouter.get('/farms/:id', require('./routes/farmer/getFarmByID').getFarmByID);

// farmer assets -----------------------------------------------------
// farmer dashboard
farmRouter.get('/assets/myFarm/:id', require('./routes/farmer/assets/myFarm').myFarm);

// field summary
farmRouter.get('/assets/fieldSummary/:id', require('./routes/farmer/assets/fieldSummary').fieldSummary);

// Returns a list of all farmer-owned fieldIDs.
farmRouter.get('/assets/fieldIDs/:id', require('./routes/farmer/assets/getFieldIDs').getFieldIDs);

// Returns a list of all farmer-owned bins.
farmRouter.get('/assets/binIDs/:id', require('./routes/farmer/assets/getBinIDs').getBinIDs);
// Returns a list of all farmer-owner bins and their attributes
farmRouter.get('/assets/bins/:id', require('./routes/farmer/assets/getBins').getBins);

// Returns a list of all farmer-owned sheds.
farmRouter.get('/assets/shedIDs/:id', require('./routes/farmer/assets/getShedIDs').getShedIDs);
// Returns a list of all farmer-owner bins and their attributes
farmRouter.get('/assets/sheds/:id', require('./routes/farmer/assets/getSheds').getSheds);

// add assets ----
// add bin
farmRouter.post('/assets/addBin/', require('./routes/farmer/assets/addBin').addBin);

// add shed
farmRouter.post('/assets/addShed/', require('./routes/farmer/assets/addShed').addShed);

// add field
farmRouter.post('/assets/addField/', require('./routes/farmer/assets/addField').addField);

app.use('/farmer', farmRouter);

// Inventory --------------------------------------------------------
// add grain
farmRouter.post('/inventory/addProduct/grain', require('./routes/farmer/inventory/addGrain').addGrain);

// add bale
farmRouter.post('/inventory/addProduct/bale', require('./routes/farmer/inventory/addBale').addBale);

// delete product
farmRouter.get('/inventory/deleteProduct/:id', require('./routes/farmer/inventory/deleteProduct').deleteProduct);

// display bin content summary
farmRouter.get('/assets/displayBin', require('./routes/farmer/assets/displayBin').displayBin);

// Contracts
contractRouter.post('/request/wheat', require('./routes/contract/requestContract').requestContractWheat);

contractRouter.post('/request/barley', require('./routes/contract/requestContract').requestContractBarley);

contractRouter.post('/request/canola', require('./routes/contract/requestContract').requestContractCanola);

contractRouter.post('/request/hay', require('./routes/contract/requestContract').requestContractHay);

contractRouter.post('/request/straw', require('./routes/contract/requestContract').requestContractStraw);

// delete contract
contractRouter.get('/delete/:id', require('./routes/contract/deleteContract').deleteContract);

contractRouter.get('/getCustomer/:id', require('./routes/contract/viewContractsContractorSide').viewContractsContractorSide);

contractRouter.get('/getFarmer/:id', require('./routes/contract/viewContractsFarmerSide').viewContractsFarmerSide);

app.use('/contract', contractRouter);

module.exports = app;
