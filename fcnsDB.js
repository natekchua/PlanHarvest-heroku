// const connector = require('./local.js');
const connector = require('./connectDB.js');
connector.initDB();

const pool = connector.getPool();

// test fcn now
const test = (request, response) => {
  pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


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

/////////////////////////////////////////////////////////////////////////////
//
// Farm Relation Functions
//
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

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const getFarms = (request, response) => {
  pool.query('SELECT * FROM FARM ORDER BY FarmID ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const getFarmByID = (request, response) => {
  const FarmID = parseInt(request.params.id);

  pool.query('SELECT * FROM FARM WHERE FarmID = $1', [FarmID], (error, results) => {
    if (error) {
      throw error;
    };
    response.status(200).json(results.rows);
  });
};

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const addFarm = (request, response) => {
  const { FarmID, OfficeLocation } = request.body;

  pool.query('INSERT INTO FARM (FarmID, OfficeLocation) VALUES ($1, $2)', [FarmID, OfficeLocation], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${result.insertId}`);
  });
};

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const editFarm = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteFarm = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
/////////////////////////////////////////////////////////////////////////////
//
// Customer Relation Functions
//

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

module.exports = { test, newFarm, getFarms, getFarmByID, addFarm, editFarm, deleteFarm, createTables, initFarms };
