import I18n from 'react-native-i18n';
import {english, currency_symbols} from './index';

export const localize = (name, params = {}) => {
  I18n.fallbacks = true;
  I18n.translations = {
    en: english,
  };

  var currentLocal = I18n.currentLocale();

  return I18n.t(name, params);
};

export const getCurrencySymbol = (currency_name) => {
  if (currency_symbols.hasOwnProperty(currency_name)) {
    return currency_symbols[currency_name];
  } else {
    return '';
  }
};
