import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import { filterAllKey } from '@/util';

// const thunkTypes = Actions.MENU.thunk;
const actionTypes = Actions.BREADCRUMB.action;

const initialState = Immutable.fromJS([]);

const list = (state = initialState, action) => {
  switch (action.type) {
  // case thunkTypes.getList.BREADCRUMB_LISTTYPE:
  //   return action.response.result;
  case actionTypes.SET:
    return action.params;
  default:
    return state;
  }
};

const keyInitialState = Immutable.fromJS([]);

const key = (state = keyInitialState, action) => {
  switch (action.type) {
  case actionTypes.KEY:
    return Immutable.fromJS(
      filterAllKey(action.path)
    );
  default:
    return state;
  }
};

export default combineReducers({
  list,
  key,
});