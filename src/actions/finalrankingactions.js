import * as types from '../constants/FinalRankingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let resetscores=()=>{

    return dispatcher=>{

        axios.get('/api/scores/resetscores')
            .then(function (response) {

                dispatcher(dialogActions.openAlert('Scores was successfully reset','Reset','success'));

            })
            .catch(function (error) {
                dispatcher(dialogActions.openAlert('Scores failed to reset','Reset','danger'));
            });

    };
};

export let loadfinalranking = ()=>{

    return dispatcher=>{
        axios.get('/api/scores/finalranking')
            .then(function (response) {
                var data = response.data;

                var coronation = data.coronation;
                var talent = data.talent;
                var prepageant = data.prepageant;

                var judgeScores={
                  coronation:[],
                  talent:[],
                  prepageant:[]
                };

                for(var i=0;i<coronation.judgeTotal;i++){
                    judgeScores.coronation.push({
                        data:data.coronation["judge"+(i+1)]
                        }
                    );

                }

                for(var i=0;i<talent.judgeTotal;i++){
                    judgeScores.talent.push({
                        data:data.talent["judge"+(i+1)]
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
