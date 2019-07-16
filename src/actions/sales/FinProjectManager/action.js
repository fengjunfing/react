import THISACTION from './name';

const action = {
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_OPEN_UPLOAD_LOADING: THISACTION + 'FORM_OPEN_UPLOAD_LOADING',
  FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'FORM_CLOSE_UPLOAD_LOADING',
  DETAIL_FORM_SETDATA: THISACTION + 'DETAIL_FORM_SETDATA',
  DETAIL_FORM_RESET: THISACTION + 'DETAIL_FORM_RESET',
  DETAIL_FORM_SHOW: THISACTION + 'DETAIL_FORM_SHOW',
  DETAIL_FORM_HIDE: THISACTION + 'DETAIL_FORM_HIDE',
  CONFIG_CAR_FORM_SETDATA: THISACTION + 'CONFIG_CAR_FORM_SETDATA',
  CONFIG_CAR_FORM_RESET: THISACTION + 'CONFIG_CAR_FORM_RESET',
  CONFIG_CAR_FORM_SHOW: THISACTION + 'CONFIG_CAR_FORM_SHOW',
  CONFIG_CAR_FORM_HIDE: THISACTION + 'CONFIG_CAR_FORM_HIDE',
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

const detailFormSetData = params => dispatch => dispatch({
  type: action.DETAIL_FORM_SETDATA,
  params,
});
  
const detailFormReset = () => dispatch => dispatch({
  type: action.DETAIL_FORM_RESET,
});
  
const detailFormShow = params => dispatch => dispatch({
  type: action.DETAIL_FORM_SHOW,
  params,
});
  
const detailFormHide = () => dispatch => dispatch({
  type: action.DETAIL_FORM_HIDE
});

const configCarFormSetData = params => dispatch => dispatch({
  type: action.CONFIG_CAR_FORM_SETDATA,
  params,
});
  
const configCarFormReset = () => dispatch => dispatch({
  type: action.CONFIG_CAR_FORM_RESET,
});
  
const configCarFormShow = title => dispatch => dispatch({
  type: action.CONFIG_CAR_FORM_SHOW,
  title,
});
  
const configCarFormHide = () => dispatch => dispatch({
  type: action.CONFIG_CAR_FORM_HIDE
});
  
export default {
  action,
  formSetData,
  formReset,
  formShow,
  formHide,
  formOpenUploadLoading,
  formCloseUploadLoading,
  detailFormSetData,
  detailFormReset,
  detailFormShow,
  detailFormHide,
  configCarFormSetData,
  configCarFormReset,
  configCarFormShow,
  configCarFormHide,
};
