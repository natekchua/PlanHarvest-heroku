// const connector = require('./local.js');
const connector = require('./connectDB.js');
connector.initDB();

const pool = connector.getPool();

// test fcn now
const test = (req, res) => {
  pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

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
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  };
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
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  };
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
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  };
};

/////////////////////////////////////////////////////////////////////////////
//
// Farm Relation Functions
//
// should the request parameter be used?

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const getFarms = (req, res) => {
  pool.query('SELECT * FROM FARM ORDER BY FarmID ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

const getFarmByID = (req, res) => {
  const FarmID = parseInt(req.params.id);

  pool.query('SELECT * FROM FARM WHERE FarmID = $1', [FarmID], (error, results) => {
    if (error) {
      throw error;
    };
    res.status(200).json(results.rows);
    res.end();
  });
};

const addFarm = (req, res) => {
  //const { FarmID, OfficeLocation } = req.body;
  const OfficeLocation = "jeremystestforreturning"
  pool.query('INSERT INTO FARM (OfficeLocation) VALUES ($1) RETURNING FarmID', [OfficeLocation], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      // throw error;
    }
    res.status(201).send({ status: 'Farm Added Successfully', result: results.row[0] });
    res.end();
  });
};

/*
const editFarm = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteFarm = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};
*/
/////////////////////////////////////////////////////////////////////////////
//
// Field Relation Functions
//
const getFields = (req, res) => {
  pool.query('SELECT * FROM FIELD ORDER BY FieldID ASC', (error, results) => {
    if (error) {
      res.status(400).json({ error });
      // throw error;
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

const getFieldByID = (req, res) => {
  const FielID = parseInt(req.params.id);

  pool.query('SELECT * FROM FIELD WHERE FieldID = $1', [FieldID], (error, results) => {
    if (error) {
      // throw error;
      console.error(error);
      res.status(400).json({ error });
    };
    res.status(200).json(results.rows);
    res.end();
  });
};

const addField = (req, res) => {
  const { FieldID, FarmID, Location, FieldSize } = req.body;

  pool.query('INSERT INTO FIELD (FieldID, FarmID, Location, FieldSize) VALUES ($1, $2, $3, $4)', [FieldID, FarmID, Location, FieldSize], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      // throw error;
    }
    res.status(201).send({ status: 'Field Added Successfully', result: results.row[0] });
  });
};

/////////////////////////////////////////////////////////////////////////////
//
// Bin Relation Functions
//
const getBins = (req, res) => {
  pool.query('SELECT * FROM BIN ORDER BY BinID ASC', (error, results) => {
    if (error) {
      res.status(400).json({ error });
      // throw error;
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

const getBinByID = (req, res) => {
  let BinID = parseInt(req.params.id);

  pool.query('SELECT * FROM BIN WHERE BinID = $1', [BinID], (error, results) => {
    if (error) {
      // throw error;
      console.error(error);
      res.status(400).json({ error });
    };
    res.status(200).json(results.rows);
    res.end();
  });
};

/* another method of getting by id
// https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
function lookupBin(req, res, next) {
let BinID = parseInt(req.params.id);
pool.query('SELECT * FROM BIN WHERE BinID = $1', [BinID], (error, results) => {
if (error) {
// throw error;
console.error(error);
res.status(400).json({ error });
}

// no results
if (results.rows.length === 0) {
// We are able to set the HTTP status code on the res object
res.statusCode = 404;
return res.json({ errors: ['Bin not found'] });
}
res.status(200).json(results.rows);
// req.json = results.rows[0];
// res.end();
next();
});
}
*/

const addBin = (req, res) => {
  const { BinID, volumetricCapacity, FieldID, Location } = req.body;

  pool.query('INSERT INTO BIN (BinID, volumetricCapacity, FieldID, Location) VALUES ($1, $2, $3, $4)', [BinID, volumetricCapacity, FieldID, Location], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      // throw error;
    }
    res.status(201).send({ status: 'Bin Added Successfully', result: results.row[0] });
    res.end();
  });
};

const addBarley = (req, res) => {
  const { FieldID, FarmID, Location, FieldSize } = req.body;

  pool.query('INSERT INTO FIELD (FieldID, FarmID, Location, FieldSize) VALUES ($1, $2, $3, $4)', [FieldID, FarmID, Location, FieldSize], (error, results) => {
    if (error) {
      res.status(500).json({ error });
      // throw error;
    }
    res.status(201).send({ status: 'Field Added Successfully', result: results.row[0] });
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
  getFarms,
  getFarmByID,
  addFarm,
  // editFarm,
  // deleteFarm,
  getFields,
  getFieldByID,
  addField,
  getBins,
  getBinByID,
  addBin,
  initFarms,
  initFields,
  initBins
};
