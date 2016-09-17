import React from 'react'
import ReactDOM from 'react-dom'
import {hashHistory,
        Route,
        IndexRoute,
        Router} from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

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
import JudgeEditor from './components/judges/JudgeEditor'
import CandidateList from './components/candidates/CandidateList'
import CandidateEditor from './components/candidates/CandidateEditor'
import Female from './Judges/Female'
import Male from './Judges/Male'
import './App.css'
import './styles/bootstrap.css'

import Error from './Error'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const Components=(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin" component={Admin}>
                <Route path="/talent" component={Talent}/>
                <Route path="/gown" component={Gown}/>
                <Route path="/sportswear" component={Sportswear}/>
                <Route path="/witandint" component={Witandint}/>
                <Route path="/scoreboard" component={Scoreboard}/>
                <Route path="/judgeslist" component={JudgeList}/>
                <Route path="/judgeslist_add" component={JudgeEditor}/>
                <Route path="/judgeslist/:id" component={JudgeEditor}/>
                <Route path="/candidateslist" component={CandidateList}/>
                <Route path="/candidateslist_add" component={CandidateEditor}/>
                <Route path="/candidateslist/:id" component={CandidateEditor}/>
                <IndexRoute component={Welcome}/>
            </Route>
            <Route path="/" component={App}>
                <Route path="logIn" component={LogIn}/>
                <Route path="admin" component={Admin}/>
<<<<<<< HEAD
                <Route path="female" component={Female}/>
                <Route path="male" component={Male}/>
=======
                <Route path="judges" component={Judges}/>
                <Route path="error" component={Error}/>
                
>>>>>>> 85fe011b9e4231a31798dffcc257cfc7485f8dd1
                <IndexRoute component={Welcome}/>
            </Route>


        </Router>
    </Provider>

);


ReactDOM.render(Components,document.getElementById('root'));
