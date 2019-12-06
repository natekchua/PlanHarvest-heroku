//@CustomerID, @ContractID, @FarmID, @Startdate, @DeliverByDate, @FarmOrCustAct, @numLoadsWheat, @numLoadsBarley, @numLoadsCanola, @numLoadsBale

const connector = require('../../local.js');
const pool = connector.getPool();

const requestContractWheat = (req, res) => {
    const {CustomerID, FarmID, Startdate, DeliverByDate, numLoads} = req.body

    pool.query('SELECT COUNT(*) FROM Wheat as w WHERE not w.ProductID in For_prod ', (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.rows.count < numLoads) {
          
      } else {
        pool.query(' INSERT INTO For_prod() \
        SELECT TOP @numLoadsWheat \
        w.ProductID \
            FROM Wheat as w \
            WHERE not w.ProductID  in For_prod; \
        ', [], (error, results) => {

        })
      }


      res.status(200).json(results);
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