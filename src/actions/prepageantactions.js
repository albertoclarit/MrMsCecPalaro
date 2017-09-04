import * as types from '../constants/PrepageantActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadprepageantmale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/prepageantmale')
            .then(function (response) {
                var data = response.data;
                dispatcher(loadprepageantSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadprepageantSuccess = (records)=>{
  console.log(records);

 return {
     type:types.LOAD_BEST_PREPAGEANT_SUCCESS,
     records
 }

};



export let loadprepageantfemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/prepageantfemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadrrepageantfemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadrrepageantfemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_PREPAGEANT_FEMALE_SUCCESS,
        records
    }

};
