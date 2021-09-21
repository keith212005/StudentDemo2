import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {saveNetwork} from './networkReducer';
import {isOpenFirstTime} from './isOpenFirstTime';
import {saveUserInfo} from './saveUserInfo';

const rootReducer = combineReducers({
  isOnline: saveNetwork,
  isOpenedFirstTime: isOpenFirstTime,
  user_info: saveUserInfo,
});

export default createStore(rootReducer, applyMiddleware(thunk));
