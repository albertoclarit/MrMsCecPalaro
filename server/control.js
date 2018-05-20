/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();


module.exports = function (Confirmation) {

    //get score permission
    router.get('/',function (req,res,next) {
      Confirmation.findOne({
        where:{
          judgeNo: 999
        }
      }).then(function (confirmation) {
          res.status(200).json(confirmation)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })
    })

    router.get('/coronation',function (req,res,next) {
        Confirmation.findAll({
          where:{
            judgeNo:{
              $ne: 999
            },
            event: "Coronation"            
          }
        }).then(function (confirmation) {
            var coronation =[]
            for(var a=0; a<confirmation.length;a++){
              var status = confirmation[a]
              var judgeStatus = {}
              judgeStatus.event = status.event
              judgeStatus.judgeNo = status.judgeNo

              var swimsuit = {}
              swimsuit.name="swimsuit"
              swimsuit.category = "Swimsuit"
              swimsuit.status = status.swimsuit
              var interview = {}
              interview.name="interview"
              interview.category = "Interview"
              interview.status = status.interview
              var gown = {}
              gown.name="gown"
              gown.category = "Evening Gown"
              gown.status = status.gown
              var categories = [swimsuit,interview,gown]
              judgeStatus.categories = categories

              coronation.push(judgeStatus)
            }

            res.status(200).json(coronation)
        }).catch(function (err) {
            res.status(404).json(err.message)
        })
    })

    router.get('/production',function(req,res){

      Confirmation.findAll({
        where:{
          judgeNo:{
            $ne: 999
          },
          event: "Production"            
        }
      }).then(function (confirmation) {
          var coronation =[]
          for(var a=0; a<confirmation.length;a++){
            var status = confirmation[a]
            var judgeStatus = {}
            judgeStatus.event = status.event
            judgeStatus.judgeNo = status.judgeNo

            var production = {}
            production.name="production"
            production.category = "Production"
            production.status = status.production
            
            var categories = [production]
            judgeStatus.categories = categories

            coronation.push(judgeStatus)
          }

          res.status(200).json(coronation)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })

    })

    router.get('/talent',function(req,res){

      Confirmation.findAll({
        where:{
          judgeNo:{
            $ne: 999
          },
          event: "Talent"            
        }
      }).then(function (confirmation) {
          var coronation =[]
          for(var a=0; a<confirmation.length;a++){
            var status = confirmation[a]
            var judgeStatus = {}
            judgeStatus.event = status.event
            judgeStatus.judgeNo = status.judgeNo

            var talent = {}
            talent.name="talent"
            talent.category = "Talent"
            talent.status = status.talent
            
            var categories = [talent]
            judgeStatus.categories = categories

            coronation.push(judgeStatus)
          }

          res.status(200).json(coronation)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })

    })

    router.get('/final',function(req,res){

      Confirmation.findAll({
        where:{
          judgeNo:{
            $ne: 999
          },
          event: "Coronation"            
        }
      }).then(function (confirmation) {
          var coronation =[]
          for(var a=0; a<confirmation.length;a++){
            var status = confirmation[a]
            var judgeStatus = {}
            judgeStatus.event = status.event
            judgeStatus.judgeNo = status.judgeNo

            var f_interview = {}
            f_interview.name="f_interview"
            f_interview.category = "Interview"
            f_interview.status = status.f_interview
            var f_poise = {}
            f_poise.name="f_poise"
            f_poise.category = "Poise & Charm"
            f_poise.status = status.f_poise
            
            var categories = [f_interview,f_poise]
            judgeStatus.categories = categories

            coronation.push(judgeStatus)
          }

          res.status(200).json(coronation)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })

    })


    router.get('/:id',function (req,res) {
        Confirmation.findOne({
          where: {
            judgeNo:req.params.id
          }
        }).then(function (judgeConfirm) {
            res.status(200).json(judgeConfirm)
        }).catch(function (err) {
            res.status(404).json(err.message)
        })
    })

    router.put('/activateAdmin',function(req,res){

      Confirmation.findOne({
        where: {
          judgeNo:999
        }
      }).then(function (judgeConfirm) {
          if(judgeConfirm[req.body.category] === "ACTIVE"){
            judgeConfirm[req.body.category] = "INACTIVE"
          }else{
            judgeConfirm[req.body.category] = "ACTIVE"
          }
          judgeConfirm.save()
          res.status(200).json(judgeConfirm)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })
    })

    router.put('/confirmJudge',function(req,res){

      Confirmation.findOne({
        where: {
          judgeNo:req.body.judgeNo
        }
      }).then(function (judgeConfirm) {
          if(judgeConfirm[req.body.category] === "PENDING"){
            judgeConfirm[req.body.category] = "CONFIRMED"
          }else{
            judgeConfirm[req.body.category] = "PENDING"
          }
          judgeConfirm.save()
          res.status(200).json(judgeConfirm)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })
    })

    router.put('/:id',function (req,res) {
      Confirmation.findOne({
        where: {
          judgeNo:req.params.id
        }
      }).then(function (judgeConfirm) {
          res.status(200).json(judgeConfirm)
      }).catch(function (err) {
          res.status(404).json(err.message)
      })
    })



    return router;
};

