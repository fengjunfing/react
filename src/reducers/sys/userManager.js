import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import { base64 } from '@/util';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.USER_MANAGER;

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
  case thunkTypes.tablePublish.REQUESTTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', true) : t));
  case thunkTypes.tablePublish.SUCCESSTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('status', 'y').set('loading', false) : t));
  case thunkTypes.tablePublish.FAILURETYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', false) : t));
  case thunkTypes.tableUnpublish.REQUESTTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', true) : t));
  case thunkTypes.tableUnpublish.SUCCESSTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('status', 'n').set('loading', false) : t));
  case thunkTypes.tableUnpublish.FAILURETYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', false) : t));
  default:
    return state;
  }
};

const formInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  uploadLoading: false,
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
  case actionTypes.FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.FORM_HIDE:
    return state
      .set('visible', false);
  case thunkTypes.formSubmit.REQUESTTYPE:
    if (action.params.password) {
      action.params.password = action.params.confirmPassword = base64.encode(action.params.password);
    }
    action.params.headPortrait = state.getIn(['data', 'headPortrait']);
    delete action.params.upload;
    return state
      .set('loading', true)
      .set('data', Immutable.fromJS(action.params));
  case thunkTypes.formSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.formSubmit.FAILURETYPE:
    let password = {};
    if (state.getIn(['data', 'password'])) {
      password = {
        password: base64.decode(state.getIn(['data', 'password'])),
        confirmPassword: base64.decode(state.getIn(['data', 'password'])),
      };
    }
    return state
      .set('loading', false)
      .set('data', state.get('data').merge(Immutable.fromJS(password)));
  case actionTypes.FORM_OPEN_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', true);
  case actionTypes.FORM_CLOSE_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', false);
  default:
    return state;
  }
};

const passwordFormInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  title: '',
});

const passwordForm = (state = passwordFormInitState, action) => {
  switch (action.type) {
  case actionTypes.PASSWORDFORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.PASSWORDFORM_SHOW:
    return state
      .set('visible', true)
      .set('title',  action.title);
  case actionTypes.PASSWORDFORM_HIDE:
    return state
      .set('visible', false);
  case actionTypes.PASSWORDFORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case thunkTypes.passwordFormSubmit.REQUESTTYPE:
    action.params.password = action.params.confirmPassword = base64.encode(action.params.password);
    return state
      .set('loading', true)
      .set('data',  state.get('data').merge(Immutable.fromJS(action.params)));
  case thunkTypes.passwordFormSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.passwordFormSubmit.FAILURETYPE:
    return state
      .set('loading', false)
      .setIn(['data', 'password'], base64.decode(state.getIn(['data', 'password'])))
      .setIn(['data', 'confirmPassword'], base64.decode(state.getIn(['data', 'password'])));
  default:
    return state;
  }
};

const configFormInitState = Immutable.fromJS({
  data: {
    roleIds: [],
  },
  originAllRole: [],
  allRole: [],
  userRole: [],
  visible: false,
  loading: false,
  title: '',
});

const configForm = (state = configFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.configFormGetAllRole.REQUESTTYPE:
    return state;
  case thunkTypes.configFormGetAllRole.SUCCESSTYPE:
    return state
      .set('originAllRole', action.response.get('result'))
      .set('allRole', action.response.get('result').map(t => t.set('title', t.get('name')).set('key', t.get('id')).set('value', t.get('id'))));
  case thunkTypes.configFormGetAllRole.FAILURETYPE:
    return state;
  case thunkTypes.configFormGetRoleByUser.REQUESTTYPE:
    return state;
  case thunkTypes.configFormGetRoleByUser.SUCCESSTYPE:
    return state
      .set('userRole', action.response.get('result'))
      .set('data', state.get('data').merge({ roleIds: action.response.get('result').map(t => '' + t.get('roleId')) }));
  case thunkTypes.configFormGetRoleByUser.FAILURETYPE:
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

export default combineReducers({
  table,
  form,
  passwordForm,
  configForm,
});