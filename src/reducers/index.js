import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import candidatelistingreducers from './candidatelistingreducers'
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import femalescoringreducers from './femalescoringreducers';
import malescoringreducers from './malescoringreducers';

const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  candidatelisting: candidatelistingreducers,
  routing,
  healthchecks,
  auth:authreducers,
  femalescoring: femalescoringreducers,
  malescoring : malescoringreducers
});

export default rootReducer;
