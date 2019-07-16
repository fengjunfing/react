const THISACTION = 'DICT' + '_';
import { transToThunk } from '@/util';

const thunk = {
  getData: transToThunk(THISACTION + 'GET_DATA'),
};

const getData = () => dispatch => dispatch({
  [THISACTION + 'GET']: {
    types: Object.values(thunk.getData),
    url: 'dictManager/dictList',
    params: {
      status: 'y',
    }
  }
});

export default {
  thunk, // 以下为接口调用
  getData,
};