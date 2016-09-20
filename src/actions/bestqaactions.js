import * as types from '../constants/BestQaActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadbestqamale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestqamale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestqamaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestqamaleSuccess = (records)=>{

 return {
     type:types.LOAD_BEST_QA_SUCCESS,
     records
 }

};



export let loadbestqafemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestqafemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestqafemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestqafemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_QA_FEMALE_SUCCESS,
        records
    }

};