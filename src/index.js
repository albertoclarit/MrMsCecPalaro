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
import Talent from './Talent'
import Gown from './Gown'
import Sportswear from './Sportswear'
import Witandint from './Witandint'
import Scoreboard from './Scoreboard'


import './App.css'
import './styles/bootstrap.css'

const Components=(
    <Router history={hashHistory}>
        <Route path="/" component={Admin}>
            <Route path="/talent" component={Talent}/>
            <Route path="/gown" component={Gown}/>
            <Route path="/sportswear" component={Sportswear}/>
            <Route path="/witandint" component={Witandint}/>
            <Route path="/scoreboard" component={Scoreboard}/>
            <IndexRoute component={Welcome}/>
        </Route>
        
        <Route path="/" component={App}>
            <Route path="/judges" component={Judges}/>
            <Route path="/admin" component={Admin}/>
            <IndexRoute component={Welcome}/>
        </Route>
    </Router>
);


ReactDOM.render(Components,document.getElementById('root'));
