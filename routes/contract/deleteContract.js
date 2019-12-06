const connector = require('../../local.js');
const pool = connector.getPool();

const deleteContract = (req, res) => {
    const { contractid } = req.body;

    pool.query('DELETE FROM Contract WHERE ContractID=$1', [contractid], (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results.rows[0]);
        res.status(200).json(contractid);
        res.end();
    });
};

module.exports = { deleteContract };