/**
 * Created by albertoclarit on 9/18/16.
 */

import  * as types  from '../constants/FemaleScoringConstants';
import  update from 'react-addons-update';

const initialState={

    candidates:[],
    activeCandidate:-1, // index ni,
    currentScore:{},
    allScores:[],
    control: {}
};

export default function femalescoringreducers(state=initialState, action={}) {

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

        case types.LOAD_FEMALE_CANDIDATES_SUCCESS:
            return update(state,{
                candidates:{
                    $set:action.candidates
                },
                activeCandidate:{
                    $set: 0
                }
            });
        case types.LOAD_ALL_SCORES_SUCCESS:
            return update(state,{
              allScores: {
                $set: action.allScores
              }
            })
        case types.CONTROL_GET_STATUS:
            return _.assign({},state,{
              control: action.control
            })
        default:
            return state
    }
}