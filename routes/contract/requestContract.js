//@CustomerID, @ContractID, @FarmID, @Startdate, @DeliverByDate, @FarmOrCustAct, @numLoadsWheat, @numLoadsBarley, @numLoadsCanola, @numLoadsBale

const connector = require('../../local.js');
const pool = connector.getPool();

const requestContractWheat = (req, res) => {
    const {customerID, farmID, grade, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Wheat as w WHERE not w.ProductID and w.Grade=Grade in For_prod ', (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.rows.count < numLoads) {
          
      } else { //Query creates contract and returns ContractID
          pool.query('INSERT INTO Contract \
          (customerID, farmID, grade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads], (error, results) => {
              let contractID = results.rows[0].contractid;

              pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT TOP $1 w.ProductID, $2\
                FROM Wheat as w \
                WHERE not w.ProductID  in For_prod;) \
                \
                ', [numLoads, contractID], (error, results) => {

              })
          });

      }


      res.status(200).json(results);
      res.end();
    });
};

const requestContractBarley = (req, res) => {
    const {customerID, farmID, grade, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Barley as b WHERE not b.ProductID and b.Grade=$1 in For_prod',[grade], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, grade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads], (error, results) => {
                let contractID = results.rows[0].contractid;

                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT TOP $1 c.ProductID, $2\
                FROM Barley as b \
                WHERE not b.ProductID  in For_prod;) \
                \
                ', [numLoads, contractID], (error, results) => {

                })
            });

        }


        res.status(200).json(results);
        res.end();
    });
};

const requestContractCanola = (req, res) => {
    const {customerID, farmID, grade, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Canola as c WHERE not c.ProductID in For_prod and c.Grade=$1',[grade], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, grade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads], (error, results) => {
                let contractID = results.rows[0].contractid;

                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT TOP $1 c.ProductID, $2\
                FROM Canola as c \
                WHERE not c.ProductID  in For_prod;) \
                \
                ', [numLoads, contractID], (error, results) => {

                })
            });

        }


        res.status(200).json(results);
        res.end();
    });
};

const requestContractHay = (req, res) => {
    const {customerID, farmID, grade, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Hay as h WHERE not h.ProductID and h.Grade=$1 in For_prod',[grade], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, grade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads], (error, results) => {
                let contractID = results.rows[0].contractid;

                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT TOP $1 h.ProductID, $2\
                FROM Hay as h \
                WHERE not h.ProductID  in For_prod;) \
                \
                ', [numLoads, contractID], (error, results) => {

                })
            });

        }


        res.status(200).json(results);
        res.end();
    });
};

const requestContractStraw = (req, res) => {
    const {customerID, farmID, grade, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Straw as s WHERE not s.ProductID and s.Grade=$1 in For_prod ',[grade], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, grade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads], (error, results) => {
                let contractID = results.rows[0].contractid;

                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT TOP $1 s.ProductID, $2\
                FROM Straw as s \
                WHERE not s.ProductID  in For_prod;) \
                \
                ', [numLoads, contractID], (error, results) => {

                })
            });

        }


        res.status(200).json(results);
        res.end();
    });
};


module.exports = {requestContractWheat, requestContractBarley, requestContractCanola, requestContractHay, requestContractStraw};