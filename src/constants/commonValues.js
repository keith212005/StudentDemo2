export const constant = {
  IOS: 'IOS',
  ANDROID: 'ANDROID',
  ENGLISH_LANG: 'en',
  SPANISH_LANG: 'es',
  HINDI_LANG: 'hi',
  FRENCH_LANG: 'fr',
};

export const getLanguages = [
  {language: 'English', code: 'en'},
  {language: 'Spanish', code: 'es'},
];

export var fieldObject = error => {
  return {value: '', isError: false, errorText: error, isFocus: false};
};

export var loginFields = {
  loading: false,
  username: fieldObject,
  password: fieldObject,
  secureTextEntry: true,
};
