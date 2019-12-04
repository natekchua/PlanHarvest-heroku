//@CustomerID, @ContractID, @FarmID, @Startdate, @DeliverByDate, @FarmOrCustAct, @numLoadsWheat, @numLoadsBarley, @numLoadsCanola, @numLoadsBale

const connector = require('./local.js');
const pool = connector.getPool();

const requestContractWheat = (req, res) => {
    pool.query('SELECT COUNT(*) FROM Wheat as w WHERE not w.ProductID in For_prod ', (error, results) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json(results.rows);
      res.end();
    });
};

const requestContractBarley = (req, res) => {
    
}

const requestContractCanola = (req, res) => {

}

const requestContractHay = (req, res) => {

}

const requestContractStraw = (req, res) => {

}


module.exports = {requestContractWheat};