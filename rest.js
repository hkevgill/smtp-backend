// load modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 2000;
var Email = require('./models/email');

mongoose.connect('mongodb://hkevgill:pass123@ds037145.mlab.com:37145/hkevgill');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// setup CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var apiRouter = express.Router();

apiRouter.get('/get_all', function (req, res) {
    Email.find({}, function (err, results) {
        res.json(results);
    });
});

apiRouter.get('/get_one', function (req, res) {
    Email.findOne({}, function (err, result) {
        res.json(result);
    });
});

app.use('/api', apiRouter);

// server
app.listen(port);
