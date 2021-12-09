import NetInfo from '@react-native-community/netinfo';
import {REDUCER_TYPE} from '@constants';

// Network connetion listenr
export function networkListener() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      NetInfo.addEventListener(state => {
        resolve(state.isConnected);
        return dispatch({
          type: REDUCER_TYPE.NETWORK_STATUS,
          isOnline: state.isConnected,
        });
      });
    });
  };
}
