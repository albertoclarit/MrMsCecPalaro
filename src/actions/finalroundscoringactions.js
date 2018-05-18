/**
 * Created by albertoclarit on 9/18/16.
 */
import * as types from '../constants/FinalRoundScoringActionTypes';
import axios from 'axios'
import * as dialogActions  from './dialogactions';
import Promise from 'bluebird'
import objectAssign from 'object-assign'

export let loadFinalroundCandidates = (judgeno,event)=>{

    return dispatcher=>{


        Promise.coroutine( function *(){

            var response =  yield axios.get('/api/finalround/candidates');

            var allFemales = response.data

            var firstItem = null;

             if(allFemales.length >0)
                 firstItem = allFemales[0];


            if(firstItem != null){
                response =  yield axios.get('/api/finalroundscore/getByJudgeAndCandidateAndGender',{
                    params:{
                        judgeno,
                        candidateno:firstItem.candidateNo,
                        gender:firstItem.gender,
                        event
                    }
                });
                console.log(response.data);

                var scoredata = response.data;
                return {
                    allFemales,
                    firstItem,
                    scoredata
                }
            }
            else {

                return {
                    allFemales
                }
            }



        })().then((data)=>{


            dispatcher(loadFinalroundCandidatesSuccess(data.allFemales));
            dispatcher(loadFinalroundDataSuccess(data.scoredata));

        }).catch((err)=>{
            console.log(err);

        });

    };

};

export let loadFinalroundCandidatesSuccess  = (femaleCandidates)=>{

    return {
        type: types.LOAD_FINALROUND_CANDIDATES_SUCCESS,
        candidates: femaleCandidates
    }

};


export let loadFinalroundScores=( judgeno,
                       candidateno,
                       gender,
                       event)=>{

    return dispatch =>{

        Promise.coroutine( function *(){
            var response =  yield axios.get('/api/finalroundscore/getByJudgeAndCandidateAndGender',{
                params:{
                    judgeno,
                    candidateno,
                    gender,
                    event
                }
            });

            var scoredata = response.data;

            return scoredata
        })().then((data)=>{

            dispatch(loadFinalroundDataSuccess(data));

        }).catch((err)=>{
            console.log(err);
        });



    };
};

export let loadFinalroundDataSuccess=(scoredata)=>{

    return {
        type:types.LOAD_FINALROUND_SCORE_SUCCESS,
        scoredata
    }
};

export let nextCandidate= (candidateIndex)=>{

    return (dispatch,getState) =>{
        var {finalroundscoring} = getState();
        var {auth} = getState();

        var targetCandidate = finalroundscoring.candidates[candidateIndex];

        dispatch(loadFinalroundScores(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender,auth.account.event));
        dispatch(nextCandidateSuccess(candidateIndex));
    };
};

export let nextCandidateSuccess= (candidateIndex)=>{

    return {
        type:types.FINALROUND_NEXT_CANDIDATE,
        candidateIndex
    }
};

export let previousCandidate= (candidateIndex)=>{

    return (dispatch,getState) =>{
        var {finalroundscoring} = getState();
        var {auth} = getState();

        var targetCandidate = finalroundscoring.candidates[candidateIndex];

        dispatch(loadFinalroundScores(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender,auth.account.event));
        dispatch(previousCandidateSuccess(candidateIndex));
    };

};

export let previousCandidateSuccess= (candidateIndex)=>{
    return {
        type:types.FINALROUND_PREVIOUS_CANDIDATE,
        candidateIndex
    }
};


export let updateAndSave = (name,value,eventName)=>{

    return (dispatch,getState)=>{

        Promise.coroutine( function *(){

            var {finalroundscoring} = getState();
            var currentScore = objectAssign({},finalroundscoring.currentScore);
            currentScore[name] = value;

            var response = axios.put('/api/finalroundscore/'+ currentScore.id,currentScore);

            return currentScore;

        })().then((data)=>{

            dispatch(loadFinalroundDataSuccess(data));

        }).catch((err)=>{
            console.log(err);
        });

    }

};

export const loadAllfinalroundScores = () => {
  return (dispatcher, getState) => {
    let {account} = getState().auth
    axios.get('/api/finalroundscore/loadAllScoresByJudge',{
      params:{
        judgeNo: account.judgeNo,
      }
    }).then((response) => {
      let {data} = response

      let allScores = data.map((element, index) => {
        element.avatar = element.candidateNo -1
        return (
          element
        )
      })
      dispatcher({
        type: types.LOAD_ALL_FINALROUND_SCORES_SUCCESS,
        allScores
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}
