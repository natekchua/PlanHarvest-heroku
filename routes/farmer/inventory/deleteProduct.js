const connector = require('../../../local.js');
const pool = connector.getPool();

const deleteProduct = (req, res) => {
  const productID = parseInt(req.params.id);

  pool.query('delete from product where ProductID = $1', [productID], (error, results) => {
    if (error) {
      res.status(500);
    }
    res.status(200);
    res.end();
  });
};
module.exports = { deleteProduct };
