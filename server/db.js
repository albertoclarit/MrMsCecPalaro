/**
 * Created by albertoclarit on 8/15/16.
 */

var Sequelize = require('sequelize');

module.exports = function (sequelize) {

    // =============================  Judge  =============================
    var Judge = sequelize.define('judges', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        judgeNo: {
            type: Sequelize.INTEGER,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Judge.sync({force: false}).then(function () {
        // Table created
        return Judge.create({
            judgeNo: '999',
            password: 'itsawesome'
        });
    }).catch(function(error) {
        console.log('999 user already created');
    });


   
    // =============================  Judge  =============================


 // =============================  Candidate  =============================
 

 
    var Candidate = sequelize.define('candidates', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        candidateNo: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        team: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Candidate.sync({force: false});



    // =============================  Candidate  =============================


 // =============================  Score  =============================
 

 
    var Score = sequelize.define('scores', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        candidateNo: {
            type: Sequelize.INTEGER,
            unique: true
        },
        judgeNo: {
            type: Sequelize.INTEGER
        },
        talent: {
            type: Sequelize.REAL
        },
        production: {
            type: Sequelize.REAL  
        },
        sportswear: {
            type: Sequelize.REAL
        },
        formalWear: {
            type: Sequelize.REAL
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Score.sync({force: false});



    // =============================  Score  =============================


 return {
     Judge: Judge,
     Candidate: Candidate,
     Score : Score
 };



};