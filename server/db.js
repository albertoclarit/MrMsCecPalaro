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
        username:{
            type: Sequelize.STRING,
            unique: true,
        },
        judgeNo: {
            type: Sequelize.INTEGER,
        },
        password: {
            type: Sequelize.STRING
        },
        event: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Judge.sync({force: false}).then(function () {
        // Table created
        return Judge.create({
            judgeNo: '999',
            username: 'amazingAdmin',
            password: 'itsawesome',
            event: 'ADMIN',
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
        event:{
            type: Sequelize.STRING
        },
        candidateNo: {
            type: Sequelize.INTEGER
        },
        judgeNo: {
            type: Sequelize.INTEGER
        },
        prepageant:{
            type: Sequelize.REAL
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
        },
        qa: {
            type: Sequelize.REAL
        },
        gender: {
            type: Sequelize.STRING
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
