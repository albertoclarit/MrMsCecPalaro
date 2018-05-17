
import * as types from '../constants/BestSwimsuitActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function bestswimsuitreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_SPORTSWEAR_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_SWIMSUIT_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}