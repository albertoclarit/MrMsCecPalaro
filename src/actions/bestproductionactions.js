import * as types from '../constants/BestProductionActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadbestproductionmale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestproductionmale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestproductionmaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestproductionmaleSuccess = (records)=>{

 return {
     type:types.LOAD_BEST_PRODUCTION_SUCCESS,
     records
 }

};



export let loadbestproductionfemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestproductionfemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestproductionfemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestproductionfemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_PRODUCTION_FEMALE_SUCCESS,
        records
    }

};