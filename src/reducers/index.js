import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import candidatelistingreducers from './candidatelistingreducers'
import healthchecks from './healthchecks';
import authreducers from './authreducers';


const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  candidatelisting: candidatelistingreducers,
  routing,
  healthchecks,
  auth:authreducers
});

export default rootReducer;
