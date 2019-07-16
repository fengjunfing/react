const THISACTION = 'BREADCRUMB' + '_';

const action = {
  SET: THISACTION + 'SET',
  KEY: THISACTION + 'KEY',
};

const set = params => dispatch => dispatch({
  type: action.SET,
  params,
});

const setKey = path => dispatch => dispatch({
  type: action.KEY,
  path,
});

export default {
  action, // 以下为修改数据
  set,
  setKey,
};