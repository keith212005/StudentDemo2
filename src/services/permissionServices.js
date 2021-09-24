import {Alert} from 'react-native';
import {
  check,
  RESULTS,
  requestMultiple,
  openSettings,
  PERMISSIONS,
} from 'react-native-permissions';
import {localize} from '@languages';

// This function can be used anywhere as it supports multiple permissions.
// It checks for permissions and then requests for it.
export function checkMultiplePermissions(permissions) {
  return new Promise((resolve, reject) => {
    const statuses = requestMultiple(permissions);
    for (var index in permissions) {
      console.log(statuses);
      if (statuses[permissions[index]] !== RESULTS.GRANTED) {
        reject(permissions[index]);
        break;
      }
      resolve();
    }
  });
}

// In case you want to check a single permission
export function checkPermission(permission) {
  console.log('checkperm called....');
  return new Promise(async (resolve, reject) => {
    const result = await check(permission);
    console.log(result);
    switch (result) {
      case RESULTS.GRANTED:
        resolve(result);
        break;
      case RESULTS.DENIED:
        reject(result);
        break;
      case RESULTS.BLOCKED:
        if (
          permission === PERMISSIONS.IOS.LOCATION_ALWAYS ||
          permission === PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ) {
          Alert.alert(localize('SETTINGS'), localize('LOCATION_PERMISSION'), [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: () => openSettings().catch(() => {})},
          ]);
        }
        reject(result);
        break;
      case RESULTS.UNAVAILABLE:
        reject(result);
        break;
    }
  });
}
