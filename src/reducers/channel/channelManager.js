import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.CHANNEL_MANAGER;

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

const configInitState = Immutable.fromJS({
  base: {},
  data: {},
  icbc_e: {},
  merchant_service: {
    serviceIdList: [],
  },
  channelMerchantInfoConfig: {},
  merchantServiceList: [],
  tabs: [
    { title: '渠道加密信息', key: '1', },
    { title: '融e购配置', key: '2', },
    { title: '联系人配置', key: '3', },
    { title: '商户默认权限配置', key: '4', },
    { title: '商户接收默认处理配置', key: '5', },
  ],
  visible: false,
  loading: false,
  title: '配置',
  contactsData: [],
  contactsCount: 0,
  contactsLoading: false,
  contactsSearchData: {
    currentPage: 1,
    pageSize: 10,
  },
});

const config = (state = configInitState, action) => {
  switch (action.type) {
  case actionTypes.CONFIG_SHOW:
    return state
      .set('visible', true);
  case actionTypes.CONFIG_HIDE:
    return state
      .set('visible', false);
  case actionTypes.CONFIG_BASE_SAVE:
    return state
      .set('base', Immutable.fromJS(action.base));
  case thunkTypes.appConfigSelectByChannelId.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.appConfigSelectByChannelId.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.appConfigSelectByChannelId.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.meltingEBoughtConfigSelectByChannelId.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.meltingEBoughtConfigSelectByChannelId.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('icbc_e', action.response.get('result'));
  case thunkTypes.meltingEBoughtConfigSelectByChannelId.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.getMerchantServiceList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getMerchantServiceList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('merchantServiceList', action.response.get('result'));
  case thunkTypes.getMerchantServiceList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.getChannelMerchantDefaultService.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getChannelMerchantDefaultService.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('merchant_service', Immutable.fromJS({
        serviceIdList: action.response.get('result').map(v => v + ''),
      }));
  case thunkTypes.getChannelMerchantDefaultService.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.getChannelMerchantInfoConfig.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getChannelMerchantInfoConfig.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('channelMerchantInfoConfig', action.response.get('result'));
  case thunkTypes.getChannelMerchantInfoConfig.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.channelContactsQueryDataListPage.REQUESTTYPE:
    return state
      .set('contactsLoading', true); 
  case thunkTypes.channelContactsQueryDataListPage.SUCCESSTYPE:
    return state
      .set('contactsLoading', false)
      .set('contactsData', action.response.get('result'))
      .set('contactsCount', action.response.get('count'));
  case thunkTypes.channelContactsQueryDataListPage.FAILURETYPE:
    return state
      .set('contactsLoading', false);
  default:
    return state;
  }
};

const contactsFormInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  uploadLoading: false,
  title: '',
});

const contactsForm = (state = contactsFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.channelContactsSelectByPrimaryKey.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.channelContactsSelectByPrimaryKey.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.channelContactsSelectByPrimaryKey.FAILURETYPE:
    return state
      .set('loading', false)
      .set('visible', false);
  case actionTypes.CONTACTS_FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.CONTACTS_FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.CONTACTS_FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.CONTACTS_FORM_HIDE:
    return state
      .set('visible', false);
  // case thunkTypes.formSubmit.REQUESTTYPE:
  //   return state
  //     .set('loading', true)
  //     .set('data', Immutable.fromJS(action.params));
  // case thunkTypes.formSubmit.SUCCESSTYPE:
  //   return state
  //     .set('loading', false);
  // case thunkTypes.formSubmit.FAILURETYPE:
  //   return state
  //     .set('loading', false);
  // case actionTypes.FORM_OPEN_UPLOAD_LOADING:
  //   return state
  //     .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
  //     .set('uploadLoading', true);
  // case actionTypes.FORM_CLOSE_UPLOAD_LOADING:
  //   return state
  //     .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
  //     .set('uploadLoading', false);
  default:
    return state;
  }
};

export default combineReducers({
  table,
  form,
  config,
  contactsForm,
});
