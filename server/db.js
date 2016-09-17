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
<<<<<<< HEAD
=======
        },
        gender: {
            type: Sequelize.STRING  
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    Candidate.sync({force: false}).then(function () {
        // Table created
        return Candidate.create({
            candidateNo: 111,
            name: 'Margie Macalinao',
<<<<<<< HEAD
            team: 'IIAS'
=======
            team: 'Lannister',
            gender: 'F'
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
        });
    }).catch(function(error) {
        console.log('111 user already created');
    });



    // =============================  Candidate  =============================

<<<<<<< HEAD

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


    Score.sync({force: false}).then(function () {
        // Table created
        return Score.create({
            candidateNo: 111,
            judgeNo: 2,
            talent: 1.1,
            production: 2.2,
            sportswear: 3.3,
            formalWear: 5.5
        });
    }).catch(function(error) {
        console.log('Score table created');
    });



    // =============================  Score  =============================


 return {
        Judge : Judge,
        Candidate : Candidate,
        Score : Score
=======
 return {
        Judge : Judge,
        Candidate : Candidate
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
    };


};