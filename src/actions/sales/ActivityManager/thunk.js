import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  queryChannelNameList: transToThunk(THISACTION + 'QUERY_CHANNEL_NAME_LIST'),
  auditPassByPrimaryKey: transToThunk(THISACTION + 'AUDIT_PASS'),
  auditRejectByPrimaryKey: transToThunk(THISACTION + 'AUDIT_REJECT'),
  showActivity: transToThunk(THISACTION + 'SHOW_ACTIVITY'),
  getSchemeInfoList: transToThunk(THISACTION + 'GET_SCHEME_INFO_LIST'),
  getSchemeInfoSelect: transToThunk(THISACTION + 'GET_SCHEME_INFO_SELECT'),
  getTicketList: transToThunk(THISACTION + 'GET_TICKET_LIST'),
  getMerchantInfo: transToThunk(THISACTION + 'GET_MERCHANT_INFO'),
  tableSubmitAudit: transToThunk(THISACTION + 'TABLE_SUBMIT_AUDIT'),
  tableReject: transToThunk(THISACTION + 'TABLE_REJECT'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'activityInfo/activityListPage',
    params,
  }
});

const queryChannelNameList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_CHANNEL_NAME_LIST']: {
    types: Object.values(thunk.queryChannelNameList),
    url: 'channelUser/queryChannelNameList',
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'activityInfo/deleteActivityByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'activityInfo/enableActivity',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'activityInfo/cancelActivity',
    params,
  }
});

const tableSubmitAudit = params => dispatch => dispatch({
  [THISACTION + 'TABLE_SUBMIT_AUDIT']: {
    types: Object.values(thunk.tableSubmitAudit),
    url: 'activityInfo/submitAudit',
    params,
  }
});

const tableReject = params => dispatch => dispatch({
  [THISACTION + 'TABLE_REJECT']: {
    types: Object.values(thunk.tableReject),
    url: 'activityInfo/selectRejectByPrimaryKey',
    params,
  }
});

const formGet = (params, isLook) => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: isLook ? 'activityInfo/selectExtByPrimaryKey' : 'activityInfo/selectExt4Update',
    params,
  }
});

const auditPassByPrimaryKey = params => dispatch => dispatch({
  [THISACTION + 'AUDIT_PASS']: {
    types: Object.values(thunk.auditPassByPrimaryKey),
    url: 'audit/auditPassByPrimaryKey',
    params,
  }
});

const auditRejectByPrimaryKey = params => dispatch => dispatch({
  [THISACTION + 'AUDIT_REJECT']: {
    types: Object.values(thunk.auditRejectByPrimaryKey),
    url: 'audit/auditRejectByPrimaryKey',
    params,
  }
});

const showActivity = params => dispatch => dispatch({
  [THISACTION + 'SHOW_ACTIVITY']: {
    types: Object.values(thunk.showActivity),
    url: 'activityInfo/showActivity.htm',
    params,
  }
});

const getSchemeInfoList = () => dispatch => dispatch({
  [THISACTION + 'GET_SCHEME_INFO_LIST']: {
    types: Object.values(thunk.getSchemeInfoList),
    url: 'schemeInfo/schemeInfoList',
  }
});

const getSchemeInfoSelect = params => dispatch => dispatch({
  [THISACTION + 'GET_SCHEME_INFO_SELECT']: {
    types: Object.values(thunk.getSchemeInfoSelect),
    url: 'schemeInfo/selectExtByPrimaryKey',
    params,
  }
});

const getTicketList = () => dispatch => dispatch({
  [THISACTION + 'GET_TICKET_LIST']: {
    types: Object.values(thunk.getTicketList),
    url: 'sysTicketVolume/ticketList',
  }
});

const getMerchantInfo = () => dispatch => dispatch({
  [THISACTION + 'GET_MERCHANT_INFO']: {
    types: Object.values(thunk.getMerchantInfo),
    url: 'merchantInfo/queryList',
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'activityInfo/addActivityInfoExt',
    params,
    payload: true,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'activityInfo/updateActivityInfoExt',
    params,
    payload: true,
  }
});

const formSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(formEditSubmit(params));
  } else {
    return dispatch(formAddSubmit(params));
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
  queryChannelNameList,
  auditPassByPrimaryKey,
  auditRejectByPrimaryKey,
  showActivity,
  getSchemeInfoList,
  getSchemeInfoSelect,
  getTicketList,
  getMerchantInfo,
  tableSubmitAudit,
  tableReject,
};
