const THISACTION = 'TABS' + '_';

const action = {
  SET: THISACTION + 'SET',
  ADD: THISACTION + 'ADD',
  REMOVE: THISACTION + 'REMOVE',
  RESERVE: THISACTION + 'RESERVE',
  CLEAR: THISACTION + 'CLEAR'
};

const set = params => dispatch => dispatch({
  type: action.SET,
  params,
});

const add = tab => dispatch => dispatch({
  type: action.ADD,
  tab
});

const remove = path => dispatch => dispatch({
  type: action.REMOVE,
  path
});

const reserve = tab => dispatch => dispatch({
  type: action.RESERVE,
  tab
});

const clear = () => dispatch => dispatch({
  type: action.CLEAR,
});

export default {
  action, // 以下为修改数据
  set,
  add,
  remove,
  reserve,
  clear,
};