import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import candidatelistingreducers from './candidatelistingreducers'
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import femalescoringreducers from './femalescoringreducers';

const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  candidatelisting: candidatelistingreducers,
  routing,
  healthchecks,
  auth:authreducers,
  femalescoring: femalescoringreducers
});

export default rootReducer;
