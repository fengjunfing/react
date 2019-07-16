import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  passwordFormSubmit: transToThunk(THISACTION + 'PASSWORDFORM_SUBMIT'),
  configFormGetAllRole: transToThunk(THISACTION + 'CONFIGFORM_GETALLMENU'),
  configFormGetRoleByUser: transToThunk(THISACTION + 'CONFIGFORM_GETMENUBYROLE'),
  configFormSubmit: transToThunk(THISACTION + 'CONFIGFORM_SUBMIT'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'userManager/userListPage',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'userManager/publish',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'userManager/unPublish',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'userManager/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'userManager/addUser',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'userManager/updateUser',
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
    url: 'userManager/updatePasswordByPrimaryKey',
    params,
  }
});

const configFormGetAllRole = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETALLMENU']: {
    types: Object.values(thunk.configFormGetAllRole),
    url: 'roleManager/roleTreeList',
    params,
  }
});

const configFormGetRoleByUser = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETMENUBYROLE']: {
    types: Object.values(thunk.configFormGetRoleByUser),
    url: 'authority/roleListByUserId',
    params,
  }
});

const configFormSubmit = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_SUBMIT']: {
    types: Object.values(thunk.configFormSubmit),
    url: 'authority/updateRoleByUserId',
    params,
  }
});

export default {
  thunk,
  tableGet,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  passwordFormSubmit,
  configFormGetAllRole,
  configFormGetRoleByUser,
  configFormSubmit,
};