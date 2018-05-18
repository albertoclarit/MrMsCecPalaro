import * as types from '../constants/FinalRoundScoringActionTypes.js';
import _ from 'lodash'
import update from 'react-addons-update'

const initialState={
  candidates:[],
  activeCandidate:-1, // index ni,
  currentScore:{},
  allScores:[]
};

export default function finalroundscoringreducers (state=initialState,action={}) {
  switch (action.type) {

    case types.FINALROUND_PREVIOUS_CANDIDATE:
        return update(state, {
            activeCandidate: {
                $set: action.candidateIndex
            }
        });

    case types.FINALROUND_NEXT_CANDIDATE:
        return update(state, {
            activeCandidate: {
                $set: action.candidateIndex
            }
        });

    case types.LOAD_FINALROUND_SCORE_SUCCESS:
        return update(state, {
            currentScore:{
                $set:action.scoredata
            }
        });
    case types.LOAD_FINALROUND_CANDIDATES_SUCCESS:
        return update(state,{
            candidates:{
                $set:action.candidates
            },
            activeCandidate:{
                $set: 0
            }
        });
    case types.LOAD_ALL_FINALROUND_SCORES_SUCCESS:
        return update(state,{
          allScores: {
            $set: action.allScores
          }
        })
    default:
        return state
}
}