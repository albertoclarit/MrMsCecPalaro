/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();
var co = require('co');

module.exports = function (sequelize,Score,Candidate,Judge) {

   router.get('/besttalentmale', function(req, res,next) {
 

    co(function *(){
      var candidates  =  yield Candidate.findAll({
           where:{
               gender:'M'
           }
      });

     var judges  =  yield Judge.findAll({
          where:{
               judgeNo: {
                   $ne: 999
               }
           },
          order: [       
                ['judgeNo', 'ASC']
          ]
      });

       
     var output = [];

       for(var c=0; c< candidates.length;c++){
              var candidate = candidates[c];
              var newItem = {};
                 newItem.name=candidate.name;
                 newItem.candidateNo=candidate.candidateNo;
                 newItem.judgeTotal = judges.length;

                    for(var j=0; j < judges.length;j++){
                        var judge  = judges[j];

                      
                         var talent = 
                          yield  sequelize.query("select talent from scores where candidateNo=? and judgeNo=? limit 1",
                           { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                            if(talent.length>0)
                             newItem["judge"+(j+1)] = talent[0];
                            else 
                             newItem["judge"+(j+1)] = {talent:0};

                    }

              output.push(newItem);
       }

    

    return output;
    
    }) .then(function(output){
         res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No talent record yet');
        });
     
  
    });


    router.get('/getScoresRecordWithCandidateName', function(req, res,next) {
 
        sequelize.query("select  t2.name, t1.* from scores t1, candidates t2 where t1.candidateNo=t2.candidateNo").spread(function(records, metadata) {
            res.status(200).json(records);
        })
    });


    // findbyjudgeandcandidate
    router.get('/getByJudgeAndCandidateAndGender', function(req, res,next) {

        var judgeno=req.query.judgeno;
        var candidateno=req.query.candidateno;
        var gender=req.query.gender;

        if(!judgeno || !candidateno || !gender){
            res.status(404).send('Please complete argument');
            return;
        }

        Score.findOrCreate({where: {
            'judgeNo':judgeno,
            'candidateNo':candidateno,
            'gender':gender
            }, defaults:
            {
                'judgeNo':judgeno,
                'candidateNo':candidateno,
                'gender':gender,
                talent:0,
                production:0,
                sportswear:0,
                formalWear:0,
                qa:0
            }
        }).
            spread(function(score,created){
                res.status(201).json(score);
        }).catch(function(error){
            res.status(404).send('No score record yet');
        });


    });


    // get the list of score
    router.get('/', function(req, res,next) {

        Score.findAll().then(function(scores){
            res.json(scores);
        }).catch(function(error){
            res.status(404);
        });


    });


    // save a new score
    router.post('/', function(req, res,next) {

        Score.create(req.body).then(function(score) {
            res.status(201).json(score);
        }).catch(function(error){
            res.sendStatus(500);
        });

    });

    // find one score
    router.get('/:id', function(req, res,next) {

        Score.findById(req.params.id).then(function(score){
            if(score==null)
            {
                res.sendStatus(404);
                next();
            }
            res.json(score);
        }).catch(function(error){
            res.sendStatus(404);
        });

    });

    // save one score
    router.put('/:id', function(req, res,next) {

        Score.findById(req.params.id).then(function(score){
            if(score==null)
            {
                res.sendStatus(404);
                next();
            }

            score.updateAttributes(req.body).then(function(score) {
                res.status(200).json(score);
            }).catch(function(error){
                res.sendStatus(500);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });


    });


    router.delete('/:id', function(req, res,next) {

        Score.findById(req.params.id).then(function(score){
            if(score==null)
            {
                res.sendStatus(404);
                next();
            }

            score.destroy().then(function(score) {
                res.status(200).json(score);
            });



        }).catch(function(error){
            res.sendStatus(404);
        });

    });


    return router;
};

