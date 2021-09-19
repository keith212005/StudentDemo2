import moment from 'moment';

//compare one value to multiples value
export const isValueOneOfThem = (value, data) => data.indexOf(value) != -1;

export const isEmpty = (text = '') => text.trim().length <= 0;

// check email is valid or not
export const isInvalidEmail = email => {
  const CHECK_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))|((([a-zA-Z\-0-9]+\.){1,2})[a-zA-Z]{2,}))$/;

  if (CHECK_EMAIL.test(email.trim()) == 0) {
    return true;
  }
  return false;
};
