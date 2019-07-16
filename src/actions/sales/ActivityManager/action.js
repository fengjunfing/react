import THISACTION from './name';

const action = {
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_OPEN_UPLOAD_LOADING: THISACTION + 'FORM_OPEN_UPLOAD_LOADING',
  FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'FORM_CLOSE_UPLOAD_LOADING',
  CAR_MODEL_FORM_SETDATA: THISACTION + 'CAR_MODEL_FORM_SETDATA',
  CAR_MODEL_FORM_RESET: THISACTION + 'CAR_MODEL_FORM_RESET',
  CAR_MODEL_FORM_SHOW: THISACTION + 'CAR_MODEL_FORM_SHOW',
  CAR_MODEL_FORM_HIDE: THISACTION + 'CAR_MODEL_FORM_HIDE',
  CAR_MODEL_FORM_OPEN_UPLOAD_LOADING: THISACTION + 'CAR_MODEL_FORM_OPEN_UPLOAD_LOADING',
  CAR_MODEL_FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'CAR_MODEL_FORM_CLOSE_UPLOAD_LOADING',
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

const carModelFormSetData = params => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_SETDATA,
  params,
});

const carModelFormReset = () => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_RESET,
});

const carModelFormShow = title => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_SHOW,
  title,
});

const carModelFormHide = () => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_HIDE
});

const carModelFormOpenUploadLoading = params => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_OPEN_UPLOAD_LOADING,
  params,
});

const carModelFormCloseUploadLoading = params => dispatch => dispatch({
  type: action.CAR_MODEL_FORM_CLOSE_UPLOAD_LOADING,
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
  carModelFormSetData,
  carModelFormReset,
  carModelFormShow,
  carModelFormHide,
  carModelFormOpenUploadLoading,
  carModelFormCloseUploadLoading,
};
