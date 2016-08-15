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
import './App.css'
import './styles/bootstrap.css'


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
                <IndexRoute component={Welcome}/>
            </Route>
            <Route path="/" component={App}>
                <Route path="logIn" component={LogIn}/>
                <Route path="admin" component={Admin}/>
                <IndexRoute component={Welcome}/>
            </Route>


        </Router>
    </Provider>

);


ReactDOM.render(Components,document.getElementById('root'));
