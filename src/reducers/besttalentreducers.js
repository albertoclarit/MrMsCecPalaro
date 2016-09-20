
import * as types from '../constants/BestTalentActionTypes';
import  update from 'react-addons-update';


const initialState={
    records:[]
};

export default function besttalentreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_TALENT_SUCCESS:
            return update(state,{
               records:{
                   $set:action.records
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