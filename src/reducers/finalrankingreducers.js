
import * as types from '../constants/FinalRankingActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[],
    talent:{
      judgeTotal:0,
      judgeScores:[]
    },
    coronation:{
      judgeTotal:0,
      judgeScores:[]
    },
    production:{
      judgeTotal:0,
      judgeScores:[]
    }
};

export default function finalrankingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_FINAL_RANKING_SUCCESS:
        {
            return update(state,{
                recordsMale:{
                    $set:action.data.rankingmale
                },
                recordsFemale:{
                    $set:action.data.rankingfemale
                },
                talent:{
                  judgeTotal:{
                    $set: action.data.talent.judgeTotal
                  },
                  judgeScores:{
                    $set: action.judgeScores.talent
                  }
                },
                coronation:{
                  judgeTotal:{
                    $set: action.data.coronation.judgeTotal
                  },
                  judgeScores:{
                    $set: action.judgeScores.coronation
                  }
                },
                production:{
                  judgeTotal:{
                    $set: action.data.production.judgeTotal
                  },
                  judgeScores:{
                    $set: action.judgeScores.production
                  }
                },
            });
        }



        default :
            return state;
    }
}
