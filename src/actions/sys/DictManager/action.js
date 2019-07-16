import THISACTION from './name';

import child from './child';

const action = {
  FORM_MENUTREE: THISACTION + 'FORM_MENUTREE',
  FORM_RESET: THISACTION + 'FORM_RESET',
  FORM_SETDATA: THISACTION + 'FORM_SETDATA',
  FORM_SHOW: THISACTION + 'FORM_SHOW',
  FORM_HIDE: THISACTION + 'FORM_HIDE',
  ...child.action,
};

const formGetMenuTree = opt => dispatch => dispatch({
  type: action.FORM_MENUTREE,
  opt,
});

const formReset = () => dispatch => dispatch({
  type: action.FORM_RESET,
});

const formSetData = params => dispatch => dispatch({
  type: action.FORM_SETDATA,
  params,
});

const formShow = title => dispatch => dispatch({
  type: action.FORM_SHOW,
  title,
});

const formHide = () => dispatch => dispatch({
  type: action.FORM_HIDE,
});

export default {
  action,
  formGetMenuTree,
  formReset,
  formSetData,
  formShow,
  formHide,
};