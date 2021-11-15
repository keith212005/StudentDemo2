import I18n from 'react-native-i18n';
import {constant} from '@constants';
import {en, es} from './index';

export const changeLanguage = params => {
  I18n.fallbacks = true;

  I18n.translations = {
    en,
    es,
  };

  if (params === constant.ENGLISH_LANG) {
    I18n.locale = 'en';
  } else if (params === constant.SPANISH_LANG) {
    I18n.locale = 'es';
  }
};
