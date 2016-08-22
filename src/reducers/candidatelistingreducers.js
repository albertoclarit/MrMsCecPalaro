/**
 * Created by albertoclarit on 8/15/16.
 */
import * as types from '../constants/CandidateListingActionTypes';
import  update from 'react-addons-update';


const initialState={
    records:[],
    selectedCandidate:{}
};

export default function candidatelistingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_CANDIDATES_SUCCESS:
            return update(state,{
               records:{
                   $set:action.records
               },
               selectedCandidate:{
                   $set:{}
               }
            });
        case types.LOAD_CANDIDATE_SUCCESS:
            return update(state,{
                selectedCandidate:{
                    $set:action.candidate
                }
            });
        case types.LOAD_CANDIDATE_UPDATE_FIELD:
            return update(state,{
                selectedCandidate:{
                    $merge:action.data
                }
            });

        default :
            return state;
    }
}