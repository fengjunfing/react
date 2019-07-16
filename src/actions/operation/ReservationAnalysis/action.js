import THISACTION from './name';

const action = {
  SET_LIST: THISACTION + 'SET_LIST',
};
  
const setList = params => dispatch => dispatch({
  type: action.SET_LIST,
  params,
});
  
export default {
  action,
  setList,
};
