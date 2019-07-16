import THISACTION from './name';

const action = {
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  FORM_RESET: THISACTION + 'FORM_RESET',
  CONFIGFORM_SETDATA: THISACTION + 'CONFIGFORM_SETDATA',
  CONFIGFORM_SHOW: THISACTION + 'CONFIGFORM_SHOW',
  CONFIGFORM_HIDE: THISACTION + 'CONFIGFORM_HIDE',
  CONFIGFORM_RESET: THISACTION + 'CONFIGFORM_RESET',
  CONFIGFORM_OPEN_LOADING: THISACTION + 'CONFIGFORM_OPEN_LOADING',
  CONFIGFORM_CLOSE_LOADING: THISACTION + 'CONFIGFORM_CLOSE_LOADING',
  FUNCFORM_SETDATA: THISACTION + 'FUNCFORM_SETDATA',
  FUNCFORM_SHOW: THISACTION + 'FUNCFORM_SHOW',
  FUNCFORM_HIDE: THISACTION + 'FUNCFORM_HIDE',
  FUNCFORM_RESET: THISACTION + 'FUNCFORM_RESET',
  FUNCFORM_OPEN_LOADING: THISACTION + 'FUNCFORM_OPEN_LOADING',
  FUNCFORM_CLOSE_LOADING: THISACTION + 'FUNCFORM_CLOSE_LOADING',
};

const formShow = title => dispatch => dispatch({
  type: action.FORM_SHOW,
  title,
});

const formHide = () => dispatch => dispatch({
  type: action.FORM_HIDE
});

const formReset = () => dispatch => dispatch({
  type: action.FORM_RESET,
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

const funcFormSetData = params => dispatch => dispatch({
  type: action.FUNCFORM_SETDATA,
  params,
});

const funcFormShow = title => dispatch => dispatch({
  type: action.FUNCFORM_SHOW,
  title,
});

const funcFormHide = () => dispatch => dispatch({
  type: action.FUNCFORM_HIDE
});

const funcFormReset = () => dispatch => dispatch({
  type: action.FUNCFORM_RESET,
});

const funcFormOpenLoading = () => dispatch => dispatch({
  type: action.FUNCFORM_OPEN_LOADING,
});

const funcFormCloseLoading = () => dispatch => dispatch({
  type: action.FUNCFORM_CLOSE_LOADING,
});

export default {
  action,
  formShow,
  formHide,
  formReset,
  configFormSetData,
  configFormShow,
  configFormHide,
  configFormReset,
  configFormOpenLoading,
  configFormCloseLoading,
  funcFormSetData,
  funcFormShow,
  funcFormHide,
  funcFormReset,
  funcFormOpenLoading,
  funcFormCloseLoading,
};