import {REDUCER_TYPE} from '@constants';

export const saveUserInfo = params => ({
  type: REDUCER_TYPE.SAVE_USER_INFO,
  data: params,
});

export const resetUserInfo = params => ({
  type: REDUCER_TYPE.SAVE_USER_INFO,
  data: {},
});
