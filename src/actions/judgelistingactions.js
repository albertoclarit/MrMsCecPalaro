/**
 * Created by albertoclarit on 8/15/16.
 */
import * as types from '../constants/JudgeListingActionTypes';
import axios from 'axios'
import * as dialogActions  from '../actions/dialogactions';
import { routerActions } from 'react-router-redux'


export let deleteJudge = (id)=>{

    return dispatcher=>{



            axios.delete('/api/judges/'+ id)
                .then(function (response) {
                    dispatcher(routerActions.push("/admin/judgeslist"));
                })
                .catch(function (error) {
                    dispatcher(dialogActions.openAlert("Data Failed to be deleted",'Failed','danger'));
                });
        };
};


export let saveData = ()=>{

    return (dispatcher,getState)=>{

        var {selectedJudge} = getState().judgelisting;

         if(selectedJudge.id){
             axios.put('/api/judges/'+selectedJudge.id, {
                      username: selectedJudge.username,
                     judgeNo:selectedJudge.judgeNo,
                     password:selectedJudge.password,
                     event: selectedJudge.event,
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/admin/judgeslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Edited",'Failed','danger'));
                 });
         }
        else {
             axios.post('/api/judges', {
                     username: selectedJudge.username,
                     judgeNo:selectedJudge.judgeNo,
                     password:selectedJudge.password,
                     event: selectedJudge.event
                 }
             )
                 .then(function (response) {
                     dispatcher(routerActions.push("/admin/judgeslist"));
                 })
                 .catch(function (error) {
                     dispatcher(dialogActions.openAlert("Data Failed to be Added",'Failed','danger'));
                 });
         }


    }

};


export let updateField = (data)=>{

    return {
        type:types.LOAD_JUDGE_UPDATE_FIELD,
        data
    };

};

export let loadJudge = (id)=>{

    return dispatcher=>{

        axios.get('/api/judges/'+id)
            .then(function (response) {
                var data = response.data;

                dispatcher(loadJudgeSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};


export let loadJudgeSuccess= (judge)=>{

    return {
        type: types.LOAD_JUDGE_SUCCESS,
        judge
    }
};


export let loadJudges = ()=>{


    return dispatcher=>{

        axios.get('/api/judges')
            .then(function (response) {
                var data = response.data;

                dispatcher(loadJudgesSuccess(data));

            })
            .catch(function (error) {
                console.log(error);
            });

    };

};

export let loadJudgesSuccess = (records)=>{

    return {
        type: types.LOAD_JUDGES_SUCCESS,
        records
    }
};
