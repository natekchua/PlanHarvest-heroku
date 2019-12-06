const connector = require('../../../local.js');
const pool = connector.getPool();

const addGrain = (req, res) => {
  const { grainType, fieldID, storageID, grade, percentage, hasBad, hasBad2 } = req.body;
  let ID;

  // check that storage exists
  if ((grainType == 'wheat' || grainType == 'canola' || grainType == 'barley') && grade !== null) {
    pool.query('insert into product (Grade, FieldID) VALUES($1, $2) RETURNING productid', [grade, fieldID], (error, results) => {
      if (error) {
        console.log(error);
      }

      ID = results.rows[0].productid;

      pool.query('insert into grain (ProductID, BinID) VALUES($1, $2)', [ID, storageID], (error, results) => {
        if (error) {
          console.log(error);
        }

        if (grainType == 'wheat') {
          pool.query('insert into wheat (ProductID, ProteinPercentage, hasErgot) VALUES($1, $2, $3)', [ID, percentage, hasBad], (error, results) => {
            if (error) {
              console.log(error);
            }

            console.log('added wheat!');
            res.status(200);
            res.end();
          });
        } else if (grainType == 'canola') {
          pool.query('insert into canola (ProductID, GreensPercentage) VALUES($1, $2)', [ID, percentage], (error, results) => {
            if (error) {
              console.log(error);
            }

            console.log('added canola!');
            res.status(200);
            res.end();
          });

        } else if (grainType == 'barley') {
          pool.query('insert into barley (ProductID, isHulled, hasBlight) VALUES($1, $2, $3)', [ID, hasBad, hasBad2], (error, results) => {
            if (error) {
              console.log(error);
            }

            console.log('added barley!');
            res.status(200);
            res.end();
          });
        } else {
          console.log('failed to add grain');
          res.status(500);
          res.end();
        }
      });
    });
  } else {
    res.status(500);
    res.end();
  }
};

function deleteProd(prodID) {
  try {
    pool.query('delete from product where ProductID = $1', [productID], (error, results) => {
      if (error) {
        throw error;
      }
    });
  } catch (err) {
  }
}

module.exports = { addGrain };
