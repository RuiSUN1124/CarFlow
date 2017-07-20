const express = require('express');
const passport = require('passport');
const router = express.Router();
User = require('../models/user');
Device = require('../models/device');
Gate = require('../models/gate');
Record = require('../models/record');

passport.authenticationMiddleware = function authenticationMiddleware () {  
  return function (req, res, next) {
      console.log('!!');
    if (req.isAuthenticated()) {
      return next();
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
        res.redirect('/user/'+req.user.username);
        }
    });
});

router.get('/user/:username',passport.authenticationMiddleware(),
(req, res) => {
  res.render('users',{
      username : req.user.username
  });
});

router.get('/logout', (req, res, next) => {
    req.logout();

    res.redirect('/');
});

// router.get('/device',passport.authenticationMiddleware(),(req,res)=>{
//     Device.DeviceOp.findAll((err,data_all_json)=>{
//         if(err){
//             console.log('Device GET error');
//         }else{
//             res.json(data_all_json);
//         }
//     });   
// });
module.exports = router;