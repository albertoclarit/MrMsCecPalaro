/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();


module.exports = function (Candidate) {


    // get the list of judge
    router.get('/', function(req, res,next) {

        Candidate.findAll().then(function(candidates){
            res.json(candidates);
        }).catch(function(error){
            res.status(404);
        });


    });


    // save a new judge
    router.post('/', function(req, res,next) {

        Candidate.create(req.body).then(function(candidate) {
            res.status(201).json(candidate);
        }).catch(function(error){
            res.sendStatus(500);
        });

    });

    // find one judge
   
    router.get('/:id', function(req, res,next) {

        Candidate.findById(req.params.id).then(function(candidate){
            if(candidate==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(candidate);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    // save one judge
    
    router.put('/:id', function(req, res,next) {

        Candidate.findById(req.params.id).then(function(candidate){
            if(judges==null)
            {
                res.sendStatus(404);
                next();
            }

            candidate.updateAttributes(req.body).then(function(candidate) {
                res.status(200).json(candidate);
            }).catch(function(error){
                res.sendStatus(500);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });


    router.delete('/:id', function(req, res,next) {

        Candidate.findById(req.params.id).then(function(candidate){
            if(candidate==null)
            {
                res.sendStatus(404);
                next();
            }

            candidate.destroy().then(function(candidate) {
                res.status(200).json(candidate);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });


    return router;
};

