import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {saveNetwork} from './networkReducer';

const rootReducer = combineReducers({
  isOnline: saveNetwork,
});

export default createStore(rootReducer, applyMiddleware(thunk));
