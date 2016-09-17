/**
 * Created by albertoclarit on 8/5/16.
 */
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/images',express.static('images')); // create a static link for /images butangan sa pics sa candidates
app.use(express.static('./build'));  // create a static link for build folder created by react-create-app


var sequelize = new Sequelize('database', 'username', 'password',  {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    storage: './server/data/cecpalaro.db',
    define: {
        timestamps: false // true by default
    },
    logging: false
});

var db = require('./db')(sequelize);


// rest endpoints
var judges = require('./judges')(db.Judge);

app.use('/api/judges',judges);
// end rest endpoints

var candidates = require ('./candidates')(db.Candidate);

app.use('/api/candidates',candidates);


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
