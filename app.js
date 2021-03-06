//index

var users = require('./routes/users');
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
var flash = require('connect-flash');
var session = require('express-session');
//TODO: 
//      var users?
var routes = require('./routes/index');
var app = express();

//mongoose?
mongoose.createConnection('mongodb://localhost:27017/CarflowData');
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'sss',
    resave: false,
    saveUninitialized: true,
    cookie : { secure : false, maxAge : (4 * 100 *100  * 1000) },
} ));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//routes
app.use('/',routes);

//passport config
var UserModule = require('./models/user');
var User = UserModule.UserModel;

// passport.serializeUser(User.serializeUser());

// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
console.log("Store session");
  done(null, user.username);
});

passport.deserializeUser(function(username_d, done) {
    
console.log("Find session");
  User.find({username:username_d}, function(err, user) {
      if(err){
          return done(err);
      }    
    done(err, user);
  });
});


passport.use(new LocalStrategy((username,password,done)=>{
    console.log('local');
    User.findOne({username:username},(err,user)=>{
      if (err) { return done(err); }
      if (!user) {
         console.log('usrname no');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.password === password)) {
          console.log('pwd no');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);  
    });
    }
));

passport.authenticationMiddleware = function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }
}

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

