
import * as types from '../constants/LoadMaleCandidates';
import  update from 'react-addons-update';


const initialState={
    maleCandidates: [],
    femaleCandidates:[],
    scores: []
};

export default function candidatelistingreducers(state=initialState, action={}) {

    switch (action.type) {
        case types.LOAD_MALE_AND_FEMALE_CANDIDATES_SUCCESS:
            return update(state,{
               maleCandidates:{
                   $set:action.maleCandidates
               },
               femaleCandidates:{
                   $set:action.femaleCandidates
               },
            });
        case types.LOAD_SCORES_SUCCESS:
            return update(state,{
               scores:{
                   $set:action.scores
               }
            });
        default :
            return state;
    }
}