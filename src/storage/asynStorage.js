import AsyncStorage from '@react-native-async-storage/async-storage';
import {storageKey} from '@constants';

//store data in local storage
export const setMultipleAsyncStorage = data => {
  return new Promise((resolve, rejcet) => {
    AsyncStorage.multiSet(data)
      .then(() => {
        resolve(true);
      })
      .catch(error => reject(error));
  });
};

//get data from local storage
export const getMultipleAsyncStorage = data => {
  return new Promise((resolve, rejcet) => {
    AsyncStorage.multiGet(data)
      .then(value => {
        resolve(value);
      })
      .catch(error => reject(error));
  });
};

// remove Data from async Storage
export const removeData = async keys => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiRemove(keys)
      .then(() => {
        resolve(true);
      })
      .catch(error => reject(error));
  });
};

//get data from local storage
export const clearAsynStorage = data => {
  return new Promise((resolve, rejcet) => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => resolve(true));
  });
};
