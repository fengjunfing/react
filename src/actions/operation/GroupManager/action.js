import THISACTION from './name';

const action = {
  SET_TYPE: THISACTION + 'SET_TYPE',
  SET_SEARCH_DATA: THISACTION + 'SET_SEARCH_DATA',
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_OPEN_UPLOAD_LOADING: THISACTION + 'FORM_OPEN_UPLOAD_LOADING',
  FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'FORM_CLOSE_UPLOAD_LOADING',
  LEFTS_FORM_SETDATA: THISACTION + 'LEFTS_FORM_SETDATA',
  LEFTS_FORM_RESET: THISACTION + 'LEFTS_FORM_RESET',
  LEFTS_FORM_SHOW: THISACTION + 'LEFTS_FORM_SHOW',
  LEFTS_FORM_HIDE: THISACTION + 'LEFTS_FORM_HIDE',
  LEFTS_FORM_OPEN_UPLOAD_LOADING: THISACTION + 'LEFTS_FORM_OPEN_UPLOAD_LOADING',
  LEFTS_FORM_CLOSE_UPLOAD_LOADING: THISACTION + 'LEFTS_FORM_CLOSE_UPLOAD_LOADING',
  NAME_FORM_SHOW: THISACTION + 'NAME_FORM_SHOW',
  NAME_FORM_HIDE: THISACTION + 'NAME_FORM_HIDE',
  NAME_FORM_SET_LEFT_DATA: THISACTION + 'NAME_FORM_SET_LEFT_DATA',
  NAME_FORM_RESET: THISACTION + 'NAME_FORM_RESET',
  NAME_FORM_SET_TYPE: THISACTION + 'NAME_FORM_SET_TYPE',
  HANK_CASCADER_CAR_BRANDS_LIST: THISACTION + 'HANK_CASCADER_CAR_BRANDS_LIST',
};
  
const setType = types => dispatch => dispatch({
  type: action.SET_TYPE,
  types,
});

const setSearchData = params => dispatch => dispatch({
  type: action.SET_SEARCH_DATA,
  params,
});

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

const leftsFormSetData = params => dispatch => dispatch({
  type: action.LEFTS_FORM_SETDATA,
  params,
});
  
const leftsFormReset = () => dispatch => dispatch({
  type: action.LEFTS_FORM_RESET,
});
  
const leftsFormShow = title => dispatch => dispatch({
  type: action.LEFTS_FORM_SHOW,
  title,
});
  
const leftsFormHide = () => dispatch => dispatch({
  type: action.LEFTS_FORM_HIDE
});

const leftsFormOpenUploadLoading = params => dispatch => dispatch({
  type: action.LEFTS_FORM_OPEN_UPLOAD_LOADING,
  params,
});

const leftsFormCloseUploadLoading = params => dispatch => dispatch({
  type: action.LEFTS_FORM_CLOSE_UPLOAD_LOADING,
  params,
});

const nameFormShow = title => dispatch => dispatch({
  type: action.NAME_FORM_SHOW,
  title,
});

const nameFormHide = () => dispatch => dispatch({
  type: action.NAME_FORM_HIDE
});

const nameFormSetLeftData = leftData => dispatch => dispatch({
  type: action.NAME_FORM_SET_LEFT_DATA,
  leftData,
});

const nameFormReset = () => dispatch => dispatch({
  type: action.NAME_FORM_RESET,
});

const nameFormSetType = types => dispatch => dispatch({
  type: action.NAME_FORM_SET_TYPE,
  types,
});

const hankCascaderCarBrandsList = params => dispatch => dispatch({
  type: action.HANK_CASCADER_CAR_BRANDS_LIST,
  params,
});

export default {
  action,
  setType,
  setSearchData,
  formSetData,
  formReset,
  formShow,
  formHide,
  formOpenUploadLoading,
  formCloseUploadLoading,
  leftsFormSetData,
  leftsFormReset,
  leftsFormShow,
  leftsFormHide,
  leftsFormOpenUploadLoading,
  leftsFormCloseUploadLoading,
  nameFormShow,
  nameFormHide,
  nameFormSetLeftData,
  nameFormReset,
  nameFormSetType,
  hankCascaderCarBrandsList,
};
