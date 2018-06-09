"use strict";
//dependencies
const express = require('express'),
    routes = require('./routes.js'),
    mongoose = require('mongoose'),
    dbConfig = require(process.cwd() + '/config/database.js'),
    envConfig = require(process.cwd() + '/config/environment.js'),
    bodyParser = require('body-parser');

mongoose.connect(dbConfig.mongoConnectionString, function(err, res) {
    if (err) {
        console.error('Error connecting to MongoDB (MongoLab) ' + err.stack);
    } else {
        console.log('Successfully established connection with MongoLab');
    }
});

const app = express();
const router = express.Router();
try {
    routes.initRoutes(router);
} catch(err) {
    console.error("Error while initiating the application. Routing Error", err);
}

app.use(bodyParser.json({limit: '5mb', extended: true})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// NOTE: used for CORS
app.all('*', function(req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' === req.method) return res.send(200);
    next();
});

app.use('/', router);

app.use(express.static('public'));

app.listen(envConfig.port, function () {
    console.log('Server started and listening on port: ' + envConfig.port);
});
