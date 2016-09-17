/**
 * Created by albertoclarit on 1/13/16.
 */
import * as types from '../constants/AuthActionTypes';
import {post,get} from '../utils/RestClient';
import { routerActions } from 'react-router-redux'
import {isInRole} from '../utils/AuthUtils';
import * as  healthchecks from './healthchecks';
import * as dialogactions from './dialogactions'




export let login= (loginstate,targetPath)=>{



    return dispatch => {



        post('/api/authentication',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params:loginstate
        }).then((response)=>{
            dispatch(loginSuccess(targetPath));
        }).catch((error)=>{
            dispatch(loginFailed());
            dispatch(healthchecks.ping());
        });

    }
};

export let loginSuccess= (targetPath,fromRefresh)=>{


    return dispatch => {


        get('/api/account').then((response)=>{
            // refresh CSRF
            dispatch(healthchecks.ping());

            let account = response.data;

            dispatch(accountReceived(account,fromRefresh));

            if(isInRole('ROLE_ADMIN',account.roles) && !fromRefresh)
                dispatch(routerActions.push("/admin"));
            else
                dispatch(routerActions.push(targetPath));

            localStorage.setItem("login",btoa(response.data.login))



        }).catch((error)=>{
            localStorage.removeItem("login");
            // refresh CSRF
            dispatch(healthchecks.ping());
            if(targetPath)
                dispatch(routerActions.push("/login?targetPath="+targetPath)); // go back to login
            else{
                dispatch(routerActions.push("/login"));
            }
        });

    };

};

export let accountReceived = (account,fromRefresh)=>{

    return {
        type: types.AUTH_ACCOUNTRECIEVE,
        account:account,
        fromRefresh:fromRefresh
    }
};

export let loginFailed = ()=>{

    return {
        type: types.AUTH_LOGIN_FAILED
    }
};



export let logout= ()=>{

    return dispatch => {
        post('/api/logout',{},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            localStorage.removeItem("login");
            dispatch(routerActions.push("/login"));
            dispatch(logoutSuccess());
            dispatch(healthchecks.ping());
        }).catch((error)=>{
            localStorage.removeItem("login");
            dispatch(logoutSuccess());
            dispatch(routerActions.push("/login"));
            dispatch(healthchecks.ping());
        });

    }
};



export let logoutSuccess= ()=>{

    return {
        type: types.AUTH_LOGOUT_SUCCESS
    }

};


