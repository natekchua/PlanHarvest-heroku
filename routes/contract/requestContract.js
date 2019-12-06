//@CustomerID, @ContractID, @FarmID, @Startdate, @DeliverByDate, @FarmOrCustAct, @numLoadsWheat, @numLoadsBarley, @numLoadsCanola, @numLoadsBale

const connector = require('../../local.js');
const pool = connector.getPool();

const requestContractCanola = (req, res) => {
  const {customerID, farmID, grade, type, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
  pool.query('SELECT COUNT(*) FROM Product as p, Canola as c WHERE p.grade=$1 and p.productid=c.productid and p.ProductID not in (select fp.ProductID from For_prod as fp where fp.ProductID = p.ProductID group by fp.productid)', [grade], (error, results) => {
        if (error) {
            console.log(error);
        }
      console.log(results.rows[0].count);
    console.log(grade);
        if (results.rows[0].count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, productgrade, deliverByDate, numOfLoads, productType) \
          VALUES($1, $2, $3, $4, $5, $6) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads, type], (error, results) => {
                let contractID = results.rows[0].contractid;

            console.log(contractID);
            console.log(numLoads);
                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT $1, c.ProductID \
                FROM Canola as c \
                WHERE c.ProductID not in (select productid from For_prod) limit $2', [contractID, numLoads], (error, results) => {
                });
            });
        }
        res.status(200).json(results);
        res.end();
    });
};

const requestContractWheat = (req, res) => {
  const {customerID, farmID, grade, type, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
  pool.query('SELECT COUNT(*) FROM Product as p, Wheat as c WHERE p.grade=$1 and p.productid=c.productid and p.ProductID not in (select fp.ProductID from For_prod as fp where fp.ProductID = p.ProductID group by fp.productid)', [grade], (error, results) => {
        if (error) {
            console.log(error);
        }
      console.log(results.rows[0].count);
    console.log(grade);
        if (results.rows[0].count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, productgrade, deliverByDate, numOfLoads, productType) \
          VALUES($1, $2, $3, $4, $5, $6) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads, 'wheat'], (error, results) => {
                let contractID = results.rows[0].contractid;

            console.log(contractID);
            console.log(numLoads);
                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT $1, c.ProductID \
                FROM Wheat as c \
                WHERE c.ProductID not in (select productid from For_prod) limit $2', [contractID, numLoads], (error, results) => {
                });
            });
        }
        res.status(200).json(results);
        res.end();
    });
};
const requestContractBarley = (req, res) => {
  const {customerID, farmID, grade, type, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
  pool.query('SELECT COUNT(*) FROM Product as p, Barley as c WHERE p.grade=$1 and p.productid=c.productid and p.ProductID not in (select fp.ProductID from For_prod as fp where fp.ProductID = p.ProductID group by fp.productid)', [grade], (error, results) => {
        if (error) {
            console.log(error);
        }
      console.log(results.rows[0].count);
    console.log(grade);
        if (results.rows[0].count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, productgrade, deliverByDate, numOfLoads, productType) \
          VALUES($1, $2, $3, $4, $5, $6) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads, 'barley'], (error, results) => {
                let contractID = results.rows[0].contractid;

            console.log(contractID);
            console.log(numLoads);
                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT $1, c.ProductID \
                FROM Barley as c \
                WHERE c.ProductID not in (select productid from For_prod) limit $2', [contractID, numLoads], (error, results) => {
                });
            });
        }
        res.status(200).json(results);
        res.end();
    });
};

const requestContractBale = (req, res) => {
  const {customerID, farmID, grade, type, deliverByDate, numLoads} = req.body;
    // Query gets the count of all available wheat products
  pool.query('SELECT COUNT(*) FROM Product as p, Bale as c WHERE p.grade=$1 and p.productid=c.productid and p.ProductID not in (select fp.ProductID from For_prod as fp where fp.ProductID = p.ProductID group by fp.productid)', [grade], (error, results) => {
        if (error) {
            console.log(error);
        }
      console.log(results.rows[0].count);
    console.log(grade);
        if (results.rows[0].count < numLoads) {

        } else { //Query creates contract and returns ContractID
            pool.query('INSERT INTO Contract \
          (customerID, farmID, productgrade, deliverByDate, numOfLoads, productType) \
          VALUES($1, $2, $3, $4, $5, $6) RETURNING ContractID', [customerID, farmID, grade, deliverByDate, numLoads, 'bale'], (error, results) => {
                let contractID = results.rows[0].contractid;

            console.log(contractID);
            console.log(numLoads);
                pool.query(' INSERT INTO For_prod(ContractID, ProductID) \
                SELECT $1, c.ProductID \
                FROM Bales as c \
                WHERE c.ProductID not in (select productid from For_prod) limit $2', [contractID, numLoads], (error, results) => {
                });
            });
        }
        res.status(200).json(results);
        res.end();
    });
};

module.exports = { requestContractCanola, requestContractWheat, requestContractBarley, requestContractBale };
