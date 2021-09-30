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

export const getVideoLinks = [
  {
    id: 1,
    name: 'Big Buck Bunny',
    link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    name: 'Big Buck Bunny',
    link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 3,
    name: 'Big Buck Bunny',
    link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
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
