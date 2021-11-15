import {REDUCER_TYPE} from '@constants';

export const isOpenFirstTime = params => ({
  type: REDUCER_TYPE.IS_OPEN_FIRST_TIME,
  data: params,
});
