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
import bestswimsuitreducers from './bestswimsuitreducers';
import bestformalWearreducers from './bestformalWearreducers';
import bestqareducers from './bestqareducers';
import finalrankingreducers from './finalrankingreducers';
import prepageantreducers from './prepageantreducers';
import control from './controlreducers';
import finalround from './finalroundreducers'
import finalroundscoring from './finalroundscoringreducers'

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
  bestswimsuit:bestswimsuitreducers,
  bestformalWear:bestformalWearreducers,
  bestqa:bestqareducers,
  finalranking:finalrankingreducers,
  prepageant: prepageantreducers,
  control,
  finalround,
  finalroundscoring
});

export default rootReducer;
