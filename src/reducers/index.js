import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import movielistingreducers from './movielistingreducers'
import healthchecks from './healthchecks';
import authreducers from './authreducers';
import femalescoringreducers from './femalescoringreducers';
import malescoringreducers from './malescoringreducers';
import loadmalecandidatesreducers from './loadmalecandidatesreducers';
import besttalentreducers from './besttalentreducers';
import bestproductionreducers from './bestproductionreducers';
import bestsportswearreducers from './bestsportswearreducers';
import bestformalWearreducers from './bestformalWearreducers';
import bestqareducers from './bestqareducers';
import finalrankingreducers from './finalrankingreducers';


const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  movielisting: movielistingreducers,
  routing,
  healthchecks,
  auth:authreducers,
  femalescoring: femalescoringreducers,
  malescoring : malescoringreducers,
  loadmalecandidates: loadmalecandidatesreducers,
  besttalent:besttalentreducers,
  bestproduction:bestproductionreducers,
  bestsportswear:bestsportswearreducers,
  bestformalWear:bestformalWearreducers,
  bestqa:bestqareducers,
  finalranking:finalrankingreducers
});

export default rootReducer;
