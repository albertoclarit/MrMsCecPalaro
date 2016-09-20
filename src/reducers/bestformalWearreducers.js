
import * as types from '../constants/BestFormalwearActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function bestformalWearreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_FORMALWEAR_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_FORMALWEAR_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}