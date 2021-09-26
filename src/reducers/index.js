import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {saveNetwork} from './networkReducer';
import {isOpenFirstTime} from './isOpenFirstTime';
import {saveUserInfo} from './saveUserInfo';
import {setAppLanguage} from './setAppLanguage';

const rootReducer = combineReducers({
  isOnline: saveNetwork,
  isOpenedFirstTime: isOpenFirstTime,
  user_info: saveUserInfo,
  app_lang: setAppLanguage,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};

export default createStore(rootReducer, applyMiddleware(thunk));
