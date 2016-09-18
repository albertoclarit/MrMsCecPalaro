/**
 * Created by albertoclarit on 9/18/16.
 */
import * as types from '../constants/FemaleScoringConstants';
import axios from 'axios'
import * as dialogActions  from './dialogactions';



export let loadFemaleCandidates = ()=>{

    return dispatcher=>{

        axios.get('/api/candidates')
            .then(function (response) {
                var data = response.data;


                var allFemales = data.filter((item)=>{

                    if(item.gender==='F')
                      return true;

                });

                dispatcher(loadFemaleCandidatesSuccess(allFemales));



            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadFemaleCandidatesSuccess  = (femaleCandidates)=>{

    return {
        type: types.LOAD_FEMALE_CANDIDATES_SUCCESS,
        candidates: femaleCandidates
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