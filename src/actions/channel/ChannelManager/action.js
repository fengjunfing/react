import THISACTION from './name';

const action = {
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_OPEN_UPLOAD_LOADING: THISACTION + 'FORM_OPEN_UPLOAD_LOADING',
  FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'FORM_CLOSE_UPLOAD_LOADING',
  CONFIG_SHOW: THISACTION + 'CONFIG_SHOW',
  CONFIG_HIDE: THISACTION + 'CONFIG_HIDE',
  CONFIG_BASE_SAVE: THISACTION + 'CONFIG_BASE_SAVE',
  CONTACTS_FORM_RESET: THISACTION + 'CONTACTS_FORM_RESET',
  CONTACTS_FORM_SHOW: THISACTION + 'CONTACTS_FORM_SHOW',
  CONTACTS_FORM_HIDE: THISACTION + 'CONTACTS_FORM_HIDE',
  CONTACTS_FORM_SETDATA: THISACTION + 'CONTACTS_FORM_SETDATA',
};
  
const formSetData = params => dispatch => dispatch({
  type: action.FORM_SETDATA,
  params,
});
  
const formReset = () => dispatch => dispatch({
  type: action.FORM_RESET,
});
  
const formShow = title => dispatch => dispatch({
  type: action.FORM_SHOW,
  title,
});
  
const formHide = () => dispatch => dispatch({
  type: action.FORM_HIDE
});

const formOpenUploadLoading = params => dispatch => dispatch({
  type: action.FORM_OPEN_UPLOAD_LOADING,
  params,
});

const formCloseUploadLoading = params => dispatch => dispatch({
  type: action.FORM_CLOSE_UPLOAD_LOADING,
  params,
});

const configShow = () => dispatch => dispatch({
  type: action.CONFIG_SHOW,
});
  
const configHide = () => dispatch => dispatch({
  type: action.CONFIG_HIDE
});

const configBaseSave = base => dispatch => dispatch({
  type: action.CONFIG_BASE_SAVE,
  base,
});

const contactsFormReset = () => dispatch => dispatch({
  type: action.CONTACTS_FORM_RESET,
});

const contactsFormShow = title => dispatch => dispatch({
  type: action.CONTACTS_FORM_SHOW,
  title,
});

const contactsFormHide = () => dispatch => dispatch({
  type: action.CONTACTS_FORM_HIDE
});

const contactsFormSetData = params => dispatch => dispatch({
  type: action.CONTACTS_FORM_SETDATA,
  params,
});
  
export default {
  action,
  formSetData,
  formReset,
  formShow,
  formHide,
  formOpenUploadLoading,
  formCloseUploadLoading,
  configShow,
  configHide,
  configBaseSave,
  contactsFormReset,
  contactsFormShow,
  contactsFormHide,
  contactsFormSetData,
};