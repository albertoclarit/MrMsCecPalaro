import * as types from '../constants/BestFormalwearActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadbestformalWearmale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestformalWearmale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestformalWearmaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestformalWearmaleSuccess = (records)=>{

 return {
     type:types.LOAD_BEST_FORMALWEAR_SUCCESS,
     records
 }

};



export let loadbestformalWearfemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestformalWearfemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestformalWearfemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestformalWearfemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_FORMALWEAR_FEMALE_SUCCESS,
        records
    }

};