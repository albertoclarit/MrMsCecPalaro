
import * as types from '../constants/BestSportswearActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function bestsportswearreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_SPORTSWEAR_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_SPORTSWEAR_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}