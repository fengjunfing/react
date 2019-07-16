import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.FUNCTION_MANAGER;

const tableInitState = Immutable.fromJS({
  data: [],
  loading: false,
  searchData: {},
});

function arrToTree(tree, data, parent) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].parentId === parent) {
      if (data[i].menuType !== 'leaf') { data[i].children = []; }
      var json = Object.assign({}, data[i]);
      tree.push(json);
      data.splice(i, 1);
      i--;
      arrToTree(json.children, data, json.id);
    }
  }
}

const table = (state = tableInitState, action) => {
  switch (action.type) {
  case thunkTypes.tableGet.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
  case thunkTypes.tableGet.SUCCESSTYPE:
    const newTree = [];
    const result = action.response.get('result').toJS();
    arrToTree(newTree, result, 0, '');
    return state
      .set('loading', false)
      .set('data', Immutable.fromJS(newTree));
  case thunkTypes.tableGet.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.tableRemove.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.tableRemove.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.tableRemove.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

const formInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  menuTree: [],
  title: '',
});

const form = (state = formInitState, action) => {
  switch (action.type) {
  case thunkTypes.formGet.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.formGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.formGet.FAILURETYPE:
    return state
      .set('loading', true)
      .set('visible', false);
  case actionTypes.FORM_MENUTREE:
    const menuTree = [];
    const recursion = (t, newTree) => {
      t.forEach((item, i) => {
        newTree.push({
          title: item.name,
          value: '' + item.id,
          key: item.id,
          isLeaf: item.menuType === 'leaf' ? true : false,
          disabled: item.menuType === 'leaf' || item.id === action.opt.formId ? true : false,
        });
        if (item.children && item.id !== action.opt.formId) {
          newTree[i].children = [];
          recursion(item.children, newTree[i].children);
        }
      });
    };
    recursion(action.opt.originTree.toJS(), menuTree);
    return state
      .set('menuTree', Immutable.fromJS([{
        title: '根目录',
        value: '0',
        key: 0,
        isLeaf: false,
        disabled: false,
        children: menuTree,
      }]));
  case actionTypes.FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.FORM_SETDATA:
    return state
      .set('data', Immutable.fromJS(action.params));
  case actionTypes.FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.FORM_HIDE:
    return state
      .set('visible', false);
  case thunkTypes.formSubmit.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case thunkTypes.formSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.formSubmit.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  table,
  form
});