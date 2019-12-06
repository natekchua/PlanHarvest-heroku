const connector = require('./local.js');
connector.initDB();

const pool = connector.getPool();

// test fcn now
const test = (req, res) => {
  pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
    res.end();
  });
};

function initFarms() {
  let insertQuery = 'INSERT INTO FARM(OfficeLocation) VALUES($1)';
  let values = [['Calgary, AB'], ['Saskaberia, SK'], ['Olds, AB'], ['Okotoks, AB'], ['MedicineHat, AB'], ['Drayton Valley, AB']];
  for (let i = 0; i < values.length; i++) {
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  }
}

// not inserting isRentedAway
function initFields() {
  let insertQuery = "INSERT INTO FIELD(FarmID, Location, FieldSize) VALUES($1, $2, $3)";
  const values = [
    [1, 'Coordinates', 20],
    [1, 'Coordinates', 30 ],
    [1, 'Coordinates', 38],
    [1, 'Coordinates', 124],
    [1, 'Coordinates', 67],
    [1, 'Coordinates', 23],
    [1, 'Coordinates', -23],
    [1, 'Coordinates', 100]
  ];
  for (let i = 0; i < values.length; i++ ) {
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  }
}

function initBins() {
  let insertQuery = "INSERT INTO BIN(FieldID, volumetricCapacity, Location) VALUES($1, $2, $3)";
  const values = [
    [1, 244, 'Coordinates'],
    [1, 244, 'Coordinates'],
    [1, 20, 'Coordinates'],
    [2, 120, 'Coordinates'],
    [2, 488, 'Coordinates'],
    [3, 64, 'Coordinates'],
    [3, 32, 'Coordinates'],
    [4, 137, 'Coordinates']
  ];
  for (let i = 0; i < values.length; i++ ) {
    pool.query(insertQuery, values[i], (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(results.rows[0]);
      }
    });
  }
}
//////////////////////////////////////////////////////////////////////////
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

module.exports = {
  test,
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
