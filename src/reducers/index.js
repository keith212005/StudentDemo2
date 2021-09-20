import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {saveNetwork} from './networkReducer';
import {isOpenFirstTime} from './isOpenFirstTime';

const rootReducer = combineReducers({
  isOnline: saveNetwork,
  isOpenedFirstTime: isOpenFirstTime,
});

export default createStore(rootReducer, applyMiddleware(thunk));
