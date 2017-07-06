const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

passport.authenticationMiddleware = function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}


router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});


router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }else{
        console.log("user");
        res.redirect('/user');
        }
    });
});

router.get('/user',passport.authenticationMiddleware(),
(req, res) => {
  res.render('users');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    // req.session.save((err) => {
    //     if (err) {
    //         return next(err);
    //     }
    res.redirect('/');
    // }
    );
});

module.exports = router;