const connector = require('./local.js');
// const connector = require('./connectDB.js');
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

// not inserting isRentedAway
function initFields() {
  let insertQuery = "INSERT INTO FIELD(FieldID, FarmID, Location, FieldSize) VALUES($1, $2, $3, $4)";
  const values = [
    [1, 128, 'Coordinates', 20],
    [2, 128, 'Coordinates', 30 ],
    [3, 128, 'Coordinates', 38],
    [4, 128, 'Coordinates', 124],
    [5, 128, 'Coordinates', 67],
    [6, 128, 'Coordinates', 23],
    [7, 128, 'Coordinates', -23],
    [8, 135, 'Coordinates', 100]
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
  response.json({ info: 'There are now a bunch of farms' });
};

function initBins() {
  let insertQuery = "INSERT INTO BIN(BinID, FieldID, volumetricCapacity, Location) VALUES($1, $2, $3, $4)";
  const values = [
    [10, 1, 244, 'Coordinates'],
    [20, 1, 244, 'Coordinates'],
    [30, 1, 20, 'Coordinates'],
    [40, 2, 120, 'Coordinates'],
    [50, 2, 488, 'Coordinates'],
    [60, 8, 64, 'Coordinates'],
    [70, 7, 32, 'Coordinates'],
    [80, 6, 137, 'Coordinates']
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
  response.json({ info: 'There are now a bunch of farms' });
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
    response.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

/*
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
*/
/////////////////////////////////////////////////////////////////////////////
//
// Field Relation Functions
//
const getFields = (request, response) => {
  pool.query('SELECT * FROM FIELD ORDER BY FieldID ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/////////////////////////////////////////////////////////////////////////////
//
// Bin Relation Functions
//
const getBins = (request, response) => {
  pool.query('SELECT * FROM BIN ORDER BY BinID ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
// INSERT INTO test VALUES (B'10'::bit(3), B'101');

/////////////////////////////////////////////////////////////////////////////
//
// Customer Relation Functions
//

//
//
//

/*
// test pool fcns
  pool.query("CREATE TABLE FARM(FarmID SERIAL PRIMARY KEY, OfficeLocation VARCHAR(60) NOT NULL, DateFounded DATE)", (err, res) => {
  console.log(err, res);
  // pool.end();
  });

let insertQuery = "INSERT INTO FARM(FarmID, OfficeLocation) VALUES($1, $2)";
const values = [125, 'Edmonton, AB'];

// callback
pool.query(insertQuery, values);

// async/await
try {
const res = await pool.query(text, values)
console.log(res.rows[0])
// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
} catch (err) {
console.log(err.stack)
}

  pool.query("INSERT INTO FARM(FarmID, OfficeLocation) VALUES(124, 'Leduc, AB')", (err, res) => {
  console.log(err, res);
  pool.end();
  });
*/

/*
  pool.end();
  console.log('pool has drained')
*/

module.exports = {
  test,
  newFarm,
  getFarms,
  getFarmByID,
  addFarm,
  // editFarm,
  // deleteFarm,
  getFields,
  getBins,
  createTables,
  initFarms,
  initFields,
  initBins
};
