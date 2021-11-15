import {REDUCER_TYPE} from '@constants';

export const saveUserInfo = (state = '', action) => {
  switch (action.type) {
    case REDUCER_TYPE.SAVE_USER_INFO:
      return action.data;
    default: {
      return state;
    }
  }
};
