/**
 * Created by albertoclarit on 9/17/16.
 */
var express = require('express');

module.exports = function (passport) {

    var router = express.Router();

    router.get('/account',function(req, res) {


        if(!req.user){
            res.sendStatus(401);
        }
        else {
            var userResult = {};
            userResult.judgeNo = req.user.judgeNo;
            userResult.event = req.user.event;
            userResult.roles = [];

            if(userResult.judgeNo===999){
                userResult.roles.push('ROLE_ADMIN');
            }
            else {
                userResult.roles.push('ROLE_JUDGE');
            }


            res.json(userResult);
        }

    });


    router.get('/ping',function(req, res) {
        res.send('OK');
    });


    router.post('/authentication',  passport.authenticate('local'),function(req, res) {
        res.send('OK');
    });



    router.post('/logout', function(req, res) {
        req.logout();
        res.send("OK");
    });



    return router;

};
