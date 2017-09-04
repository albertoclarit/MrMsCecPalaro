
import * as types from '../constants/FinalRankingActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[],
    prePageant:{
      judgeTotal:0,
      judgeScores:[]
    },
    talent:{
      judgeTotal:0,
      judgeScores:[]
    },
    coronation:{
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
                prePageant:{
                  judgeTotal:{
                    $set: action.data.prepageant.judgeTotal
                  },
                  judgeScores:{
                    $set: action.judgeScores.prepageant
                  }
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
            });
        }



        default :
            return state;
    }
}
