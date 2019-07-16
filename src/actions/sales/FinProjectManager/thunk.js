import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  queryChannelNameList: transToThunk(THISACTION + 'QUERY_CHANNEL_NAME_LIST'),
  selectCarModelByPrimaryKey: transToThunk(THISACTION + 'SELECT_CAR_MODEL_BY_PRIMARY_KEY'),
  carBrandsList: transToThunk(THISACTION + 'CAR_BRANDS_LIST'),
  carSeriesList: transToThunk(THISACTION + 'CAR_SERIES_LIST'),
  carModelList: transToThunk(THISACTION + 'CAR_MODEL_LIST'),
  addSchemeCarModelList: transToThunk(THISACTION + 'ADD_SCHEME_CAR_MODEL_LIST'),
};

const queryChannelNameList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_CHANNEL_NAME_LIST']: {
    types: Object.values(thunk.queryChannelNameList),
    url: 'channelUser/queryChannelNameList',
    params,
  }
});

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'schemeInfo/schemeInfoListPage',
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'schemeInfo/deleteSchemeInfoByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'schemeInfo/enableSchemeInfo',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'schemeInfo/disableSchemeInfo',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'schemeInfo/selectExtByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'schemeInfo/addSchemeInfoExt',
    params,
    payload: true,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'schemeInfo/updateSchemeInfoExt',
    params,
    payload: true,
  }
});

const selectCarModelByPrimaryKey = params => ({
  [THISACTION + 'SELECT_CAR_MODEL_BY_PRIMARY_KEY']: {
    types: Object.values(thunk.selectCarModelByPrimaryKey),
    url: 'schemeInfo/selectCarModelByPrimaryKey',
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

const carBrandsList = params => ({
  [THISACTION + 'CAR_BRANDS_LIST']: {
    types: Object.values(thunk.carBrandsList),
    url: 'sysCarBrands/carBrandsList',
    params,
  }
});

const carSeriesList = params => ({
  [THISACTION + 'CAR_SERIES_LIST']: {
    types: Object.values(thunk.carSeriesList),
    url: 'sysCarSeries/carSeriesList',
    params,
  }
});

const carModelList = params => ({
  [THISACTION + 'CAR_MODEL_LIST']: {
    types: Object.values(thunk.carModelList),
    url: 'sysCarModel/carModelList',
    params,
  }
});

const addSchemeCarModelList = params => ({
  [THISACTION + 'ADD_SCHEME_CAR_MODEL_LIST']: {
    types: Object.values(thunk.addSchemeCarModelList),
    url: 'schemeInfo/addSchemeCarModelList',
    params,
    payload: true,
  }
});

export default {
  thunk,
  tableGet,
  tableDelete,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  queryChannelNameList,
  selectCarModelByPrimaryKey,
  carBrandsList,
  carSeriesList,
  carModelList,
  addSchemeCarModelList,
};
