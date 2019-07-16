import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  tableRemove: transToThunk(THISACTION + 'TABLE_REMOVE'),
  configFormGetAllMenu: transToThunk(THISACTION + 'CONFIGFORM_GETALLMENU'),
  configFormGetMenuByRole: transToThunk(THISACTION + 'CONFIGFORM_GETMENUBYROLE'),
  configFormSubmit: transToThunk(THISACTION + 'CONFIGFORM_SUBMIT'),
  funcFormGetAllFunc: transToThunk(THISACTION + 'FUNCFORM_GETALLFUNC'),
  funcFormGetFuncByRole: transToThunk(THISACTION + 'FUNCFORM_GETFUNCBYROLE'),
  funcFormSubmit: transToThunk(THISACTION + 'FUNCFORM_SUBMIT'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'roleManager/roleListPage',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'roleManager/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'roleManager/addRoleInfo',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'roleManager/updateRoleInfo',
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

const tableRemove = params => dispatch => dispatch({
  [THISACTION + 'TABLE_REMOVE']: {
    types: Object.values(thunk.tableRemove),
    url: 'roleManager/deleteByPrimaryKey',
    params,
  }
});

const configFormGetAllMenu = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETALLMENU']: {
    types: Object.values(thunk.configFormGetAllMenu),
    url: 'menuManager/menuList',
    params,
  }
});

const configFormGetMenuByRole = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_GETMENUBYROLE']: {
    types: Object.values(thunk.configFormGetMenuByRole),
    url: 'authority/menuListByRoleId',
    params,
  }
});

const configFormSubmit = params => dispatch => dispatch({
  [THISACTION + 'CONFIGFORM_SUBMIT']: {
    types: Object.values(thunk.configFormSubmit),
    url: 'authority/updateMenuByRoleId',
    params,
  }
});

const funcFormGetAllFunc = params => dispatch => dispatch({
  [THISACTION + 'FUNCFORM_GETALLFUNC']: {
    types: Object.values(thunk.funcFormGetAllFunc),
    url: 'menuManager/functionList',
    params,
  }
});

const funcFormGetFuncByRole = params => dispatch => dispatch({
  [THISACTION + 'FUNCFORM_GETFUNCBYROLE']: {
    types: Object.values(thunk.funcFormGetFuncByRole),
    url: 'authority/functionListByRoleId',
    params,
  }
});

const funcFormSubmit = params => dispatch => dispatch({
  [THISACTION + 'FUNCFORM_SUBMIT']: {
    types: Object.values(thunk.funcFormSubmit),
    url: 'authority/updateFunctionByRoleId',
    params,
  }
});

export default {
  thunk,
  tableGet,
  formGet,
  formSubmit,
  tableRemove,
  configFormGetAllMenu,
  configFormGetMenuByRole,
  configFormSubmit,
  funcFormGetAllFunc,
  funcFormGetFuncByRole,
  funcFormSubmit,
};