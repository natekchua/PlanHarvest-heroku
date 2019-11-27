const express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 8080, function () {
    console.log("App now running on address: ", server.address());
});