import {REDUCER_TYPE} from '@constants';

const status = true;
export const isOpenFirstTime = (state = status, action) => {
  switch (action.type) {
    case REDUCER_TYPE.IS_OPEN_FIRST_TIME:
      return action.data;
    default: {
      return state;
    }
  }
};
