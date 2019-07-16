import THISACTION from './name';

const action = {
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_OPEN_UPLOAD_LOADING: THISACTION + 'FORM_OPEN_UPLOAD_LOADING',
  FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'FORM_CLOSE_UPLOAD_LOADING',
  PASSWORDFORM_SETDATA: THISACTION + 'PASSWORDFORM_SETDATA',
  PASSWORDFORM_RESET: THISACTION + 'PASSWORDFORM_RESET',
  PASSWORDFORM_SHOW: THISACTION + 'PASSWORDFORM_SHOW',
  PASSWORDFORM_HIDE: THISACTION + 'PASSWORDFORM_HIDE',
  CONFIGFORM_SETDATA: THISACTION + 'CONFIGFORM_SETDATA',
  CONFIGFORM_SHOW: THISACTION + 'CONFIGFORM_SHOW',
  CONFIGFORM_HIDE: THISACTION + 'CONFIGFORM_HIDE',
  CONFIGFORM_RESET: THISACTION + 'CONFIGFORM_RESET',
  CONFIGFORM_OPEN_LOADING: THISACTION + 'CONFIGFORM_OPEN_LOADING',
  CONFIGFORM_CLOSE_LOADING: THISACTION + 'CONFIGFORM_CLOSE_LOADING',
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
  
const passwordFormSetData = params => dispatch => dispatch({
  type: action.PASSWORDFORM_SETDATA,
  params,
});
  
const passwordFormReset = () => dispatch => dispatch({
  type: action.PASSWORDFORM_RESET,
});
  
const passwordFormShow = title => dispatch => dispatch({
  type: action.PASSWORDFORM_SHOW,
  title,
});
  
const passwordFormHide = () => dispatch => dispatch({
  type: action.PASSWORDFORM_HIDE
});
  
const configFormSetData = params => dispatch => dispatch({
  type: action.CONFIGFORM_SETDATA,
  params,
});

const configFormShow = title => dispatch => dispatch({
  type: action.CONFIGFORM_SHOW,
  title,
});

const configFormHide = () => dispatch => dispatch({
  type: action.CONFIGFORM_HIDE
});

const configFormReset = () => dispatch => dispatch({
  type: action.CONFIGFORM_RESET,
});

const configFormOpenLoading = () => dispatch => dispatch({
  type: action.CONFIGFORM_OPEN_LOADING,
});

const configFormCloseLoading = () => dispatch => dispatch({
  type: action.CONFIGFORM_CLOSE_LOADING,
});
  
export default {
  action,
  formSetData,
  formReset,
  formShow,
  formHide,
  formOpenUploadLoading,
  formCloseUploadLoading,
  passwordFormSetData,
  passwordFormReset,
  passwordFormShow,
  passwordFormHide,
  configFormSetData,
  configFormShow,
  configFormHide,
  configFormReset,
  configFormOpenLoading,
  configFormCloseLoading,
};