const connector = require('../../local.js');
const pool = connector.getPool();

const viewContractsFarmerSide = (req, res) => {
  const farmerid = parseInt(req.params.id);

    pool.query('SELECT * FROM Contract as c WHERE c.FarmID=$1 ORDER BY c.ContractID ASC', [farmerid], (error, results) => {
        if (error) {
            console.log(error);
        }
        // console.log(results.rows[0]);
        res.status(200).json(results.rows);
        res.end();
    });
};

module.exports = { viewContractsFarmerSide };
