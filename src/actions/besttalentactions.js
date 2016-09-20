import * as types from '../constants/BestTalentActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadbesttalentmale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/besttalentmale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbesttalentmaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbesttalentmaleSuccess = (records)=>{

 return {
     type:types.LOAD_BEST_TALENT_SUCCESS,
     records
 }

};