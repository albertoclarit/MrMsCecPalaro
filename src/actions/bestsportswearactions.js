import * as types from '../constants/BestSportswearActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let loadbestsportswearmale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestsportswearmale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestsportswearmaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestsportswearmaleSuccess = (records)=>{

 return {
     type:types.LOAD_BEST_SPORTSWEAR_SUCCESS,
     records
 }

};



export let loadbestsportswearfemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestsportswearfemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestsportswearfemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestsportswearfemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_SPORTSWEAR_FEMALE_SUCCESS,
        records
    }

};