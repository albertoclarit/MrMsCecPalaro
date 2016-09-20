import * as types from '../constants/LoadMaleCandidates';
import axios from 'axios';


export let loadMaleCandidates = ()=>{


    return dispatcher=>{

        axios.get('/api/candidates')
            .then(function (response) {
                var data = response.data;

                 var males = response.data.filter((item)=>{

                if(item.gender==='M')
                    return true;

            });

            var females = response.data.filter((item)=>{

                if(item.gender==='F')
                    return true;

            });
                dispatcher(loadMaleCandidatesSuccess(males,females));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadMaleCandidatesSuccess = (males,females)=>{

    return {
        type: types.LOAD_MALE_AND_FEMALE_CANDIDATES_SUCCESS,
        maleCandidates: males,
        femaleCandidates: females
    }
};

export let loadScores = ()=>{
    
    return dispatcher=>{

        axios.get('/api/scores')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadScoresSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};


export let loadScoresSuccess = (scores)=>{

    return {
        type: types.LOAD_SCORES_SUCCESS,
        scores
    }
};
