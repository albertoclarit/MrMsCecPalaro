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

  router.get('/status',function (req,res,next) {
    CoronationStatus.find({
      where:{
        event: "Final"
      }
    }).then(function (final) {
        res.status(200).json(final)
    }).catch(function (err) {
        res.sendStatus(404)
    })
  })

  router.get('/startfinalround',function(req,res,next){

    co(function *(){

      var talentJudges  =  yield Judge.findAll({
          where:{
              judgeNo: {
                  $ne: 999
              },
              event: 'Talent'
          },
          order: [
              ['judgeNo', 'ASC']
          ]
      });

      var coronationJudges  =  yield Judge.findAll({
          where:{
              judgeNo: {
                  $ne: 999
              },
              event: 'Coronation'
          },
          order: [
              ['judgeNo', 'ASC']
          ]
      });

      var candidatesFemale  =  yield Candidate.findAll({
          where:{
              gender:'F'
          },
          order: [
              ['candidateNo', 'ASC']
          ]
      });


      var result={
         rankingfemale:[],
      };
       // after there is per judge property that list the score

      // ==================== get ranking for males ====================

      // ==================== get ranking for females ====================
      for(var c=0; c< candidatesFemale.length;c++) {
          var candidate = candidatesFemale[c];
          var newItem = {};
          newItem.name=candidate.name;
          newItem.candidateNo=candidate.candidateNo;

          var allaverage = [];
          try {

            coronationAllAverage = yield sequelize.query("select avg(production) as avg_production, " +
                   "  avg(swimsuit) as avg_swimsuit, " +
                   " avg(formalWear) as avg_formalWear, avg(qa) as avg_qa " +
                   "  from scores where candidateNo=?  and gender='F' and event='Coronation' limit 1",
                   { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

            talentAllAverage = yield sequelize.query("select avg(talent) as avg_talent" +
                   "  from scores where candidateNo=?  and gender='F' and event='Talent' limit 1",
                   { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

          }catch(e){
              console.log(e.message);
          }

          //=====coronation averages=====\\
          if(coronationAllAverage.length > 0){
              var average = coronationAllAverage[0];

              newItem.production  = (average.avg_production || 0) * 0.15;
              newItem.swimsuit  =  (average.avg_swimsuit || 0) * 0.10;
              newItem.formalWear  =  (average.avg_formalWear || 0) * 0.20;
              newItem.qa  =  (average.avg_qa || 0) * 0.30;


          }
          else {
              newItem.production  = 0;
              newItem.swimsuit  = 0;
              newItem.formalWear  = 0;
              newItem.qa  = 0;
              newItem.totalAverage= 0;
          }

          //======talent averages=====\\
          if(talentAllAverage.length > 0){
              var average = talentAllAverage[0];

              newItem.talent  = (average.avg_talent || 0) * 0.15;

          }
          else {
              newItem.talent  = 0;
          }

          newItem.totalAverage= newItem.production +  newItem.talent +
              newItem.swimsuit + newItem.formalWear + 
              newItem.qa  ;


          result.rankingfemale.push(newItem);
      }
      // ==================== get ranking for females ====================



      // ======================================

      
      result.rankingfemale.sort(function(a,b){
          if (parseFloat(a.totalAverage) > parseFloat(b.totalAverage))
              return -1;

          if (parseFloat(a.totalAverage) < parseFloat(b.totalAverage))
              return 1;

          return 0;
      });

      for(var i = 0;i<result.rankingfemale.length;i++){
        if(i === 5){
          break;
        }
        var candidateScore = result.rankingfemale[i]
        
        var candidate = yield Candidate.find({
          where:{
            candidateNo: candidateScore.candidateNo
          }
        })

        FinalroundCandidate.create({
          candidateNo: candidate.candidateNo,
          name: candidate.name,
          age: candidate.age,
          address: candidate.address,
          gender: 'F'
        }).catch(function(err){
          res.sendStatus(404)
        })

      }

      var topFive = FinalroundCandidate.findAll()

      return topFive;
  }).then((result)=>{
      res.status(200).json(result);
  }).catch(function(error){

      res.status(404).send(error.message);
  });

  })


  return router

}