const connector = require('./local.js');

const pool = connector.getPool();

function createTables() {
  pool.query("CREATE TABLE FARM(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
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
function initFarms() {
  let insertQuery = "INSERT INTO FARM(FarmID, OfficeLocation) VALUES($1, $2)";
  const values = [
    [128, 'Calgary, AB'],
    [129, 'Saskaberia, SK'],
    [130, 'Olds, AB'],
    [131, 'Okotoks, AB'],
    [132, 'MedicineHat, AB'],
    [133, 'Drayton Valley, AB'],
    [134, 'Nordegg, AB'],
    [135, 'Canmore, AB']
  ];
  for (let i = 0; i < values.length; i++ ) {
    pool.query(insertQuery, values[i], (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  };
  response.json({ info: 'There are now a bunch of farms' })
};

// should the request parameter be used?
function newFarm(request) {
  let insertQuery = "INSERT INTO FARM(FarmID, OfficeLocation) VALUES($1, $2)";
  const values = [127, 'Devon, AB'];

  pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}
const getFarms = (request, response) => {
  pool.query('SELECT * FROM FARM ORDER BY FarmID ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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

module.exports = { newFarm, getFarms, createTables, initFarms };
