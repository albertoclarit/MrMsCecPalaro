/**
 * Created by albertoclarit on 9/18/16.
 */

import  * as types  from '../constants/MaleScoringConstants';
import  update from 'react-addons-update';

const initialState={

    candidates:[],
    activeCandidate:-1, // index ni
    currentScore:{}
};

export default function malescoringreducers(state=initialState, action={}) {

    switch (action.type) {

        case types.PREVIOUS_CANDIDATE:
            return update(state, {
                activeCandidate: {
                    $set: action.candidateIndex
                }
            });

        case types.NEXT_CANDIDATE:
            return update(state, {
                activeCandidate: {
                    $set: action.candidateIndex
                }
            });

        case types.LOAD_SCORE_SUCCESS:
            return update(state, {
                currentScore:{
                    $set:action.scoredata
                }
            });

        case types.LOAD_MALE_CANDIDATES_SUCCESS:
            return update(state,{
                candidates:{
                    $set:action.candidates
                },
                activeCandidate:{
                    $set: 0
                }
            });
        default:
            return state
    }
}