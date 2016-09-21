
import * as types from '../constants/FinalRankingActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[],
    judgeTotal:0

};

export default function finalrankingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_FINAL_RANKING_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.data.rankingmale
               },
                recordsFemale:{
                    $set:action.data.rankingfemale
                },
                judgeTotal:{
                    $set:action.data.judgeTotal
                }
            });


        default :
            return state;
    }
}