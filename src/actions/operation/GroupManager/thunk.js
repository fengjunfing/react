import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  simpleCarModelListByName: transToThunk(THISACTION + 'SIMPLE_CAR_MODEL_LIST_BY_NAME'),
  carBrandsList: transToThunk(THISACTION + 'CAR_BRANDS_LIST'),
  carSeriesList: transToThunk(THISACTION + 'CAR_SERIES_LIST'),
  carModelList: transToThunk(THISACTION + 'CAR_MODEL_LIST'),
  activityList: transToThunk(THISACTION + 'ACTIVITY_LIST'),
  leftsTableGet: transToThunk(THISACTION + 'LEFTS_TABLE_GET'),
  leftsTableDelete: transToThunk(THISACTION + 'LEFTS_TABLE_DELETE'),
  leftsFormGet: transToThunk(THISACTION + 'LEFTS_FORM_GET'),
  leftsFormSubmit: transToThunk(THISACTION + 'LEFTS_FORM_SUBMIT'),
  nameTableLeftGet: transToThunk(THISACTION + 'NAME_TABLE_LEFT_GET'),
  nameTableRightGet: transToThunk(THISACTION + 'NAME_TABLE_RIGHT_GET'),
};

const tableGetAPI = {
  'MAINTAIN': 'sysFirstpageGroupDetail/queryList4Maintain',
  'SECOND_HAND_CAR': 'sysFirstpageGroupDetail/queryList4SecondCar',
  'CARMODEL': 'sysFirstpageGroupDetail/queryList4CarModel',
};

const tableGet = (params, apiTypes) => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: tableGetAPI[apiTypes],
    params,
  }
});

const nameTableLeftGetAPI = {
  'MAINTAIN': 'shopInfo/queryListPage',
  'SECOND_HAND_CAR': 'merchantInfo/merchantDealerListPage',
};

const nameTableLeftGet = (params, apiTypes) => dispatch => dispatch({
  [THISACTION + 'NAME_TABLE_LEFT_GET']: {
    types: Object.values(thunk.nameTableLeftGet),
    url: nameTableLeftGetAPI[apiTypes],
    params,
  }
});

const nameTableRightGetAPI = {
  'MAINTAIN': 'productInfo/queryListPageByShopId',
  'SECOND_HAND_CAR': 'secondHandCar/queryListPageByMerchandId',
};

const nameTableRightGet = (params, apiTypes) => dispatch => dispatch({
  [THISACTION + 'NAME_TABLE_RIGHT_GET']: {
    types: Object.values(thunk.nameTableRightGet),
    url: nameTableRightGetAPI[apiTypes],
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'sysNewcarGroupDetail/deleteByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'sysNewcarGroupDetail/enableStatus',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'sysNewcarGroupDetail/disableStatus',
    params,
  }
});

const formGetAPI = {
  'MAINTAIN': 'sysFirstpageGroupDetail/selectByPrimaryKey4Maintain',
  'SECOND_HAND_CAR': 'sysFirstpageGroupDetail/selectByPrimaryKey4SecondCar',
  'CARMODEL': 'sysFirstpageGroupDetail/selectByPrimaryKey4CarModel',
};

const formGet = (params, apiTypes) => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: formGetAPI[apiTypes],
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'sysNewcarGroupDetail/addEntity',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'sysNewcarGroupDetail/updateByPrimaryKey',
    params,
  }
});

const simpleCarModelListByName = params => ({
  [THISACTION + 'SIMPLE_CAR_MODEL_LIST_BY_NAME']: {
    types: Object.values(thunk.simpleCarModelListByName),
    url: 'sysCarModel/simpleCarModelListByName',
    params,
  }
});

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

const activityList = params => ({
  [THISACTION + 'ACTIVITY_LIST']: {
    types: Object.values(thunk.activityList),
    url: 'activityInfo/activityList',
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


const leftsTableGet = params => dispatch => dispatch({
  [THISACTION + 'LEFTS_TABLE_GET']: {
    types: Object.values(thunk.leftsTableGet),
    url: 'sysNewcarGroup/queryList',
    params,
  }
});

const leftsTableDelete = params => dispatch => dispatch({
  [THISACTION + 'LEFTS_TABLE_DELETE']: {
    types: Object.values(thunk.leftsTableDelete),
    url: 'sysNewcarGroup/deleteByPrimaryKey',
    params,
  }
});

const leftsFormGet = params => dispatch => dispatch({
  [THISACTION + 'LEFTS_FORM_GET']: {
    types: Object.values(thunk.leftsFormGet),
    url: 'sysNewcarGroup/selectByPrimaryKey',
    params,
  }
});

const leftsFormAddSubmit = params => ({
  [THISACTION + 'LEFTS_FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.leftsFormSubmit),
    url: 'sysNewcarGroup/addEntity',
    params,
  }
});

const leftsFormEditSubmit = params => ({
  [THISACTION + 'LEFTS_FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.leftsFormSubmit),
    url: 'sysNewcarGroup/updateByPrimaryKey',
    params,
  }
});

const leftsFormSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(leftsFormEditSubmit(params));
  } else {
    return dispatch(leftsFormAddSubmit(params));
  }
};

export default {
  thunk,
  tableGet,
  tableDelete,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  leftsTableGet,
  leftsTableDelete,
  leftsFormGet,
  leftsFormSubmit,
  simpleCarModelListByName,
  carBrandsList,
  carSeriesList,
  carModelList,
  activityList,
  nameTableLeftGet,
  nameTableRightGet,
};
