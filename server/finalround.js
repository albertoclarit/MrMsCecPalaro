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

  router.get('/resetscores', function(req, res,next) {

    sequelize.query("UPDATE finalroundscores SET interview = 0.0,poise = 0.0 ")
      .spread(function(results, metadata) {
        res.status(200).json("OK");
      }).catch(function(error){
          res.status(500).send(error.message);
      });

  });

  router.get('/candidates',function(req,res,next){
    FinalroundCandidate.findAll({
      order: [
        ['candidateNo','ASC']
      ]
    })
      .then(function(candidates){
        res.status(200).json(candidates)
      }).catch(function(err){
        res.sendStatus(404)
      })
  })

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

  router.post('/startfinalround',function(req,res,next){

    co(function *(){

      CoronationStatus.find({
        where: {
          event:"Final"
        }
      }).then(function(status){
        status.update({
          status: true
        })
      }).catch(function(){
        res.sendStatus(404)
      })

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


  router.get('/scores',function(req,res,next){

    co(function *(){

        var candidates = yield FinalroundCandidate.findAll({
          order: [
            ['candidateNo','ASC']
          ]
        })

        var judges  =  yield Judge.findAll({
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
        
        var result = {
          record: [],
          judgeTotal: judges.length,
          judgeScores: {}
        }

        //=============== final round results ==============\\

        for(var i=0; i< candidates.length;i++) {
          var candidate = candidates[i]
          var item = {}
          item.name = candidate.name
          item.candidateNo = candidate.candidateNo

          try{

            var allAverage = yield sequelize.query("select avg(interview) as avg_interview, " +
            "  avg(poise) as avg_poise " +
            "  from finalroundscores where candidateNo=?  and gender='F' limit 1",
            { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

          }catch(e){
            console.log(e)
          }

          if(allAverage.length > 0){
              var average = allAverage[0];

              item.interview  = (average.avg_interview || 0) * 0.5;
              item.poise  =  (average.avg_poise || 0) * 0.5;
          }
          else {
              item.interview  = 0;
              item.poise  = 0;
          }

          item.totalAverage = item.interview + item.poise

          result.record.push(item)

        }

        //=============== final round results ==============\\

        //=============== final round per judge results ==============\\

        for(var a=0; a< judges.length;a++) {
          var judge = judges[a];
          result.judgeScores["judgeNo"+(a+1)] = {}
          result.judgeScores["judgeNo"+(a+1)].judgeNo = judge.judgeNo

          var records = []

          for(var j=0; j< candidates.length;j++) {
            var candidate = candidates[j]
  
            try{
  
              perjudgescore = yield sequelize.query("select interview , " +
              " poise " +
              "  from finalroundscores where candidateNo=? and judgeNo=?  and gender='F' limit 1",
              { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

              if(perjudgescore.length>0)
                {
                  var x = perjudgescore[0];

                    records.push({
                        candidateNo: candidate.candidateNo,
                        name:candidate.name,
                        interview:x.interview,
                        poise:x.poise,
                        totalaverage:
                            (
                                ((x.interview) * 0.50) +
                                ((x.poise) * 0.50) 
                            )
                    });
                }
                else
                {
                    records.push({
                        candidateNo: candidate.candidateNo,
                        name:candidate.name,
                        interview: 0.0,
                        poise: 0.0,
                        totalaverage:0.0
                    });

                }
                records.sort(function(a,b){
                  if (parseFloat(a.totalaverage) > parseFloat(b.totalaverage))
                      return -1;
      
                  if (parseFloat(a.totalaverage) < parseFloat(b.totalaverage))
                      return 1;
      
                  return 0;
                });

                result.judgeScores["judgeNo"+(a+1)].result = records


            }catch(e){
              console.log(e)
            }
  
          }

          // result.judgeScores.push(data)
        }
        result.record.sort(function(a,b){
          if (parseFloat(a.totalAverage) > parseFloat(b.totalAverage))
              return -1;

          if (parseFloat(a.totalAverage) < parseFloat(b.totalAverage))
              return 1;

          return 0;
      });
        

        //=============== final round per judge results ==============\\

        return result

    }).then(function(result){
        res.status(200).json(result)
    }).catch(function(err){
        console.log(err)
    })

  })

  router.get('/interviewScores',function (req,res,next) {

    
    co(function *() {
      
      var scores = []

      var candidates = yield FinalroundCandidate.findAll()

      var judges = yield Judge.findAll({
        where:{
          event: "Coronation"
        }
      })

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        let score = {}
        score.candidateNo = candidate.candidateNo
        score.name = candidate.name
        score.judgeTotal = judges.length

        var total = 0
        for (let j = 0; j < judges.length; j++) {
          const judge = judges[j];

            try {
              var interview = yield sequelize.query("select interview " +
              "  from finalroundscores where candidateNo=? and judgeNo=? and gender='F' limit 1",
              { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });
              
              score["judgeNo"+(j+1)] = {}
              
              if (interview.length>0) {
                score["judgeNo"+(j+1)] = interview[0]
                total+=interview[0].interview
              }else{
                score["judgeNo"+(j+1)] = {interview: 0.0}
                total+=0
              }
    
            } catch (e) {
              res.sendStatus(404)
            }
          
        }

        score.average = (total/judges.length).toFixed(2)

        scores.push(score)

      }

      return scores.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });

    }).then(function (result) {
        res.status(200).json(result)
    }).catch(function (err) {
        res.sendStatus(404)
    })


  })

  router.get('/poiseScores',function (req,res,next) {

    
    co(function *() {
      
      var scores = []

      var candidates = yield FinalroundCandidate.findAll()

      var judges = yield Judge.findAll({
        where:{
          event: "Coronation"
        }
      })

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        let score = {}
        score.candidateNo = candidate.candidateNo
        score.name = candidate.name
        score.judgeTotal = judges.length

        var total = 0
        for (let j = 0; j < judges.length; j++) {
          const judge = judges[j];

            try {
              var poise = yield sequelize.query("select poise " +
              "  from finalroundscores where candidateNo=? and judgeNo=? and gender='F' limit 1",
              { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });
              
              score["judgeNo"+(j+1)] = {}
              
              if (poise.length>0) {
                score["judgeNo"+(j+1)] = poise[0]
                total+=poise[0].poise
              }else{
                score["judgeNo"+(j+1)] = {poise: 0.0}
                total+=0
              }
    
            } catch (e) {
              res.sendStatus(404)
            }
          
        }

        score.average = (total/judges.length).toFixed(2)

        scores.push(score)

      }

      return scores.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });

    }).then(function (result) {
        res.status(200).json(result)
    }).catch(function (err) {
        res.sendStatus(404)
    })


  })


  return router

}