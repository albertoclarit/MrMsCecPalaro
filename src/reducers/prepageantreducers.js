
import * as types from '../constants/PrepageantActionTypes';
import  update from 'react-addons-update';


const initialState={
    recordsMale:[],
    recordsFemale:[]
};

export default function prepageantaction(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_BEST_PREPAGEANT_SUCCESS:
            return update(state,{
                recordsMale:{
                   $set:action.records
               }
            });
        case types.LOAD_BEST_PREPAGEANT_FEMALE_SUCCESS:
            return update(state,{
                recordsFemale:{
                    $set:action.records
                }
            });

        default :
            return state;
    }
}
