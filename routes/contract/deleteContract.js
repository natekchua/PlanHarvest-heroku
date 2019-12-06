const connector = require('../../local.js');
const pool = connector.getPool();

const deleteContract = (req, res) => {
  const contractid = parseInt(req.params.id);

  pool.query('DELETE FROM Contract WHERE ContractID=$1', [contractid], (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200);

    pool.query('DELETE FROM for_prod WHERE ContractID=$1', [contractid], (error, results) => {
      if (error) {
        console.log(error);
      }
      res.status(200);
      res.end();
    });
  });
};

module.exports = { deleteContract };
