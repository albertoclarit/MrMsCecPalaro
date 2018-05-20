/**
 * Created by albertoclarit on 8/15/16.
 */

var Sequelize = require('sequelize');
var co = require('co')

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
        Judge.create({
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
            type: Sequelize.INTEGER,
            unique: true
        },
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.STRING
        },
        address: {
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
        swimsuit: Sequelize.REAL,
        talent: {
            type: Sequelize.REAL
        },
        production: {
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

     // =============================  Final Round Scores  =============================

     var FinalRoundScore = sequelize.define('finalroundscores', {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          autoIncrement: true
      },
      candidateNo: {
          type: Sequelize.INTEGER
      },
      judgeNo: {
          type: Sequelize.INTEGER
      },
      interview: Sequelize.REAL,
      poise: Sequelize.REAL,
      gender: {
          type: Sequelize.STRING
      }
  }, {
      freezeTableName: true // Model tableName will be the same as the model name
  });


  FinalRoundScore.sync({force: false});

  // =============================  Final Round Scores  =============================

   // =============================  Final Round Candidate  =============================

   var FinalRoundCandidate = sequelize.define('finalroundcandidates', {
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
        age: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


FinalRoundCandidate.sync({force: false});

// =============================  Final Round Candidate  =============================

 // =============================  Final Round Candidate  =============================

 var CoronationStatus = sequelize.define('coronationstatus', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  event:{ 
    type: Sequelize.STRING,
    unique: true
  },
  status: {
    type: Sequelize.BOOLEAN
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


CoronationStatus.sync({force: false}).then(function () {
  
  co(function *() {
    var preliminary = yield CoronationStatus.findOrCreate({
      where:{
        event: "Preliminary"
      },
      defaults: {
      event: "Preliminary",
      status: true
    }})

    if(!preliminary[1])
      console.log("Preliminary Status is create");

    var finalround = yield CoronationStatus.findOrCreate({
      where:{
        event: "Final"
      },
      defaults: {
      event: "Final",
      status: false
      }
    })
    if(!finalround[1])
      console.log("Final Round Status is create");

  }).catch(function (err) {
    console.log(err);
  })

})

// =============================  Final Round Candidate  =============================

// =============================  Final Round Candidate  =============================

var JudgeConfirmation = sequelize.define('judge_confirmation', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  event: Sequelize.STRING,
  judgeNo: Sequelize.INTEGER,
  swimsuit: Sequelize.STRING,
  interview: Sequelize.STRING,
  talent: Sequelize.STRING,
  gown: Sequelize.STRING,
  production: Sequelize.STRING,
  f_interview: Sequelize.STRING,
  f_poise: Sequelize.STRING,
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

JudgeConfirmation.sync({force: false}).then(function () {
  return JudgeConfirmation.create({
    event: "ADMIN",
    judgeNo: 999,
    swimsuit: "ACTIVE",
    interview: "INACTIVE",
    talent: "INACTIVE",
    gown: "INACTIVE",
    production: "INACTIVE",
    f_interview: "INACTIVE",
    f_poise: "INACTIVE"
  })
}).catch(function (e) {
    console.log("admin confirmation alread created");
})

// =============================  Final Round Candidate  =============================


 return {
     Judge: Judge,
     Candidate: Candidate,
     Score : Score,
     FinalRoundScore: FinalRoundScore,
     FinalRoundCandidate: FinalRoundCandidate,
     CoronationStatus: CoronationStatus,
     JudgeConfirmation: JudgeConfirmation,
 };

};
