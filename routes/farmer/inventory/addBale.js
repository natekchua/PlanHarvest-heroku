const connector = require('../../../local.js');
const pool = connector.getPool();

const addBale = (req, res) => {
  const { baleType, fieldID, storageID, grade } = req.body;
  let ID;
  console.log(baleType);

  if (baleType != ('hay'||'straw') || storageID!=null ) {
    pool.query('insert into product (Grade, FieldID) VALUES($1, $2) RETURNING productid', [grade, fieldID], (error, results) => {
      if (error) {
        console.log(error);
      }

      ID = results.rows[0].productid;
      console.log(results);

      pool.query('insert into bale (ProductID, BaleType, ShedID ) VALUES($1, $2, $3)', [ID, baleType, storageID], (error, results) => {
        if (error) {
          console.log(error);
        }

        console.log(results);
        console.log('added ${baleType}');
        res.status(200);
        res.end();
      });
    });
  } else {
    console.log('failed to add bale');
    res.status(500);
    res.end();
  }
};

module.exports = { addBale };
