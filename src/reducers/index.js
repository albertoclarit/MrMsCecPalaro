import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import candidatelistingreducers from './candidatelistingreducers'
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import femalescoringreducers from './femalescoringreducers';
import malescoringreducers from './malescoringreducers';
import loadmalecandidatesreducers from './loadmalecandidatesreducers';
import besttalentreducers from './besttalentreducers';
import bestproductionreducers from './bestproductionreducers';
import bestsportswearreducers from './bestsportswearreducers';


const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  candidatelisting: candidatelistingreducers,
  routing,
  healthchecks,
  auth:authreducers,
  femalescoring: femalescoringreducers,
  malescoring : malescoringreducers,
  loadmalecandidates: loadmalecandidatesreducers,
  besttalent:besttalentreducers,
  bestproduction:bestproductionreducers,
  bestsportswear:bestsportswearreducers
});

export default rootReducer;
