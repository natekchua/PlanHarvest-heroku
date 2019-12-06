const connector = require('../../local.js');
const pool = connector.getPool();

const viewContractsFarmerSide = (req, res) => {
    const { farmerid } = req.body;

    pool.query('SELECT * FROM Contract WHERE FarmerID=$1 ORDER BY FarmerID ASC', [farmerid], (error, results) => {
        if (error) {
            console.log(error);
        }
        // console.log(results.rows[0]);
        res.status(200).json(results.rows);
        res.end();
    });
};

module.exports = { viewContracts };