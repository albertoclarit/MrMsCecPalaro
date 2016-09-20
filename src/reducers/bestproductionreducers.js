
import * as types from '../constants/BestProductionActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function bestproductionreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_PRODUCTION_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_PRODUCTION_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}