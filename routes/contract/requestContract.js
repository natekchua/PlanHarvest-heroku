//@CustomerID, @ContractID, @FarmID, @Startdate, @DeliverByDate, @FarmOrCustAct, @numLoadsWheat, @numLoadsBarley, @numLoadsCanola, @numLoadsBale

const connector = require('../../local.js');
const pool = connector.getPool();

const requestContractWheat = (req, res) => {
    const {CustomerID, FarmID, Grade, StartDate, DeliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Wheat as w WHERE not w.ProductID and w.Grade=Grade in For_prod ', (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.rows.count < numLoads) {
          
      } else { //Query creates contract and returns ContractID
          pool.query('INSERT INTO Contract \
          (CustomerID, FarmID, ProductGrade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [CustomerID, FarmID, Grade, DeliverByDate, numLoads], (error, results) => {
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
    const {CustomerID, FarmID, Grade, StartDate, DeliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Barley as b WHERE not b.ProductID and b.Grade=Grade in For_prod ', (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (CustomerID, FarmID, ProductGrade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [CustomerID, FarmID, Grade, DeliverByDate, numLoads], (error, results) => {
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
    const {CustomerID, FarmID, Grade, StartDate, DeliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Canola as c WHERE not c.ProductID and c.Grade=Grade in For_prod ', (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (CustomerID, FarmID, ProductGrade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [CustomerID, FarmID, Grade, DeliverByDate, numLoads], (error, results) => {
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
    const {CustomerID, FarmID, Grade, StartDate, DeliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Hay as h WHERE not h.ProductID and h.Grade=Grade in For_prod ', (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (CustomerID, FarmID, ProductGrade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [CustomerID, FarmID, Grade, DeliverByDate, numLoads], (error, results) => {
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
    const {CustomerID, FarmID, Grade, StartDate, DeliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
    pool.query('SELECT COUNT(*) FROM Straw as s WHERE not s.ProductID and s.Grade=Grade in For_prod ', (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (CustomerID, FarmID, ProductGrade, deliverByDate, numOfLoads) \
          VALUES($1, $2, $3, $4, $5) RETURNING ContractID', [CustomerID, FarmID, Grade, DeliverByDate, numLoads], (error, results) => {
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


module.exports = {requestContractWheat};