import * as types from '../constants/FinalRankingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadfinalranking = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/finalranking')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadfinalrankingSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadfinalrankingSuccess = (data)=>{

 return {
     type:types.LOAD_FINAL_RANKING_SUCCESS,
     data
 }

};



