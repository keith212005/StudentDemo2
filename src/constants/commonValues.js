export const constant = {
  ENGLISH_LANG: 'english',
  IOS: 'IOS',
  ANDROID: 'ANDROID',
};

export var fieldObject = error => {
  return {value: '', isError: false, errorText: error, isFocus: false};
};

export var loginFields = {
  loading: false,
  username: fieldObject,
  password: fieldObject,
  secureTextEntry: true,
};
