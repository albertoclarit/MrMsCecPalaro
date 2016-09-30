/**
 * Created by albertoclarit on 8/15/16.
 */
import * as types from '../constants/MovieListingActionTypes';
import  update from 'react-addons-update';


const initialState={
    records:[],
    selectedMovie:{}
};

export default function movielistingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_MOVIES_SUCCESS:
            return update(state,{
               records:{
                   $set:action.records
               },
               selectedMovie:{
                   $set:{}
               }
            });
        case types.LOAD_MOVIE_SUCCESS:
            return update(state,{
                selectedMovie:{
                    $set:action.movie
                }
            });
        case types.LOAD_MOVIE_UPDATE_FIELD:
            return update(state,{
                selectedMovie:{
                    $merge:action.data
                }
            });

        default :
            return state;
    }
}