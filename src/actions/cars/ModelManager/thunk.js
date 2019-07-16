import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  getCarBrandsList: transToThunk(THISACTION + 'GET_CAR_BRANDS_LIST'),
  getCarSeriesList: transToThunk(THISACTION + 'GET_CAR_SERIES_LIST'),
};

const getCarBrandsList = params => dispatch => dispatch({
  [THISACTION + 'GET_CAR_BRANDS_LIST']: {
    types: Object.values(thunk.getCarBrandsList),
    url: 'sysCarBrands/carBrandsList',
    params,
  }
});

const getCarSeriesList = params => dispatch => dispatch({
  [THISACTION + 'GET_CAR_SERIES_LIST']: {
    types: Object.values(thunk.getCarSeriesList),
    url: 'sysCarSeries/carSeriesList',
    params,
  }
});

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'sysCarModel/carModelListPage',
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'sysCarModel/deleteCarModelByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'sysCarModel/enableCarModel',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'sysCarModel/disableCarModel',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'sysCarModel/selectByPrimaryKey',
    params,
  }
});

// const formAddSubmit = params => ({
//   [THISACTION + 'FORM_ADD_SUBMIT']: {
//     types: Object.values(thunk.formSubmit),
//     url: 'appManager/addApp',
//     params,
//   }
// });

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'sysCarModel/updateCarModel',
    params,
  }
});

const formSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(formEditSubmit(params));
  } else {
    // return dispatch(formAddSubmit(params));
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
  getCarBrandsList,
  getCarSeriesList,
};