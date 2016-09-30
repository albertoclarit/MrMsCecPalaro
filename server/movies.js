/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();


module.exports = function (Movie) {


    // get the list of movie
    router.get('/', function(req, res,next) {

        Movie.findAll().then(function(movies){
            res.json(movies);
        }).catch(function(error){
            res.status(404);
        });


    });


    // save a new movie
    router.post('/', function(req, res,next) {

        Movie.create(req.body).then(function(movie) {
            res.status(201).json(movie);
        }).catch(function(error){
            res.sendStatus(500);
        });

    });

    // find one movie
   
    router.get('/:id', function(req, res,next) {

        Movie.findById(req.params.id).then(function(movie){
            if(movie==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(movie);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    // save one movie
    
    router.put('/:id', function(req, res,next) {

        Movie.findById(req.params.id).then(function(movie){
            if(movie==null)
            {
                res.sendStatus(404);
                next();
            }

            movie.updateAttributes(req.body).then(function(movie) {
                res.status(200).json(movie);
            }).catch(function(error){
                res.sendStatus(500);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });


    router.delete('/:id', function(req, res,next) {

        Movie.findById(req.params.id).then(function(movie){
            if(movie==null)
            {
                res.sendStatus(404);
                next();
            }

            movie.destroy().then(function(movie) {
                res.status(200).json(movie);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });


    return router;
};

