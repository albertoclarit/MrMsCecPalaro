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
import Talent from './Talent'
import Production    from './Production'
import Sportswear from './Sportswear'
import Formalwear from './Formalwear'
import Scoreboard from './Scoreboard'
import JudgeList from './components/judges/JudgeList'
import JudgeEditor from './components/judges/JudgeEditor'
import CandidateList from './components/candidates/CandidateList'
import CandidateEditor from './components/candidates/CandidateEditor'
<<<<<<< HEAD
import Judges from './Judges/Judges'
=======
import Female from './Judges/Female'
import Male from './Judges/Male'
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
import './App.css'
import './styles/bootstrap.css'
import {requireAuthentication} from './utils/AuthUtils'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const Components=(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin" component={Admin}>
<<<<<<< HEAD
                <Route path="/talent" component={Talent}/>
                <Route path="/production" component={Production}/>
                <Route path="/sportswear" component={Sportswear}/>
                <Route path="/formalwear" component={Formalwear}/>
                <Route path="/scoreboard" component={Scoreboard}/>
                <Route path="/judgeslist" component={JudgeList}/>
                <Route path="/judgeslist_add" component={JudgeEditor}/>
                <Route path="/judgeslist/:id" component={JudgeEditor}/>
                <Route path="/candidateslist" component={CandidateList}/>
                <Route path="/candidateslist_add" component={CandidateEditor}/>
                <Route path="/candidateslist/:id" component={CandidateEditor}/>
                <IndexRoute component={Welcome}/>
=======
                <Route path="/talent" component={requireAuthentication(Talent,'ROLE_ADMIN')}/>
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
>>>>>>> 98d3559220b1b8cdf40e80ee6ccfc1b5ff2c46d1
            </Route>
            <Route path="/" component={App}>
<<<<<<< HEAD
                <Route path="logIn" component={LogIn}/>
                <Route path="admin" component={Admin}/>
                <Route path="judges" component={Judges}/>
                <IndexRoute component={Welcome}/>
=======
                <Route path="login" component={LogIn}/>
                <Route path="accessdenied" component={Error}/>
                <Route path="male" component={Male}/>
                <Route path="female" component={Female}/>
                <IndexRedirect   to="/female"/>
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
            </Route>
        </Router>
    </Provider>

);


ReactDOM.render(Components,document.getElementById('root'));
