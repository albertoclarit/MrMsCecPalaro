/**
 * Created by albertoclarit on 9/18/16.
 */
import * as types from '../constants/MaleScoringConstants';
import axios from 'axios'
import * as dialogActions  from './dialogactions';



export let loadMaleCandidates = ()=>{

    return dispatcher=>{

        axios.get('/api/candidates')
            .then(function (response) {
                var data = response.data;


                var allMales = data.filter((item)=>{

                    if(item.gender==='M')
                      return true;

                });

                dispatcher(loadMaleCandidatesSuccess(allMales));



            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadMaleCandidatesSuccess  = (maleCandidates)=>{

    return {
        type: types.LOAD_MALE_CANDIDATES_SUCCESS,
        candidates: maleCandidates
    }

};

export let nextCandidate= (candidateIndex)=>{

    return {
        type:types.NEXT_CANDIDATE,
        candidateIndex
    }
};

export let previousCandidate= (candidateIndex)=>{
    return {
        type:types.PREVIOUS_CANDIDATE,
        candidateIndex
    }
};