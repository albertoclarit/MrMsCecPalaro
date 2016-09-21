import * as types from '../constants/FinalRankingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadfinalranking = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/finalranking')
            .then(function (response) {
                var data = response.data;

                var judgeTotal = data.judgeTotal;

                var judgeScores=[];
                for(var i=0;i<judgeTotal;i++){
                    judgeScores.push({
                        judgeNo:(i+1),
                        data:data["judge"+(i+1)]
                        }
                    );

                }

                dispatcher(loadfinalrankingSuccess(data,judgeScores));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadfinalrankingSuccess = (data,judgeScores)=>{

 return {
     type:types.LOAD_FINAL_RANKING_SUCCESS,
     data,
     judgeScores
 }

};



