import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.MORTGAGEFREE_MANAGER;

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

export default combineReducers({
  table,
  form,
});
