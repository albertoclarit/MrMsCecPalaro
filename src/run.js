import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory,
        Route,
        Router} from 'react-router'
    

import App from './App'
import Home from './Home'

import './App.css'
import './home.css'
import '../styles/bootstrap.css'

const Components=(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/home" component={Home}/>
    </Router>
)

ReactDOM.render(Components,document.getElementById('app')); 
