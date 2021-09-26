import I18n from 'react-native-i18n';

import {en, es} from './index';

export const localize = (name, params = {}) => {
  I18n.fallbacks = true;
  I18n.translations = {
    en,
    es,
  };

  var currentLocal = I18n.currentLocale();

  return I18n.t(name, params);
};
