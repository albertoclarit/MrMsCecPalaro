/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();
var co = require('co')


module.exports = function (Judge,Confirmation) {


    // get the list of judge
    router.get('/', function(req, res,next) {

        Judge.findAll({
          order:[
            ['event','ASC']
          ]
        }).then(function(judges){
            res.json(judges);
        }).catch(function(error){
            res.status(404);
        });


    });


    // save a new judge
    router.post('/', function(req, res,next) {

      co(function *() {
        var judge = yield Judge.create(req.body)

        var confirmation = yield Confirmation.create({
          judgeNo: judge.judgeNo,
          event: judge.event,
          swimsuit: false,
          interview: false,
          talent: false, 
          gown: false,
          production: false,
          f_interview: false,
          f_poise: false,
        })

        console.log(judge);
        return judge
      }).then(function (judge) {
        res.status(200).json(judge)
      }).catch(function (err) {
        res.sendStatus(500)
      })

        // Judge.create(req.body).then(function(judge) {
        //     res.status(201).json(judge);
        // }).catch(function(error){
        //     res.sendStatus(500);
        // });

    });

    // find one judge
    router.get('/:id', function(req, res,next) {

        Judge.findById(req.params.id).then(function(judge){
            if(judge==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(judge);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    // save one judge
    router.put('/:id', function(req, res,next) {

        Judge.findById(req.params.id).then(function(judge){
            if(judge==null)
            {
                res.sendStatus(404);
                next();
            }

            judge.updateAttributes(req.body).then(function(judge) {
                res.status(200).json(judge);
            }).catch(function(error){
                res.sendStatus(500);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });


    router.delete('/:id', function(req, res,next) {

        Judge.findById(req.params.id).then(function(judge){
            if(judge==null)
            {
                res.sendStatus(404);
                next();
            }

            judge.destroy().then(function(judge) {
                res.status(200).json(judge);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });


    return router;
};
