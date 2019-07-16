import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
};

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'appManager/appList',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'appManager/publish',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'appManager/unPublish',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'appManager/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'appManager/addApp',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'appManager/updateApp',
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
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
};