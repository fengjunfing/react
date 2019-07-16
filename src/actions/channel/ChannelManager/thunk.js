import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  appConfigSelectByChannelId: transToThunk(THISACTION + 'APP_CONFIG_SELECT_BY_CHANNEL_ID'),
  appConfigUpdateAppConfig: transToThunk(THISACTION + 'APP_CONFIG_UPDATE_APP_CONFIG'),
  channelContactsQueryDataListPage: transToThunk(THISACTION + 'CHANNEL_CONTACTS_QUERY_DATA_LIST_PAGE'),
  channelContactsDeleteCarBrandsByPrimaryKey: transToThunk(THISACTION + 'CHANNEL_CONTACTS_DELETE_CAR_BRANDS_BY_PRIMARY_KEY'),
  channelContactsSelectByPrimaryKey: transToThunk(THISACTION + 'CHANNEL_CONTACTS_SELECT_BY_PRIMARY_KEY'),
  contactsFormSubmit: transToThunk(THISACTION + 'CONTACTS_FORM_SUBMIT'),
  meltingEBoughtConfigSelectByChannelId: transToThunk(THISACTION + 'MELTING_E_BOUGHT_CONFIG_SELECT_BY_CHANNEL_ID'),
  meltingEBoughtConfigUpdateConfig: transToThunk(THISACTION + 'MELTING_E_BOUGHT_CONFIG_UPDATE_CONFIG'),
  getChannelMerchantDefaultService: transToThunk(THISACTION + 'GET_CHANNEL_MERCHANT_DEFAULT_SERVICE'),
  getMerchantServiceList: transToThunk(THISACTION + 'GET_MERCHANT_SERVICE_LIST'),
  addOrUpdateDefaultConfig: transToThunk(THISACTION + 'ADD_OR_UPDATE_DEFAULT_CONFIG'),
  getChannelMerchantInfoConfig: transToThunk(THISACTION + 'GET_CHANNEL_MERCHANT_INFO_CONFIG'),
  insertOrUpdateInitConfig: transToThunk(THISACTION + 'INSERT_OR_UPDATE_INIT_CONFIG'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'channelInfo/channelInfoListPage',
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'sysCarModel/deleteCarModelByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'channelInfo/enableChannel',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'channelInfo/disableChannel',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'channelInfo/selectExtByPrimaryKey',
    params,
  }
});

// const formAddSubmit = params => ({
//   [THISACTION + 'FORM_ADD_SUBMIT']: {
//     types: Object.values(thunk.formSubmit),
//     url: 'appManager/addApp',
//     params,
//   }
// });

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'channelInfo/updateByPrimaryKey',
    params,
  }
});

const appConfigSelectByChannelId = params => ({
  [THISACTION + 'APP_CONFIG_SELECT_BY_CHANNEL_ID']: {
    types: Object.values(thunk.appConfigSelectByChannelId),
    url: 'appConfig/selectByChannelId',
    params,
  }
});

const appConfigUpdateAppConfig = params => ({
  [THISACTION + 'APP_CONFIG_UPDATE_APP_CONFIG']: {
    types: Object.values(thunk.appConfigUpdateAppConfig),
    url: 'appConfig/updateAppConfig',
    params,
  }
});

const channelContactsQueryDataListPage = params => ({
  [THISACTION + 'CHANNEL_CONTACTS_QUERY_DATA_LIST_PAGE']: {
    types: Object.values(thunk.channelContactsQueryDataListPage),
    url: 'channelContacts/queryDataListPage',
    params,
  }
});

const channelContactsDeleteCarBrandsByPrimaryKey = params => ({
  [THISACTION + 'CHANNEL_CONTACTS_DELETE_CAR_BRANDS_BY_PRIMARY_KEY']: {
    types: Object.values(thunk.channelContactsDeleteCarBrandsByPrimaryKey),
    url: 'channelContacts/deleteCarBrandsByPrimaryKey',
    params,
  }
});

const channelContactsSelectByPrimaryKey = params => ({
  [THISACTION + 'CHANNEL_CONTACTS_SELECT_BY_PRIMARY_KEY']: {
    types: Object.values(thunk.channelContactsSelectByPrimaryKey),
    url: 'channelContacts/selectByPrimaryKey',
    params,
  }
});

const meltingEBoughtConfigSelectByChannelId = params => ({
  [THISACTION + 'MELTING_E_BOUGHT_CONFIG_SELECT_BY_CHANNEL_ID']: {
    types: Object.values(thunk.meltingEBoughtConfigSelectByChannelId),
    url: 'meltingEBoughtConfig/selectByChannelId',
    params,
  }
});

const meltingEBoughtConfigUpdateConfig = params => ({
  [THISACTION + 'MELTING_E_BOUGHT_CONFIG_UPDATE_CONFIG']: {
    types: Object.values(thunk.meltingEBoughtConfigUpdateConfig),
    url: 'meltingEBoughtConfig/updateConfig',
    params,
  }
});

const formSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(formEditSubmit(params));
  } else {
    // return dispatch(formAddSubmit(params));
  }
};

const contactsFormAddSubmit = params => ({
  [THISACTION + 'CONTACTS_FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.contactsFormSubmit),
    url: 'channelContacts/insertSelective',
    params,
  }
});

const contactsFormEditSubmit = params => ({
  [THISACTION + 'CONTACTS_FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.contactsFormSubmit),
    url: 'channelContacts/updateByPrimaryKey',
    params,
  }
});

const getChannelMerchantDefaultService = params => ({
  [THISACTION + 'GET_CHANNEL_MERCHANT_DEFAULT_SERVICE']: {
    types: Object.values(thunk.getChannelMerchantDefaultService),
    url: 'configService/getChannelMerchantDefaultService',
    params,
  }
});

const getMerchantServiceList = params => ({
  [THISACTION + 'GET_MERCHANT_SERVICE_LIST']: {
    types: Object.values(thunk.getMerchantServiceList),
    url: 'configService/getMerchantServiceList',
    params,
  }
});

const addOrUpdateDefaultConfig = params => ({
  [THISACTION + 'ADD_OR_UPDATE_DEFAULT_CONFIG']: {
    types: Object.values(thunk.addOrUpdateDefaultConfig),
    url: 'configService/addOrUpdateDefaultConfig',
    params,
  }
});

const getChannelMerchantInfoConfig = params => ({
  [THISACTION + 'GET_CHANNEL_MERCHANT_INFO_CONFIG']: {
    types: Object.values(thunk.getChannelMerchantInfoConfig),
    url: 'channelMerchantInfoConfig/selectByChannelId',
    params,
  }
});

const insertOrUpdateInitConfig = params => ({
  [THISACTION + 'INSERT_OR_UPDATE_INIT_CONFIG']: {
    types: Object.values(thunk.insertOrUpdateInitConfig),
    url: 'channelMerchantInfoConfig/insertOrUpdateInitConfig',
    params,
  }
});

const contactsFormSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(contactsFormEditSubmit(params));
  } else {
    return dispatch(contactsFormAddSubmit(params));
  }
};

export default {
  thunk,
  tableGet,
  tableDelete,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  appConfigSelectByChannelId,
  appConfigUpdateAppConfig,
  channelContactsQueryDataListPage,
  channelContactsDeleteCarBrandsByPrimaryKey,
  channelContactsSelectByPrimaryKey,
  contactsFormSubmit,
  meltingEBoughtConfigSelectByChannelId,
  meltingEBoughtConfigUpdateConfig,
  getChannelMerchantDefaultService,
  getMerchantServiceList,
  addOrUpdateDefaultConfig,
  getChannelMerchantInfoConfig,
  insertOrUpdateInitConfig,
};
