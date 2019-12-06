const connector = require('../../local.js');
const pool = connector.getPool();

const viewProducts = (req, res) => {
    const productid = parseInt(req.params.id);

    pool.query('SELECT * FROM Product as p WHERE p.ProductID=$1 ORDER BY p.ProductID ASC', [productid], (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results.rows);
        res.status(200).json(results.rows);
        res.end();
    });
};

module.exports = { viewProducts };