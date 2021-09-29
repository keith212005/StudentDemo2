import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {REDUCER_TYPE} from '@constants';
import {saveNetwork} from './networkReducer';
import {isOpenFirstTime} from './isOpenFirstTime';
import {saveUserInfo} from './saveUserInfo';
import {setAppLanguage} from './setAppLanguage';
import {setDarkTheme} from './setDarkTheme';

const appReducer = combineReducers({
  isOnline: saveNetwork,
  isOpenedFirstTime: isOpenFirstTime,
  user_info: saveUserInfo,
  app_lang: setAppLanguage,
  isDarkTheme: setDarkTheme,
});

const rootReducer = (state, action) => {
  if (action.type === REDUCER_TYPE.RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['isDarkTheme'], // navigation will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
