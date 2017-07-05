//index
var express =require('express');
//tools to handle path problems
var path = require('path');
//server side show its icon
var favicon  = require('serve-favicon');
//log module from express team
var logger  = require('morgan');
//cookie middleware
var cookieParser = require('cookie-parser');
//after cookieParser, it's bodyParser's turn to handle the request
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Login and anthentification
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//TODO: 
//      var users?
var routes = require('./routes/index');
var app = express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('views engine','jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('rui'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname,'public')));
//routes
app.use('/',routes);

//passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.UserModel.authenticate()));
passport.serializeUser(User.UserModel.serializeUser());
passport.deserializeUser(User.UserModel.deserializeUser());

//mongoose?
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(2333, function () {
  console.log('app is listening at port 2333');
});
module.exports = app;

