/**
 * Created by albertoclarit on 9/18/16.
 */
import * as types from '../constants/MaleScoringConstants';
import axios from 'axios'
import * as dialogActions  from './dialogactions';
import Promise from 'bluebird'
import objectAssign from 'object-assign'


export let loadMaleCandidates = (judgeno)=>{

    return dispatcher=>{


        Promise.coroutine( function *(){

            var response =  yield axios.get('/api/candidates');

            var allMales = response.data.filter((item)=>{

                if(item.gender==='M')
                    return true;

            });

            var firstItem = null;

            if(allMales.length >0)
                firstItem = allMales[0];


            if(firstItem != null){
                response =  yield axios.get('/api/scores/getByJudgeAndCandidateAndGender',{
                    params:{
                        judgeno,
                        candidateno:firstItem.candidateNo,
                        gender:firstItem.gender
                    }
                });

                var scoredata = response.data;
                return {
                    allMales,
                    firstItem,
                    scoredata
                }
            }
            else {

                return {
                    allMales
                }
            }



        })().then((data)=>{


            dispatcher(loadMaleCandidatesSuccess(data.allMales));
            dispatcher(loadScoreDataSuccess(data.scoredata));

        }).catch((err)=>{
            console.log(err);

        });



    };

};

export let loadMaleCandidatesSuccess  = (maleCandidates)=>{

    return {
        type: types.LOAD_MALE_CANDIDATES_SUCCESS,
        candidates: maleCandidates
    }

};

export let loadScore=( judgeno,
                       candidateno,
                       gender)=>{

    return dispatch =>{

        Promise.coroutine( function *(){
            var response =  yield axios.get('/api/scores/getByJudgeAndCandidateAndGender',{
                params:{
                    judgeno,
                    candidateno,
                    gender
                }
            });

            var scoredata = response.data;

            return scoredata
        })().then((data)=>{

            dispatch(loadScoreDataSuccess(data));

        }).catch((err)=>{
            console.log(err);
        });



    };
};


export let loadScoreDataSuccess=(scoredata)=>{

    return {
        type:types.LOAD_SCORE_SUCCESS,
        scoredata
    }
};


export let nextCandidate= (candidateIndex)=>{

    return (dispatch,getState) =>{
        var {malescoring} = getState();
        var {auth} = getState();

        var targetCandidate = malescoring.candidates[candidateIndex];

        dispatch(loadScore(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender));
        dispatch(nextCandidateSuccess(candidateIndex));
    };
};

export let nextCandidateSuccess= (candidateIndex)=>{

    return {
        type:types.NEXT_CANDIDATE,
        candidateIndex
    }
};

export let previousCandidate= (candidateIndex)=>{

    return (dispatch,getState) =>{
        var {malescoring} = getState();
        var {auth} = getState();

        var targetCandidate = malescoring.candidates[candidateIndex];

        dispatch(loadScore(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender));
        dispatch(previousCandidateSuccess(candidateIndex));
    };

};

export let previousCandidateSuccess= (candidateIndex)=>{
    return {
        type:types.PREVIOUS_CANDIDATE,
        candidateIndex
    }
};


export let updateAndSave = (name,value,eventName)=>{
    return (dispatch,getState)=>{


        Promise.coroutine( function *(){
            console.log(eventName);
            var {malescoring} = getState();
            var currentScore = objectAssign({},malescoring.currentScore);

            currentScore.event = eventName;
            currentScore[name] = value;


            var response = axios.put('/api/scores/'+ currentScore.id,currentScore);

            return currentScore;

        })().then((data)=>{

            dispatch(loadScoreDataSuccess(data));

        }).catch((err)=>{
            console.log(err);
        });








    }

};
