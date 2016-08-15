/**
 * Created by albertoclarit on 8/15/16.
 */
import * as types from '../constants/JudgeListingActionTypes';
import  update from 'react-addons-update';


const initialState={
    records:[],
    selectedJudge:{}
};

export default function judgelistingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_JUDGES_SUCCESS:
            return update(state,{
               records:{
                   $set:action.records
               },
               selectedJudge:{
                   $set:{}
               }
            });
        case types.LOAD_JUDGE_SUCCESS:
            return update(state,{
                selectedJudge:{
                    $set:action.judge
                }
            });
        case types.LOAD_JUDGE_UPDATE_FIELD:
            return update(state,{
                selectedJudge:{
                    $merge:action.data
                }
            });

        default :
            return state;
    }
}