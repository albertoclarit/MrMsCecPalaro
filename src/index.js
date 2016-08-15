import React from 'react'
import ReactDOM from 'react-dom'
import {hashHistory,
        Route,
        IndexRoute,
        Router} from 'react-router'
    

import App from './App'
import Welcome from './Welcome'
import LogIn from './LogIn'
import Admin from './Admin'
import Talent from './Talent'
import Gown from './Gown'
import Sportswear from './Sportswear'
import Witandint from './Witandint'
import Scoreboard from './Scoreboard'
import JudgeList from './components/judges/JudgeList'

import './App.css'
import './styles/bootstrap.css'




const Components=(
    <Router history={hashHistory}>
    
      <Route path="/admin" component={Admin}>
            <Route path="/talent" component={Talent}/>
            <Route path="/gown" component={Gown}/>
            <Route path="/sportswear" component={Sportswear}/>
            <Route path="/witandint" component={Witandint}/>
            <Route path="/scoreboard" component={Scoreboard}/>
            <Route path="/judgeslist" component={JudgeList}/>
            <IndexRoute component={Welcome}/>
        </Route>    
        <Route path="/" component={App}>
                <Route path="logIn" component={LogIn}/>
                <Route path="admin" component={Admin}/>
                <IndexRoute component={Welcome}/>  
        </Route>    
       
        
    </Router>
);


ReactDOM.render(Components,document.getElementById('root'));
