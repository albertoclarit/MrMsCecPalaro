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

var cookieParser = require('cookie-parser');
var csurf = require('csurf');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/images',express.static('images')); // create a static link for /images butangan sa pics sa candidates
app.use(express.static('./build'));  // create a static link for build folder created by react-create-app
app.use(cookieParser());

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    res.status(403)
    res.send('Wrong CSRF Value: Expected '  + req.csrfToken());
});

app.use(session({
    store: new FileStore(),
    secret: 'iloveu',
    resave: false,
    saveUninitialized: true/*,
     cookie: { maxAge: (1000 * 60) }*///expires: new Date(Date.now() + (1000 * 60))
}));

app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

app.use(passport.initialize());
app.use(passport.session());




<<<<<<< HEAD
=======




    // handle CSRF token errors here
    res.status(403)
    res.send('Wrong CSRF Value: Expected '  + req.csrfToken());
});

app.use(session({
    store: new FileStore(),
    secret: 'iloveu',
    resave: false,
    saveUninitialized: true/*,
     cookie: { maxAge: (1000 * 60) }*///expires: new Date(Date.now() + (1000 * 60))
}));

app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});


app.use(passport.initialize());
app.use(passport.session());








>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
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

// authentication code
// =========

passport.use(new LocalStrategy({
        usernameField: 'j_username',
        passwordField: 'j_password'
    },
    function(username, password, done) {
        var Judge=  db.Judge;
        Judge.findOne({
            where: {
                judgeNo: username,
                password:password
            }
        }).then(function(judge){
            judge.password='';
            done(null,judge);

        }).catch(function(err){
            done(err,false);
        });

    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    var Judge=  db.Judge;
    Judge.findById(id).then(function(judge){

        judge.password='';
        done(null,judge);

    }).catch(function(err){
        done(err,false);
    });

});



//==========

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        res.sendStatus(401);
}



passport.use(new LocalStrategy({
        usernameField: 'j_username',
        passwordField: 'j_password'
    },
    function(username, password, done) {
        var Judge=  db.Judge;
        Judge.findOne({
            where: {
                judgeNo: username,
                password:password
            }
        }).then(function(judge){

            if(judge==null)
            {
                done(null,false);
            }
            else {
                judge.password='';
                done(null,judge);
            }


        }).catch(function(err){
            done(err,false);
        });

    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    var Judge=  db.Judge;
    Judge.findById(id).then(function(judge){

        judge.password='';
        done(null,judge);

    }).catch(function(err){
        done(err,false);
    });

});



//==========

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        res.sendStatus(401);
}



// rest endpoints
var api= require('./api')(passport);
app.use('/api', api);

var judges = require('./judges')(db.Judge);
app.use('/api/judges',ensureAuthenticated,judges);

var candidates = require ('./candidates')(db.Candidate);
app.use('/api/candidates',ensureAuthenticated,candidates);

<<<<<<< HEAD
var candidates = require ('./candidates')(db.Candidate);

app.use('/api/candidates',candidates);


=======

// end rest endpoints
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
