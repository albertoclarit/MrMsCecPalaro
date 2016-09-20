
import * as types from '../constants/BestTalentActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function besttalentreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_TALENT_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_TALENT_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}