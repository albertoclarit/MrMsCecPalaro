import * as types from '../constants/FinalRoundActionTypes';
import axios from 'axios'
import * as dialogActions from './dialogactions'


export let resetFinalroundScore = () => {
  
  return dispatcher => {
    axios.get('/api/finalround/resetscores')
      .then(function (response) {
          dispatcher(dialogActions.openAlert('Scores was successfully reset','Reset','success'));
      })
      .catch(function (error) {
          dispatcher(dialogActions.openAlert('Scores failed to reset','Reset','danger'));
      });

  }

}

export const checkStatus = () => {
  return (dispatcher,getState) => {
    axios.get('/api/finalround/status')
      .then((status) => {
        dispatcher({
          type: types.FINAL_ROUND_STATUS,
          status: status.data.status
        })
        if(status.data.status){
          dispatcher(getFinalRoundScores())
        }
      }).catch((err) => {
        console.log(err);
      })
  }
}

export const startFinalRound = () =>{

  return (dispatcher,getState)=>{

    axios.post('/api/finalround/startfinalround')
      .then(()=>{
        dispatcher(checkStatus())
      }).catch(err=>{
          console.log(err)
      })
  }

}

export const getFinalRoundScores = ()=> {
  return (dispatcher,getState) => {
    axios.get('/api/finalround/scores')
      .then(result =>{
          let {data} = result
          dispatcher({
            type: types.FINAL_ROUND_GETSCORES_SUCCESS,
            data
          })
      }).catch(err =>{
          console.log(err)
      })
  }
}


