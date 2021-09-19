import I18n from 'react-native-i18n';
import {storageKey, constant} from '@constants';
import {setMultipleAsyncStorage} from '@storage';
import {english} from './index';

export const changeLanguage = (params) => {
  I18n.fallbacks = true;

  I18n.translations = {
    en: english,
  };

  if (params == constant.ENGLISH_LANG) {
    I18n.locale = 'en';
  } else {
  }

  //set language
  setMultipleAsyncStorage([[storageKey.LANGUAGE, params]]);
};
