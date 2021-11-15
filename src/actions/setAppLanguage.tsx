import {REDUCER_TYPE} from '@constants';
import {changeLanguage} from '../languages';

export function setAppLanguage(languageCode) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      changeLanguage(languageCode);
      return dispatch({
        type: REDUCER_TYPE.SET_APP_LANGUAGE,
        data: languageCode,
      });
    });
  };
}
