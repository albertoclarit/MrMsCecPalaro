import React from 'react'
import ReactDOM from 'react-dom'
import {hashHistory,
        Route,
        IndexRoute,
        Router} from 'react-router'
    

import App from './App'
import Welcome from './Welcome'
import Judges from './Judges'
import Admin from './Admin'


import './App.css'
import './styles/bootstrap.css'

const Components=(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/judges" component={Judges}/>
            <Route path="/admin" component={Admin}/>
            <IndexRoute component={Welcome}/>
        </Route>
    </Router>
);


ReactDOM.render(Components,document.getElementById('root'));
