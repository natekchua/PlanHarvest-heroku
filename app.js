require('./connectDB').initDB();

var pool = require('./connectDB').getPool();

const express = require('express');

var app = express();

app.get('/', function (req, res) {
    pool.query('select now();', [], (err, result) =>{
        done();
        if(err){
            console.error(`query error:${err.message}`)
        }
        else{
            res.body = `Query success, data is: ${result.rows[0].now}`;
            // console.log(`Query success, data is: ${result.rows[0].now}`);
        }
    });
});

var server = app.listen(process.env.PORT || 8080, function () {
    console.log("App now running on address: ", server.address());
});
