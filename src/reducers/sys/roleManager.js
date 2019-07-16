import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.ROLE_MANAGER;

const tableInitState = Immutable.fromJS({
  data: [],
  loading: false,
  count: 0,
  searchData: {
    currentPage: 1,
    pageSize: 10,
  },
});

const table = (state = tableInitState, action) => {
  switch (action.type) {
  case thunkTypes.tableGet.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
  case thunkTypes.tableGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'))
      .set('count', action.response.get('count'));
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
      .set('loading', false)
      .set('visible', false);
  case actionTypes.FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.FORM_HIDE:
    return state
      .set('visible', false);
  case actionTypes.FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
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

const configFormInitState = Immutable.fromJS({
  data: {
    menuIds: [],
  },
  originAllMenu: [],
  allMenu: [],
  roleMenu: [],
  visible: false,
  loading: false,
  title: '',
});

const configForm = (state = configFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.configFormGetAllMenu.REQUESTTYPE:
    return state;
  case thunkTypes.configFormGetAllMenu.SUCCESSTYPE:
    const arrToTree = (tree, data, parent) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId === parent) {
          var json = {
            id: data[i].id,
            parentId: data[i].parentId,
            title: data[i].name,
            value: '' + data[i].id,
            key: data[i].id,
            isLeaf: data[i].menuType === 'leaf' ? true : false,
          };
          if (data[i].menuType !== 'leaf') { json.children = []; }
          tree.push(json);
          data.splice(i, 1);
          i--;
          arrToTree(json.children, data, json.id, json.url);
        }
      }
    };
    const newTree = [];
    const result = action.response.get('result').toJS();
    arrToTree(newTree, result, 0, '');
    return state
      .set('originAllMenu', action.response.get('result'))
      .set('allMenu', Immutable.fromJS(newTree));
  case thunkTypes.configFormGetAllMenu.FAILURETYPE:
    return state;
  case thunkTypes.configFormGetMenuByRole.REQUESTTYPE:
    return state;
  case thunkTypes.configFormGetMenuByRole.SUCCESSTYPE:
    return state
      .set('roleMenu', action.response.get('result'))
      .set('data', state.get('data').merge({ menuIds: action.response.get('result').map(t => '' + t.get('menuId')) }));
  case thunkTypes.configFormGetMenuByRole.FAILURETYPE:
    return state;
  case actionTypes.CONFIGFORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.CONFIGFORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.CONFIGFORM_HIDE:
    return state
      .set('visible', false);
  case actionTypes.CONFIGFORM_RESET:
    return state
      .set('data', configFormInitState.get('data'));
  case actionTypes.CONFIGFORM_OPEN_LOADING:
    return state
      .set('loading', true);
  case actionTypes.CONFIGFORM_CLOSE_LOADING:
    return state
      .set('loading', false);
  case thunkTypes.configFormSubmit.REQUESTTYPE:
    return state
      .set('loading', false)
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case thunkTypes.configFormSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.configFormSubmit.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

const funcFormInitState = Immutable.fromJS({
  data: {
    menuIds: [],
  },
  originAllFunc: [],
  allFunc: [],
  roleFunc: [],
  visible: false,
  loading: false,
  title: '',
});

const funcForm = (state = funcFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.funcFormGetAllFunc.REQUESTTYPE:
    return state;
  case thunkTypes.funcFormGetAllFunc.SUCCESSTYPE:
    const arrToTree = (tree, data, parent) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId === parent) {
          var json = {
            id: data[i].id,
            parentId: data[i].parentId,
            title: data[i].name,
            value: '' + data[i].id,
            key: data[i].id,
            isLeaf: data[i].menuType === 'leaf' ? true : false,
          };
          if (data[i].menuType !== 'leaf') { json.children = []; }
          tree.push(json);
          data.splice(i, 1);
          i--;
          arrToTree(json.children, data, json.id, json.url);
        }
      }
    };
    const newTree = [];
    const result = action.response.get('result').toJS();
    arrToTree(newTree, result, 0, '');
    return state
      .set('originAllFunc', action.response.get('result'))
      .set('allFunc', Immutable.fromJS(newTree));
  case thunkTypes.funcFormGetAllFunc.FAILURETYPE:
    return state;
  case thunkTypes.funcFormGetFuncByRole.REQUESTTYPE:
    return state;
  case thunkTypes.funcFormGetFuncByRole.SUCCESSTYPE:
    return state
      .set('roleFunc', action.response.get('result'))
      .set('data', state.get('data').merge({ menuIds: action.response.get('result').map(t => '' + t.get('menuId')) }));
  case thunkTypes.funcFormGetFuncByRole.FAILURETYPE:
    return state;
  case actionTypes.FUNCFORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.FUNCFORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.FUNCFORM_HIDE:
    return state
      .set('visible', false);
  case actionTypes.FUNCFORM_RESET:
    return state
      .set('data', funcFormInitState.get('data'));
  case actionTypes.FUNCFORM_OPEN_LOADING:
    return state
      .set('loading', true);
  case actionTypes.FUNCFORM_CLOSE_LOADING:
    return state
      .set('loading', false);
  case thunkTypes.funcFormSubmit.REQUESTTYPE:
    return state
      .set('loading', false)
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case thunkTypes.funcFormSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.funcFormSubmit.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  table,
  form,
  configForm,
  funcForm,
});