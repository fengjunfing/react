import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  getChannelNameList: transToThunk(THISACTION + 'GET_CAR_BRANDS_LIST'),
  passwordFormSubmit: transToThunk(THISACTION + 'PASSWORDFORM_SUBMIT'),
  configFormGetAllMenu: transToThunk(THISACTION + 'CONFIGFORM_GETALLMENU'),
  configFormGetMenuByRole: transToThunk(THISACTION + 'CONFIGFORM_GETMENUBYROLE'),
  configFormSubmit: transToThunk(THISACTION + 'CONFIGFORM_SUBMIT'),
};

const getChannelNameList = params => dispatch => dispatch({
  [THISACTION + 'GET_CAR_BRANDS_LIST']: {
    types: Object.values(thunk.getChannelNameList),
    url: 'channelUser/queryChannelNameList',
    params,
  }
});

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'channelUser/channelUserListPage',
    params,
  }
});

// const tableDelete = params => dispatch => dispatch({
//   [THISACTION + 'TABLE_DELETE']: {
//     types: Object.values(thunk.tableDelete),
//     url: 'sysCarSeries/deleteCarSeriesByPrimaryKey',
//     params,
//   }
// });

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'channelUser/enableChannelUser',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'channelUser/disableChannelUser',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'channelUser/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'channelUser/insertSelective',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'channelUser/updateByPrimaryKey',
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

const passwordFormSubmit = params => dispatch => dispatch({
  [THISACTION + 'PASSWORDFORMSUBMIT_GET']: {
    types: Object.values(thunk.passwordFormSubmit),
    url: 'channelUser/updatePasswordByPrimaryKey',
    params,
  }
});

const configFormGetAllMenu = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETALLMENU']: {
    types: Object.values(thunk.configFormGetAllMenu),
    url: 'channelUser/queryRoleList',
    params,
  }
});

const configFormGetMenuByRole = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETMENUBYROLE']: {
    types: Object.values(thunk.configFormGetMenuByRole),
    url: 'channelUser/queryRoleListById',
    params,
  }
});

const configFormSubmit = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_SUBMIT']: {
    types: Object.values(thunk.configFormSubmit),
    url: 'channelUser/updateRoleListById',
    params,
  }
});

export default {
  thunk,
  tableGet,
  // tableDelete,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  getChannelNameList,
  passwordFormSubmit,
  configFormGetAllMenu,
  configFormGetMenuByRole,
  configFormSubmit,
};