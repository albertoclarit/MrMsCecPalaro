/**
 * Created by albertoclarit on 9/18/16.
 */
import * as types from '../constants/FemaleScoringConstants';
import axios from 'axios'
import * as dialogActions  from './dialogactions';
import Promise from 'bluebird'
import objectAssign from 'object-assign'

export let loadFemaleCandidates = (judgeno,event)=>{

    return dispatcher=>{


        Promise.coroutine( function *(){

            var response =  yield axios.get('/api/candidates');

            var allFemales = response.data.filter((item)=>{

                if(item.gender==='F')
                    return true;

            });

            var firstItem = null;

             if(allFemales.length >0)
                 firstItem = allFemales[0];


            if(firstItem != null){
                response =  yield axios.get('/api/scores/getByJudgeAndCandidateAndGender',{
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


            dispatcher(loadFemaleCandidatesSuccess(data.allFemales));
            dispatcher(loadScoreDataSuccess(data.scoredata));

        }).catch((err)=>{
            console.log(err);

        });

    };

};

export let loadFemaleCandidatesSuccess  = (femaleCandidates)=>{

    return {
        type: types.LOAD_FEMALE_CANDIDATES_SUCCESS,
        candidates: femaleCandidates
    }

};


export let loadScore=( judgeno,
                       candidateno,
                       gender,
                       event)=>{

    return dispatch =>{

        Promise.coroutine( function *(){
            var response =  yield axios.get('/api/scores/getByJudgeAndCandidateAndGender',{
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
        var {femalescoring} = getState();
        var {auth} = getState();

        var targetCandidate = femalescoring.candidates[candidateIndex];

        dispatch(loadScore(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender,auth.account.event));
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
        var {femalescoring} = getState();
        var {auth} = getState();

        var targetCandidate = femalescoring.candidates[candidateIndex];

        dispatch(loadScore(auth.account.judgeNo,targetCandidate.candidateNo,targetCandidate.gender,auth.account.event));
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

            var {femalescoring} = getState();
            var currentScore = objectAssign({},femalescoring.currentScore);
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

export const loadAllScores = () => {
  return (dispatcher, getState) => {
    let {account} = getState().auth
    axios.get('/api/scores/loadAllScoresByJudge',{
      params:{
        judgeNo: account.judgeNo,
        event: account.event
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
        type: types.LOAD_ALL_SCORES_SUCCESS,
        allScores
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const getConfirms = () =>{
  return (dispatcher,getState) =>{
    Promise.coroutine( function *(){

      var {account} = getState().auth 

      var adminConfirm = yield axios.get('/api/control/')

      var judgeConfirm = yield axios.get('/api/control/'+account.judgeNo)


      return {
        admin: adminConfirm.data,
        judge: judgeConfirm.data
      }

  })().then(control=>{
      dispatcher({
        type: types.CONTROL_GET_STATUS,
        control
      })
  }).catch(err=>{
      console.log(err)
  })
  }
}
