import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  tableRemove: transToThunk(THISACTION + 'TABLE_REMOVE'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'menuManager/functionList',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'menuManager/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'menuManager/addFunction',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'menuManager/updateMenuInfo',
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
    url: 'menuManager/deleteByPrimaryKey',
    params,
  }
});

export default {
  thunk,
  tableGet,
  formGet,
  formSubmit,
  tableRemove,
};