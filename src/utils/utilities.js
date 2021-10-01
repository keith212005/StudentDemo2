import moment from 'moment';

//compare one value to multiples value
export const isValueOneOfThem = (value, data) => data.indexOf(value) !== -1;

//check string is empty or not
export const isEmpty = text => {
  try {
    // if (text != "" && text != undefined && text.trim().length > 0) {
    if (text === [] || text === '' || text === undefined || text === null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log('catch error at isEmpty in utility >>>>> ', e);
  }
};

export const isEmptyObject = obj => {
  try {
    return Object.keys(obj).length === 0;
  } catch (e) {
    console.log('catch error at isEmptyObject in utility >>>>> ', e);
  }
};

// check email is valid or not
export const isInvalidEmail = email => {
  const CHECK_EMAIL =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))|((([a-zA-Z\-0-9]+\.){1,2})[a-zA-Z]{2,}))$/;

  if (CHECK_EMAIL.test(email.trim()) === 0) {
    return true;
  }
  return false;
};

export const formatMusicTime = position => {
  if (position < 10) {
    return '0' + ':0' + parseInt(position);
  }
  if (position < 60) {
    return '0' + ':' + parseInt(position);
  } else {
    return (position / 60).toFixed(2);
  }
};

export const getTrackDuation = seconds => {
  return (seconds / 60).toFixed(2);
};
