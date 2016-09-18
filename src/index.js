import React from 'react'
import ReactDOM from 'react-dom'
import {
        hashHistory,
        Route,
        IndexRoute,
        IndexRedirect,
        Router
       } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

import App from './App'
import Error from './Error'
import Welcome from './Welcome'
import LogIn from './LogIn'
import Admin from './Admin'
import Talent from './components/specialawards/Talent'
import Gown from './components/specialawards/Gown'
import Witandint from './components/specialawards/Witandint'
import Production    from './components/specialawards/Production'
import Sportswear from './components/specialawards/Sportswear'
import Formalwear from './components/specialawards/Formalwear'
import Scoreboard from './Scoreboard'
import JudgeList from './components/judges/JudgeList'
import JudgeEditor from './components/judges/JudgeEditor'
import CandidateList from './components/candidates/CandidateList'
import CandidateEditor from './components/candidates/CandidateEditor'

import Female from './Judges/Female'
import Male from './Judges/Male'

import './App.css'
import './styles/bootstrap.css'
import {requireAuthentication} from './utils/AuthUtils'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const Components=(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin" component={Admin}>
                <Route path="/talent" component={requireAuthentication(Talent,'ROLE_ADMIN')}/>
                <Route path="/production" component={requireAuthentication(Production,'ROLE_ADMIN')}/>
                <Route path="/gown" component={requireAuthentication(Gown,'ROLE_ADMIN')}/>
                <Route path="/sportswear" component={requireAuthentication(Sportswear,'ROLE_ADMIN')}/>
                <Route path="/witandint" component={requireAuthentication(Witandint,'ROLE_ADMIN')}/>
                <Route path="/scoreboard" component={requireAuthentication(Scoreboard,'ROLE_ADMIN')}/>
                <Route path="/judgeslist" component={requireAuthentication(JudgeList,'ROLE_ADMIN')}/>
                <Route path="/judgeslist_add" component={requireAuthentication(JudgeEditor,'ROLE_ADMIN')}/>
                <Route path="/judgeslist/:id" component={requireAuthentication(JudgeEditor,'ROLE_ADMIN')}/>
                <Route path="/candidateslist" component={requireAuthentication(CandidateList,'ROLE_ADMIN')}/>
                <Route path="/candidateslist_add" component={requireAuthentication(CandidateEditor,'ROLE_ADMIN')}/>
                <Route path="/candidateslist/:id" component={requireAuthentication(CandidateEditor,'ROLE_ADMIN')}/>
                <IndexRedirect to="/talent" />
            </Route>
            <Route path="/" component={App}>
                <Route path="login" component={LogIn}/>
                <Route path="accessdenied" component={Error}/>
                <Route path="male" component={requireAuthentication(Male,'ROLE_JUDGE')}/>
                <Route path="female" component={requireAuthentication(Female,'ROLE_JUDGE')}/>
                <IndexRedirect  to="/female"/>
            </Route>
        </Router>
    </Provider>

);


ReactDOM.render(Components,document.getElementById('root'));
