import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
import judgelistingreducers from './judgelistingreducers'
import candidatelistingreducers from './candidatelistingreducers'
<<<<<<< HEAD
=======
import healthchecks from './healthchecks';
import authreducers from './authreducers'


>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  judgelisting: judgelistingreducers,
  candidatelisting: candidatelistingreducers,
<<<<<<< HEAD
  routing
=======
  routing,
  healthchecks,
  auth:authreducers
>>>>>>> 2bf44f8fd9742a6e4944e3209de249fbc66acc13
});

export default rootReducer;
