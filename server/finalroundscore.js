var express = require('express');
var router = express.Router();
var co = require('co')

module.exports = function(
   CoronationStatus,
   FinalroundCandidate,
   FinalroundScore,
   Candidate,
   Judge,
   Score,
   sequelize,
){

   // findbyjudgeandcandidate
   router.get('/getByJudgeAndCandidateAndGender', function(req, res,next) {

      var judgeno=req.query.judgeno;
      var candidateno=req.query.candidateno;
      var gender=req.query.gender;

      if(!judgeno || !candidateno || !gender){
          res.status(404).send('Please complete argument');
          return;
      }

      FinalroundScore.findOrCreate({where: {
          'judgeNo':judgeno,
          'candidateNo':candidateno,
          'gender':gender,
          }, defaults:
          {
              'judgeNo':judgeno,
              'candidateNo':candidateno,
              'gender':gender,
              interview:0,
              poise: 0,
          }
      }).
          spread(function(score,created){
              res.status(201).json(score);
      }).catch(function(error){
          res.status(404).send('No score record yet');
      });


  });


  router.put('/:id', function(req, res,next) {

    FinalroundScore.findById(req.params.id).then(function(score){
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

  router.get('/loadAllScoresByJudge',function (req,res,next) {
    var judgeNo=req.query.judgeNo;

    sequelize.query("select S.candidateNo as candidateNo, S.interview as interview, " +
      "S.poise as poise, C.name as name from finalroundscores S, finalroundcandidates C " +
      "where S.candidateNo = C.candidateNo and judgeNo= "+judgeNo)
        .spread(function(records, metadata) {
          res.status(200).json(records);
        }).catch((err) => {
          res.sendStatus(404)
        })

    
  })




  return router
}