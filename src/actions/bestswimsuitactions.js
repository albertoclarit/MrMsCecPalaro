import * as types from '../constants/BestSwimsuitActionTypes';
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



export let loadbestswimsuitfemale = ()=>{

    return dispatcher=>{

        axios.get('/api/scores/bestswimsuitfemale')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadbestswimsuitfemaleSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadbestswimsuitfemaleSuccess = (records)=>{

    return {
        type:types.LOAD_BEST_SWIMSUIT_FEMALE_SUCCESS,
        records
    }

};