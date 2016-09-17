import * as types from '../constants/CandidateListingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let deleteCandidate = (id)=>{

    return dispatcher=>{



            axios.delete('/api/candidates/'+ id)
                .then(function (response) {
                    dispatcher(routerActions.push("/candidateslist"));
                })
                .catch(function (error) {
                    dispatcher(dialogActions.openAlert("Data Failed to be deleted",'Failed','danger'));
                });
        };
};


export let saveData = ()=>{

    return (dispatcher,getState)=>{

        var {selectedCandidate} = getState().candidatelisting;

         if(selectedCandidate.id){
             axios.put('/api/candidates/'+selectedCandidate.id, {
                     candidateNo:selectedCandidate.candidateNo,
                     name: selectedCandidate.name,
                     team: selectedCandidate.team
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/candidateslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Edited",'Failed','danger'));
                 });
         }
        else {
             axios.post('/api/candidates', {
                     candidateNo:selectedCandidate.candidateNo,
                     team: selectedCandidate.team,
                     name: selectedCandidate.name
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/candidateslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Added",'Failed','danger'));
                 });
         }


    }

};


export let updateField = (data)=>{

    return {
        type:types.LOAD_CANDIDATE_UPDATE_FIELD,
        data
    };

};

export let loadCandidate = (id)=>{

    return dispatcher=>{

        axios.get('/api/candidates/'+id)
            .then(function (response) {
                var data = response.data;

                dispatcher(loadCandidateSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};


export let loadCandidateSuccess= (candidate)=>{

    return {
        type: types.LOAD_CANDIDATE_SUCCESS,
        candidate
    }
};


export let loadCandidates = ()=>{


    return dispatcher=>{

        axios.get('/api/candidates')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadCandidatesSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadCandidatesSuccess = (records)=>{

    return {
        type: types.LOAD_CANDIDATES_SUCCESS,
        records
    }
};