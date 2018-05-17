/**
 * Created by albertoclarit on 8/15/16.
 */
var express = require('express');
var router = express.Router();
var co = require('co');

module.exports = function (sequelize,Score,Candidate,Judge) {



    router.get('/resetscores', function(req, res,next) {

        sequelize.query("UPDATE scores SET prepageant = 0.0,production = 0.0,talent = 0.0,sportswear = 0.0,formalWear = 0.0,qa = 0.0  ")
            .spread(function(results, metadata) {
               res.status(200).json("OK");
             }).catch(function(error){
                res.status(500).send(error.message);
             });

    });

    //====================final ranking===============================
    router.get('/finalranking', function(req, res,next) {

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

            // var candidatesMale  =  yield Candidate.findAll({
            //     where:{
            //         gender:'M'
            //     },
            //     order: [
            //         ['candidateNo', 'ASC']
            //     ]
            // });

            var candidatesFemale  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });


            var result={
              //  rankingmale:[],
               rankingfemale:[],
               talent:{
                 judgeTotal:talentJudges.length
               },
               coronation:{
                 judgeTotal:coronationJudges.length
               }
            };
             // after there is per judge property that list the score


            // ==================== get ranking for males ====================

            // for(var c=0; c< candidatesMale.length;c++) {
            //     var candidate = candidatesMale[c];
            //     var newItem = {};
            //     newItem.name=candidate.name;
            //     newItem.candidateNo=candidate.candidateNo;

            //     var allaverage = [];
            //     try {

            //         coronationAllAverage = yield sequelize.query("select avg(production) as avg_production, " +
            //                "  avg(sportswear) as avg_sportswear, " +
            //                " avg(formalWear) as avg_formalWear, avg(qa) as avg_qa " +
            //                "  from scores where candidateNo=?  and gender='M' and event='Coronation' limit 1",
            //                { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

            //         talentAllAverage = yield sequelize.query("select avg(talent) as avg_talent" +
            //                "  from scores where candidateNo=?  and gender='M' and event='Talent' limit 1",
            //                { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

            //         prePageantAllAverage = yield sequelize.query("select avg(prepageant) as avg_prepageant " +
            //                "  from scores where candidateNo=?  and gender='M' and event='Pre-pageant' limit 1",
            //                { replacements: [candidate.candidateNo], type: sequelize.QueryTypes.SELECT });

            //     }catch(e){
            //         console.log(e.message);
            //     }


            //     //=====coronation averages=====\\
            //     if(coronationAllAverage.length > 0){
            //         var average = coronationAllAverage[0];

            //         newItem.production  = (average.avg_production || 0) * 0.15;
            //         newItem.sportswear  =  (average.avg_sportswear || 0) * 0.10;
            //         newItem.formalWear  =  (average.avg_formalWear || 0) * 0.20;
            //         newItem.qa  =  (average.avg_qa || 0) * 0.30;


            //     }
            //     else {
            //         newItem.production  = 0;
            //         newItem.sportswear  = 0;
            //         newItem.formalWear  = 0;
            //         newItem.qa  = 0;
            //         newItem.totalAverage= 0;
            //     }

            //     //======talent averages=====\\
            //     if(talentAllAverage.length > 0){
            //         var average = talentAllAverage[0];

            //         newItem.talent  = (average.avg_talent || 0) * 0.15;

            //     }
            //     else {
            //         newItem.talent  = 0;
            //     }

            //     //=====Pre-pageant avearages=====\\
            //     if(prePageantAllAverage.length > 0){
            //         var average = prePageantAllAverage[0];

            //         newItem.prepageant  = (average.avg_prepageant || 0) * 0.10;

            //     }
            //     else {
            //         newItem.prepageant = 0;
            //     }

            //     newItem.totalAverage= newItem.production +  newItem.talent +
            //         newItem.sportswear + newItem.formalWear + newItem.prepageant +
            //         newItem.qa  ;


            //     result.rankingmale.push(newItem);
            // }


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

            //===============Talent===============\\
            for(var j=0; j< talentJudges.length;j++) {

                var judge = talentJudges[j];

                result.talent["judge"+(j+1)] = {};

                result.talent["judge"+(j+1)].judgeNo = judge.judgeNo;

                // // === for male results
                // var maleResults = [];
                // for(var c=0; c< candidatesMale.length;c++) {

                //     var  candidate = candidatesMale[c];


                //     var perjudgescore = [];
                //     try {

                //         // perjudgescore = yield sequelize.query("select  production , " +
                //         //     " talent, sportswear, " +
                //         //     " formalWear, qa, prepageant " +
                //         //     "  from scores where candidateNo=? and judgeNo=?  and gender='M' limit 1",
                //         //     { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                //         perjudgescore = yield sequelize.query("select  talent " +
                //             "  from scores where candidateNo=? and judgeNo=?  and gender='M' and event='Talent' limit 1",
                //             { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                //         // newItem.prepageant = (average.avg_prepageant || 0) * 0.10;
                //         // newItem.production  = (average.avg_production || 0) * 0.15;
                //         // newItem.talent  = (average.avg_talent || 0) * 0.15;
                //         // newItem.sportswear  =  (average.avg_talent || 0) * 0.10;
                //         // newItem.formalWear  =  (average.avg_talent || 0) * 0.20;
                //         // newItem.qa  =  (average.avg_qa || 0) * 0.30;

                //         if(perjudgescore.length>0)
                //         {
                //             var x = perjudgescore[0];

                //             maleResults.push({
                //                 candidateNo: candidate.candidateNo,
                //                 name:candidate.name,
                //                 // prepageant: x.prepageant,
                //                 // production:x.production,
                //                 talent:x.talent,
                //                 // sportswear:x.sportswear,
                //                 // formalWear:x.formalWear,
                //                 // qa:x.qa,
                //                 totalaverage:
                //                     (
                //                         // ((x.prepageant) * 0.10) +
                //                         // ((x.production) * 0.15) +
                //                         ((x.talent) * 0.15)
                //                         // ((x.sportswear) * 0.10) +
                //                         // ((x.formalWear) * 0.20) +
                //                         // ((x.qa) * 0.30)
                //                     )
                //             });
                //         }
                //         else
                //         {
                //             maleResults.push({
                //                 candidateNo: candidate.candidateNo,
                //                 name:candidate.name,
                //                 // prepageant: 0.0,
                //                 // production:0.0,
                //                 talent:0.0,
                //                 // sportswear:0.0,
                //                 // formalWear:0.0,
                //                 // qa:0.0,
                //                 totalaverage:0.0
                //             });

                //         }


                //         maleResults.sort(function(a,b){
                //             if (parseFloat(a.totalaverage) > parseFloat(b.totalaverage))
                //                 return -1;

                //             if (parseFloat(a.totalaverage) < parseFloat(b.totalaverage))
                //                 return 1;

                //             return 0;
                //         });

                //         result.talent["judge"+(j+1)].maleResults=maleResults;





                //     }catch(e){
                //         console.log(e.message);
                //     }
                // }


                   // === for female results
                var femaleResults = [];
                for(var c=0; c< candidatesFemale.length;c++) {

                    var  candidate = candidatesFemale[c];


                    var perjudgescore = [];
                    try {

                        // perjudgescore = yield sequelize.query("select  production , " +
                        //     " talent, sportswear, prepageant, " +
                        //     " formalWear, qa " +
                        //     "  from scores where candidateNo=? and judgeNo=?  and gender='F' limit 1",
                        //     { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                        perjudgescore = yield sequelize.query("select  talent" +
                            "  from scores where candidateNo=? and judgeNo=?  and gender='F' and event='Talent' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                        if(perjudgescore.length>0)
                        {
                            var x = perjudgescore[0];

                            femaleResults.push({
                                candidateNo: candidate.candidateNo,
                                name:candidate.name,
                                // prepageant: x.prepageant,
                                // production:x.production,
                                talent:x.talent,
                                // sportswear:x.sportswear,
                                // formalWear:x.formalWear,
                                // qa:x.qa,
                                totalaverage:
                                    (
                                        // ((x.prepageant) * 0.10) +
                                        // ((x.production) * 0.15) +
                                        ((x.talent) * 0.15)
                                        // ((x.sportswear) * 0.10) +
                                        // ((x.formalWear) * 0.20) +
                                        // ((x.qa) * 0.30)
                                    )
                            });
                        }
                        else
                        {
                            femaleResults.push({
                                candidateNo: candidate.candidateNo,
                                name:candidate.name,
                                // prepageant: 0.0,
                                // production:0.0,
                                talent:0.0,
                                // sportswear:0.0,
                                // formalWear:0.0,
                                // qa:0.0,
                                totalaverage:0.0
                            });

                        }


                        femaleResults.sort(function(a,b){
                            if (parseFloat(a.totalaverage) > parseFloat(b.totalaverage))
                                return -1;

                            if (parseFloat(a.totalaverage) < parseFloat(b.totalaverage))
                                return 1;

                            return 0;
                        });

                        result.talent["judge"+(j+1)].femaleResults=femaleResults;



                    }catch(e){
                        console.log(e.message);
                    }
                }


            }
            //===============Talent===============\\

            //===============Coronation===============\\
            for(var j=0; j< coronationJudges.length;j++) {

                var judge = coronationJudges[j];

                result.coronation["judge"+(j+1)] = {};

                result.coronation["judge"+(j+1)].judgeNo = judge.judgeNo;

                // // === for male results
                // var maleResults = [];
                // for(var c=0; c< candidatesMale.length;c++) {

                //     var  candidate = candidatesMale[c];


                //     var perjudgescore = [];
                //     try {

                //         // perjudgescore = yield sequelize.query("select  production , " +
                //         //     " talent, sportswear, " +
                //         //     " formalWear, qa, prepageant " +
                //         //     "  from scores where candidateNo=? and judgeNo=?  and gender='M' limit 1",
                //         //     { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                //         perjudgescore = yield sequelize.query("select  production , " +
                //             "  sportswear, " +
                //             " formalWear, qa " +
                //             "  from scores where candidateNo=? and judgeNo=?  and gender='M' and event='Coronation' limit 1",
                //             { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                //         // newItem.prepageant = (average.avg_prepageant || 0) * 0.10;
                //         // newItem.production  = (average.avg_production || 0) * 0.15;
                //         // newItem.talent  = (average.avg_talent || 0) * 0.15;
                //         // newItem.sportswear  =  (average.avg_talent || 0) * 0.10;
                //         // newItem.formalWear  =  (average.avg_talent || 0) * 0.20;
                //         // newItem.qa  =  (average.avg_qa || 0) * 0.30;

                //         if(perjudgescore.length>0)
                //         {
                //             var x = perjudgescore[0];

                //             maleResults.push({
                //                 candidateNo: candidate.candidateNo,
                //                 name:candidate.name,
                //                 // prepageant: x.prepageant,
                //                 production:x.production,
                //                 // talent:x.talent,
                //                 sportswear:x.sportswear,
                //                 formalWear:x.formalWear,
                //                 qa:x.qa,
                //                 totalaverage:
                //                     (
                //                         // ((x.prepageant) * 0.10)
                //                         ((x.production) * 0.15) +
                //                         // ((x.talent) * 0.15) +
                //                         ((x.sportswear) * 0.10) +
                //                         ((x.formalWear) * 0.20) +
                //                         ((x.qa) * 0.30)
                //                     )
                //             });
                //         }
                //         else
                //         {
                //             maleResults.push({
                //                 candidateNo: candidate.candidateNo,
                //                 name:candidate.name,
                //                 // prepageant: 0.0,
                //                 production:0.0,
                //                 // talent:0.0,
                //                 sportswear:0.0,
                //                 formalWear:0.0,
                //                 qa:0.0,
                //                 totalaverage:0.0
                //             });

                //         }


                //         maleResults.sort(function(a,b){
                //             if (parseFloat(a.totalaverage) > parseFloat(b.totalaverage))
                //                 return -1;

                //             if (parseFloat(a.totalaverage) < parseFloat(b.totalaverage))
                //                 return 1;

                //             return 0;
                //         });

                //         result.coronation["judge"+(j+1)].maleResults=maleResults;





                //     }catch(e){
                //         console.log(e.message);
                //     }
                // }


                   // === for female results
                var femaleResults = [];
                for(var c=0; c< candidatesFemale.length;c++) {

                    var  candidate = candidatesFemale[c];


                    var perjudgescore = [];
                    try {

                        // perjudgescore = yield sequelize.query("select  production , " +
                        //     " talent, sportswear, prepageant, " +
                        //     " formalWear, qa " +
                        //     "  from scores where candidateNo=? and judgeNo=?  and gender='F' limit 1",
                        //     { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                        perjudgescore = yield sequelize.query("select  production , " +
                            " swimsuit, " +
                            " formalWear, qa " +
                            "  from scores where candidateNo=? and judgeNo=?  and gender='F' and event='Coronation' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                        if(perjudgescore.length>0)
                        {
                            var x = perjudgescore[0];

                            femaleResults.push({
                                candidateNo: candidate.candidateNo,
                                name:candidate.name,
                                // prepageant: x.prepageant,
                                production:x.production,
                                // talent:x.talent,
                                swimsuit:x.swimsuit,
                                formalWear:x.formalWear,
                                qa:x.qa,
                                totalaverage:
                                    (
                                        // ((x.prepageant) * 0.10)
                                        ((x.production) * 0.15) +
                                        // ((x.talent) * 0.15) +
                                        ((x.swimsuit) * 0.10) +
                                        ((x.formalWear) * 0.20) +
                                        ((x.qa) * 0.30)
                                    )
                            });
                        }
                        else
                        {
                            femaleResults.push({
                                candidateNo: candidate.candidateNo,
                                name:candidate.name,
                                // prepageant: 0.0,
                                production:0.0,
                                // talent:0.0,
                                swimsuit:0.0,
                                formalWear:0.0,
                                qa:0.0,
                                totalaverage:0.0
                            });

                        }


                        femaleResults.sort(function(a,b){
                            if (parseFloat(a.totalaverage) > parseFloat(b.totalaverage))
                                return -1;

                            if (parseFloat(a.totalaverage) < parseFloat(b.totalaverage))
                                return 1;

                            return 0;
                        });

                        result.coronation["judge"+(j+1)].femaleResults=femaleResults;



                    }catch(e){
                        console.log(e.message);
                    }
                }


            }
            //===============Coronation===============\\

           // =========================================





            result.rankingfemale.sort(function(a,b){
                if (parseFloat(a.totalAverage) > parseFloat(b.totalAverage))
                    return -1;

                if (parseFloat(a.totalAverage) < parseFloat(b.totalAverage))
                    return 1;

                return 0;
            });

            // result.rankingmale.sort(function(a,b){
            //     if (parseFloat(a.totalAverage) > parseFloat(b.totalAverage))
            //         return -1;

            //     if (parseFloat(a.totalAverage) < parseFloat(b.totalAverage))
            //         return 1;

            //     return 0;
            // });



            return result;
        }).then((result)=>{
            res.status(200).json(result);
        }).catch(function(error){

            res.status(404).send(error.message);
        });


    });

    //====================final ranking===============================


    //====================qa===============================
    router.get('/bestqafemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var qa =
                        yield  sequelize.query("select qa from scores where candidateNo=? and judgeNo=? and event='Coronation'  and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(qa.length>0)
                    {
                        newItem["judge"+(j+1)] = qa[0];
                        total +=qa[0].qa;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {qa:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);


        }).catch(function(error){

            res.status(404).send('No formalWear record yet');
        });


    });


    router.get('/bestqamale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'M'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var qa =
                        yield  sequelize.query("select qa from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='M' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(qa.length>0)
                    {
                        newItem["judge"+(j+1)] = qa[0];
                        total +=qa[0].qa;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {qa:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);


        }).catch(function(error){

            res.status(404).send('No qa record yet');
        });


    });

//====================qa===============================


    //====================formalWear===============================
    router.get('/bestformalWearfemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

            var judges  =  yield Judge.findAll({
                where:{
                    judgeNo: {
                        $ne: 999
                    },
                    event:'Coronation'
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

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var formalWear =
                        yield  sequelize.query("select formalWear from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(formalWear.length>0)
                    {
                        newItem["judge"+(j+1)] = formalWear[0];
                        total +=formalWear[0].formalWear;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {formalWear:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No formalWear record yet');
        });


    });


    router.get('/bestformalWearmale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'M'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var formalWear =
                        yield  sequelize.query("select formalWear from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='M' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(formalWear.length>0)
                    {
                        newItem["judge"+(j+1)] = formalWear[0];
                        total +=formalWear[0].formalWear;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {formalWear:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);


        }).catch(function(error){

            res.status(404).send('No formalWear record yet');
        });


    });

//====================formalWear===============================



    //====================sportswear===============================
    router.get('/bestsportswearfemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var sportswear =
                        yield  sequelize.query("select sportswear from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(sportswear.length>0)
                    {
                        newItem["judge"+(j+1)] = sportswear[0];
                        total +=sportswear[0].sportswear;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {sportswear:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No sportswear record yet');
        });


    });


    router.get('/bestsportswearmale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'M'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var sportswear =
                        yield  sequelize.query("select sportswear from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='M' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(sportswear.length>0)
                    {
                        newItem["judge"+(j+1)] = sportswear[0];
                        total +=sportswear[0].sportswear;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {sportswear:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);


        }).catch(function(error){

            res.status(404).send('No sportswear record yet');
        });


    });

//====================sportswear===============================


    //====================production===============================
    router.get('/bestproductionfemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

            var judges  =  yield Judge.findAll({
                where:{
                    judgeNo: {
                        $ne: 999
                    },
                    event:'Coronation'
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

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var production =
                        yield  sequelize.query("select production from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(production.length>0)
                    {
                        newItem["judge"+(j+1)] = production[0];
                        total +=production[0].production;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {production:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No production record yet');
        });


    });


    router.get('/bestproductionmale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'M'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var production =
                        yield  sequelize.query("select production from scores where candidateNo=? and judgeNo=? and event='Coronation' and gender='M' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(production.length>0)
                    {
                        newItem["judge"+(j+1)] = production[0];
                        total +=production[0].production;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {production:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No production record yet');
        });


    });

//====================productio===============================



//====================talent===============================
    router.get('/besttalentfemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

            var judges  =  yield Judge.findAll({
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


            var output = [];

            for(var c=0; c< candidates.length;c++){
                var candidate = candidates[c];
                var newItem = {};
                newItem.name=candidate.name;
                newItem.candidateNo=candidate.candidateNo;
                newItem.judgeTotal = judges.length;

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var talent =
                        yield  sequelize.query("select talent from scores where candidateNo=? and judgeNo=? and event='Talent' and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(talent.length>0)
                    {
                        newItem["judge"+(j+1)] = talent[0];
                        total +=talent[0].talent;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {talent:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No talent record yet');
        });


    });


    router.get('/besttalentmale', function(req, res,next) {


    co(function *(){
      var candidates  =  yield Candidate.findAll({
           where:{
               gender:'M'
           },
          order: [
              ['candidateNo', 'ASC']
          ]
      });

     var judges  =  yield Judge.findAll({
          where:{
               judgeNo: {
                   $ne: 999
               },
               event:'Talent'
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

                // compute the average of talent

                   var total = 0;
                    for(var j=0; j < judges.length;j++){
                        var judge  = judges[j];


                         var talent =
                          yield  sequelize.query("select talent from scores where candidateNo=? and judgeNo=? and event='Talent' and gender='M' limit 1",
                           { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                            if(talent.length>0)
                            {
                                newItem["judge"+(j+1)] = talent[0];
                                total +=talent[0].talent;
                            }
                            else
                            {
                                newItem["judge"+(j+1)] = {talent:0.0};
                                total +=0;
                            }

                    }
               newItem.average = (total/judges.length).toFixed(2);

           output.push(newItem);
       }


        return  output.sort(function(a,b){
              if (parseFloat(a.average) > parseFloat(b.average))
               return -1;

            if (parseFloat(a.average) < parseFloat(b.average))
                return 1;

            return 0;
        });




    }) .then(function(output){
         res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No talent record yet');
        });


    });

//====================talent===============================\\


    //====================prepageant===============================
    router.get('/prepageantfemale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'F'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

            var judges  =  yield Judge.findAll({
                where:{
                    judgeNo: {
                        $ne: 999
                    },
                    event: 'Pre-pageant'
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

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var prepageant =
                        yield  sequelize.query("select prepageant from scores where candidateNo=? and judgeNo=? and event='Pre-pageant' and gender='F' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });

                    if(prepageant.length>0)
                    {
                        newItem["judge"+(j+1)] = prepageant[0];
                        total +=prepageant[0].prepageant;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {prepageant:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);;


        }).catch(function(error){

            res.status(404).send('No prepageant record yet');
        });


    });


    router.get('/prepageantmale', function(req, res,next) {


        co(function *(){
            var candidates  =  yield Candidate.findAll({
                where:{
                    gender:'M'
                },
                order: [
                    ['candidateNo', 'ASC']
                ]
            });

            var judges  =  yield Judge.findAll({
                where:{
                    judgeNo: {
                        $ne: 999
                    },
                    event: 'Pre-pageant'
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

                // compute the average of talent

                var total = 0;
                for(var j=0; j < judges.length;j++){
                    var judge  = judges[j];


                    var prepageant =
                        yield  sequelize.query("select prepageant from scores where candidateNo=? and judgeNo=? and event='Pre-pageant' and gender='M' limit 1",
                            { replacements: [candidate.candidateNo,judge.judgeNo], type: sequelize.QueryTypes.SELECT });


                    if(prepageant.length>0)
                    {
                        newItem["judge"+(j+1)] = prepageant[0];
                        total +=prepageant[0].prepageant;
                    }
                    else
                    {
                        newItem["judge"+(j+1)] = {prepageant:0.0};
                        total +=0;
                    }

                }
                newItem.average = (total/judges.length).toFixed(2);

                output.push(newItem);
            }


            return  output.sort(function(a,b){
                if (parseFloat(a.average) > parseFloat(b.average))
                    return -1;

                if (parseFloat(a.average) < parseFloat(b.average))
                    return 1;

                return 0;
            });




        }) .then(function(output){
            res.status(200).json(output);


        }).catch(function(error){

            res.status(404).send('No prepageant record yet');
        });


    });

//====================prepageant===============================



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
        var event=req.query.event

        if(!judgeno || !candidateno || !gender){
            res.status(404).send('Please complete argument');
            return;
        }

        Score.findOrCreate({where: {
            'judgeNo':judgeno,
            'candidateNo':candidateno,
            'gender':gender,
            'event':event,
            }, defaults:
            {
                'judgeNo':judgeno,
                'candidateNo':candidateno,
                'gender':gender,
                'event':event,
                talent:0,
                prepageant: 0,
                production:0,
                swimsuit:0,
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
