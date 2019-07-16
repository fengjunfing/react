import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import { filterAllKey, arrToTree } from '@/util';
import defaultMenuType from '@/publicData/menuType';

const thunkTypes = Actions.MENU.thunk;
const actionTypes = Actions.MENU.action;

const initialState = Immutable.fromJS({
  data: [],
  breadCrumb: [],
});

const list = (state = initialState, action) => {
  switch (action.type) {
  case thunkTypes.getList.REQUESTTYPE:
    return state;
  case thunkTypes.getList.SUCCESSTYPE:
    const data = [];
    const breadCrumb = [];
    const result = action.response.get('result').toJS();
    arrToTree(data, result, 0, '', 0, breadCrumb);
    return state
      .set('data', Immutable.fromJS(data))
      .set('breadCrumb', Immutable.fromJS(breadCrumb));
  case thunkTypes.getList.FAILURETYPE:
    return state;
  default:
    return state;
  } 
};

const type = (state = localStorage.getItem('menuType') || defaultMenuType, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_TYPE:
    localStorage.setItem('menuType', action.menuType);
    return action.menuType;
  default:
    return state;
  }
};

const key = (state = [], action) => {
  switch (action.type) {
  case actionTypes.KEY:
    return filterAllKey(action.path);
  default:
    return state;
  }
};

const collapsed = (state = localStorage.getItem('menuCollapsed') ? JSON.parse(localStorage.getItem('menuCollapsed')) : false, action) => {
  switch (action.type) {
  case actionTypes.COLLAPSED:
    localStorage.setItem('menuCollapsed', action.bool);
    return action.bool;
  default:
    return state;
  }
};

export default combineReducers({
  list,
  type,
  key,
  collapsed
});