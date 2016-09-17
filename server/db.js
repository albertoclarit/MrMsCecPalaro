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
            type: Sequelize.INTEGER,
            unique: true
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


    Candidate.sync({force: false}).then(function () {
        // Table created
        return Candidate.create({
            candidateNo: 111,
            name: 'Margie Macalinao',
            team: 'Lannister',
            gender: 'F'
        });
    }).catch(function(error) {
        console.log('111 user already created');
    });



    // =============================  Candidate  =============================

 return {
        Judge : Judge,
        Candidate : Candidate
    };


};