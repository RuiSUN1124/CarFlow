const express = require('express');
const passport = require('passport');
const router = express.Router();
User = require('../models/user');
Device = require('../models/device');
Gate = require('../models/gate');
Record = require('../models/record');

passport.authenticationMiddleware = function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
}

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user, error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/user/' + req.user.username);
        }
    });
});

router.get('/user/:username', passport.authenticationMiddleware(),
    (req, res) => {
        res.render('users', {
            username: req.user.username
        });
    });

router.get('/logout', (req, res, next) => {
    req.logout();

    res.redirect('/');
});
//carflow

//device
router.get('/device', passport.authenticationMiddleware(), (req, res) => {
    Device.DeviceOp.findAll((err, data_all_json) => {
        if (err) {
            console.log('Device GET error');
        } else {
            res.json(data_all_json);
        }
    });
});
//ANOTHER METHOD
// router.get('/device', passport.authenticationMiddleware(), (req, res) => {
//     Device.DeviceModel.find({  }, '-_id -__v', (err, data_all) => {
//         if (err) { console.log('DEVICE GET  error'); } else {
//             res.json(data_all);
//         }
//     });
// });

router.get('/device/:id', passport.authenticationMiddleware(), (req, res) => {
    Device.DeviceModel.find({ 'deviceId': req.params.id }, '-_id -__v', (err, data_id) => {
        if (err) { console.log('DEVICE GET ID error'); } else {
            res.json(data_id);
        }
    });
});
router.delete('/device/:id', passport.authenticationMiddleware(), (req, res) => {
    Device.DeviceModel.remove({ 'deviceId': req.params.id }, function (err, result) {
        if (err) {
            conosle.log(err);
        } else {
            //res.redirect('/device');
            res.json({ redirect: '/device' });
        }
    });
});

router.post('/device', passport.authenticationMiddleware(), (req, res) => {
    if (req.body) {
        console.log(req.body);
    }
    Device.DeviceOp.save(req.body, (err) => {
        if (err) {
            res.json({ de: 'ddd' });
        } else {
            res.json(req.body);
        }
    });
})

router.put('/device/:id', (req, res) => {
    Device.DeviceModel.findOneAndUpdate({ deviceId: req.params.id }
        , {
            $set: {
                deviceId: req.body.deviceId,
                type: req.body.type,
                location: req.body.location,
                belongGate: req.body.belongGate,
                roadName: req.body.roadName,
                setTime: req.body.setTime
            }
        }, {
            new: true
        })
        .then(device => res.json(device))
        .catch(err => res.json(err))
})
//gate

// router.get('/gate', passport.authenticationMiddleware(), (req, res) => {
//     Gate.GateOp.findAll((err, data_all_json) => {
//         if (err) {
//             console.log('Gate GET error');
//         } else {
//             res.json(data_all_json);
//         }
//     });
// });

router.get('/gate', passport.authenticationMiddleware(), (req, res) => {
    Gate.GateModel.find({}, '-_id -__v', (err, data_id) => {
        if (err) { console.log('Gate GET ID error'); } else {
            res.json(data_id);
        }
    });
});
router.get('/gate/:id', passport.authenticationMiddleware(), (req, res) => {
    Gate.GateModel.find({ 'gateId': req.params.id }, '-_id -__v', (err, data_id) => {
        if (err) { console.log('Gate GET ID error'); } else {
            res.json(data_id);
        }
    });
});
router.delete('/gate/:id', passport.authenticationMiddleware(), (req, res) => {
    Gate.GateModel.remove({ 'gateId': req.params.id }, function (err, result) {
        if (err) {
            conosle.log(err);
        } else {
            res.redirect('/gate');
            //res.json();
        }
    });
});

router.post('/gate', passport.authenticationMiddleware(), (req, res) => {
    if (req.body) {
        console.log(req.body);
    }
    Gate.GateOp.save(req.body, (err) => {
        if (err) {
            res.json({ err: 'error' });
        } else {
            res.json(req.body);
        }
    });
})

router.put('/gate/:id', (req, res) => {
    Gate.GateModel.findOneAndUpdate({ gateId: req.params.id }
        , {
            $set: {
                gateId: req.body.gateId,
                type: req.body.type,
                location: req.body.location,
                roadName: req.body.roadName,
                setTime: req.body.setTime
            }
        }, {
            new: true
        })
        .then(gate => res.json(gate))
        .catch(err => res.json(err))
})

//record
router.get('/record', passport.authenticationMiddleware(), (req, res) => {
    Record.RecordModel.find({}, '-_id -__v', (err, data_id) => {
        if (err) { console.log('Record GET ID error'); } else {
            res.json(data_id);
        }
    });
});

router.get('/record/:id', passport.authenticationMiddleware(), (req, res) => {
    Record.RecordModel.find({ 'repaireId': req.params.id }, '-_id -__v', (err, data_id) => {
        if (err) { console.log('Record GET ID error'); } else {
            res.json(data_id);
        }
    });
});
router.delete('/record/:id', passport.authenticationMiddleware(), (req, res) => {
    Record.RecordModel.remove({ 'repaireId': req.params.id }, function (err, result) {
        if (err) {
            conosle.log(err);
        } else {
            //res.redirect('/device');
            res.json({ redirect: '/record' });
        }
    });
});

router.post('/record', passport.authenticationMiddleware(), (req, res) => {
    if (req.body) {
        console.log(req.body);
    }
    Device.DeviceOp.save(req.body, (err) => {
        if (err) {
            res.json({ err: 'error' });
        } else {
            res.json(req.body);
        }
    });
})

router.put('/record/:id', (req, res) => {
    Record.RecordModel.findOneAndUpdate({ repaireId: req.params.id }
        , {
            $set: {
                repaireId: req.body.repaireId,
                timeRepaire: req.body.timeRepaire,
                type: req.body.type,
                roadName: req.body.roadName,
                content: req.body.content
            }
        }, {
            new: true
        })
        .then(record => res.json(record))
        .catch(err => res.json(err))
})
//user
router.get('/user', passport.authenticationMiddleware(), (req, res) => {
    User.UserModel.find({}, '-_id -__v', (err, data_id) => {
        if (err) { console.log('Record GET ID error'); } else {
            res.json(data_id);
        }
    });
});

router.get('/user/:id', passport.authenticationMiddleware(), (req, res) => {
    User.User.find({ 'userId': req.params.id }, '-_id -__v', (err, data_id) => {
        if (err) { console.log('USER GET ID error'); } else {
            res.json(data_id);
        }
    });
});
router.delete('/user/:id', passport.authenticationMiddleware(), (req, res) => {
    User.UserModel.remove({ 'userId': req.params.id }, function (err, result) {
        if (err) {
            conosle.log(err);
        } else {
            //res.redirect('/user');
            res.json({redirect: '/user'});
        }
    });
});

router.post('/user', passport.authenticationMiddleware(), (req, res)=>{
    if(req.body){
    console.log(req.body);}
    User.UserOp.save(req.body,(err)=>{
        if(err){
            res.json({err:'error'});
        }else{
            res.json(req.body);
        }
    });
})

router.put('/user/:id',(req,res) => {
  User.UserModel.findOneAndUpdate({ userId : req.params.id}
       ,{ $set : { username: req.body.username,
         password : req.body.password,
         userId : req.body.userId,
         //userlevel?
         city : req.body.city,
         districvt : req.body.district
        }
         },{
           new : true
         })
       .then(user => res.json(user))
       .catch(err => res.json(err))
})
module.exports = router;