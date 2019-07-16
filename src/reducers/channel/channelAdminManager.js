import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import { base64 } from '@/util';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.CHANNEL_ADMIN_MANAGER;

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
    return state
      .set('loading', true)
      .set('data', Immutable.fromJS(action.params));
  case thunkTypes.formSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.formSubmit.FAILURETYPE:
    return state
      .set('loading', false);
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

const searchFormInitState = Immutable.fromJS({
  list: [],
  loading: false,
});

const searchForm = (state = searchFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.getChannelNameList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getChannelNameList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('list', action.response.get('result'));
  case thunkTypes.getChannelNameList.FAILURETYPE:
    return state
      .set('loading', false);
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
    roleIdList: [],
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
    return state
      .set('originAllMenu', action.response.get('result'))
      .set('allMenu', action.response.get('result'));
  case thunkTypes.configFormGetAllMenu.FAILURETYPE:
    return state;
  case thunkTypes.configFormGetMenuByRole.REQUESTTYPE:
    return state;
  case thunkTypes.configFormGetMenuByRole.SUCCESSTYPE:
    return state
      .set('roleMenu', action.response.get('result'))
      .set('data', state.get('data').merge({ roleIdList: action.response.get('result').map(t => '' + t.get('roleId')) }));
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

export default combineReducers({
  table,
  form,
  searchForm,
  passwordForm,
  configForm,
});
