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
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'audit/auditListPage',
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
    // url: 'carouselConfig/deleteCarouselConfig',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    // url: 'carouselConfig/enableStatus',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    // url: 'carouselConfig/disableStatus',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'activityInfo/selectExtByPrimaryKey',
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

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    // url: 'carouselConfig/addCarousel',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    // url: 'carouselConfig/updateCarouselConfig',
    params,
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
};
