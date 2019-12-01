const connector = require('./local.js');

const pool = connector.getPool();

function createTables() {
  pool.query("CREATE TABLE farm(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
    console.log(err, res);
  });

  /*
  pool.query("CREATE TABLE customer(CustomerID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
    console.log(err, res);
  });

  pool.query("CREATE TABLE product(ProductID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
    console.log(err, res);
  });

  pool.query("CREATE TABLE FARM(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
    console.log(err, res);
  });

  pool.query("CREATE TABLE FARM(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
    console.log(err, res);
  });
  */
}

// should the request parameter be used?
function newFarm(request) {
  let insertQuery = "INSERT INTO FARM(FarmID, OfficeLocation) VALUES($1, $2)";
  const values = [127, 'Devon, AB'];

  // callback
  pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

//
//
//
// test pool fcns
/*
  pool.query("CREATE TABLE FARM(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
  console.log(err, res);
  // pool.end();
  });
*/

/*
let insertQuery = "INSERT INTO FARM(FarmID, OfficeLocation) VALUES($1, $2)";
const values = [125, 'Edmonton, AB'];

// callback
pool.query(insertQuery, values);
*/

/*
// async/await
try {
const res = await pool.query(text, values)
console.log(res.rows[0])
// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
} catch (err) {
console.log(err.stack)
}
*/

/*
  pool.query("INSERT INTO FARM(FarmID, OfficeLocation) VALUES(124, 'Leduc, AB')", (err, res) => {
  console.log(err, res);
  pool.end();
  });
*/

/*
  pool.end();
  console.log('pool has drained')
*/

module.exports = { newFarm, createTables };
