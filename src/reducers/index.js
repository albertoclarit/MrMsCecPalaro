import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dialogsreducers from './dialogsreducers'
const rootReducer = combineReducers({
  dialogs:dialogsreducers,
  routing
});

export default rootReducer;
