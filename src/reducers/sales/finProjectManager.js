import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.FIN_PROJECT_MANAGER;

const tableInitState = Immutable.fromJS({
  channelNameList: [],
  data: [],
  loading: false,
  count: 0,
  searchData: {
    currentPage: 1,
    pageSize: 10,
  },
});

const table = (state = tableInitState, action) => {
  switch (action.type) {
  case thunkTypes.tableGet.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
  case thunkTypes.tableGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'))
      .set('count', action.response.get('count'));
  case thunkTypes.tableGet.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.queryChannelNameList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.queryChannelNameList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('channelNameList', action.response.get('result'));
  case thunkTypes.queryChannelNameList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.tablePublish.REQUESTTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', true) : t));
  case thunkTypes.tablePublish.SUCCESSTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('status', 'y').set('loading', false) : t));
  case thunkTypes.tablePublish.FAILURETYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', false) : t));
  case thunkTypes.tableUnpublish.REQUESTTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', true) : t));
  case thunkTypes.tableUnpublish.SUCCESSTYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('status', 'n').set('loading', false) : t));
  case thunkTypes.tableUnpublish.FAILURETYPE:
    return state
      .set('data', state.get('data').map(t => t.get('id') === action.params.id ? t.set('loading', false) : t));
  default:
    return state;
  }
};

const formInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  uploadLoading: false,
  title: '',
});

const form = (state = formInitState, action) => {
  switch (action.type) {
  case thunkTypes.formGet.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.formGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.formGet.FAILURETYPE:
    return state
      .set('loading', false)
      .set('visible', false);
  case actionTypes.FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.FORM_HIDE:
    return state
      .set('visible', false);
  case thunkTypes.formSubmit.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('data', Immutable.fromJS(action.params));
  case thunkTypes.formSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.formSubmit.FAILURETYPE:
    return state
      .set('loading', false);
  case actionTypes.FORM_OPEN_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', true);
  case actionTypes.FORM_CLOSE_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', false);
  default:
    return state;
  }
};

const detailFormInitState = Immutable.fromJS({
  data: {},
  visible: false,
  title: '',
  __index: -1,
});

const detailForm = (state = detailFormInitState, action) => {
  switch (action.type) {
  case actionTypes.DETAIL_FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.DETAIL_FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.DETAIL_FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.params.title)
      .set('__index', action.params.index);
  case actionTypes.DETAIL_FORM_HIDE:
    return state
      .set('visible', false);
  default:
    return state;
  }
};

const configCarFormInitState = Immutable.fromJS({
  data: {
    list: [],
  },
  carList: [],
  visible: false,
  title: '',
  loading: false,
});

let carList, nowBrands, nowSeries;

const configCarForm = (state = configCarFormInitState, action) => {
  switch (action.type) {
  case actionTypes.CONFIG_CAR_FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.CONFIG_CAR_FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.CONFIG_CAR_FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.CONFIG_CAR_FORM_HIDE:
    return state
      .set('visible', false);
  case thunkTypes.carBrandsList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.carBrandsList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('carList', action.response.get('result').map(v => {
        return {
          label: v.get('name'),
          value: v.get('id'),
          __type: 'Brands',
          isLeaf: false,
        };
      }));
  case thunkTypes.carBrandsList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.carSeriesList.REQUESTTYPE:
    carList = state.get('carList').toJS();
    nowBrands = carList.find(v => v.value == action.params.brandId);
    nowBrands.loading = true;
    return state
      .set('loading', true)
      .set('carList', Immutable.fromJS(carList));
  case thunkTypes.carSeriesList.SUCCESSTYPE:
    carList = state.get('carList').toJS();
    nowBrands = carList.find(v => v.value == action.params.brandId);
    nowBrands.loading = false;
    nowBrands.children = action.response.get('result').map(v => {
      return {
        label: v.get('name'),
        value: v.get('id'),
        __type: 'Series',
        isLeaf: false,
      };
    });
    return state
      .set('loading', false)
      .set('carList', Immutable.fromJS(carList));
  case thunkTypes.carSeriesList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.carModelList.REQUESTTYPE:
    carList = state.get('carList').toJS();
    nowBrands = carList.find(v => v.value == action.params.brandId);
    nowSeries = nowBrands.children.find(v => v.value == action.params.seriesId);
    nowSeries.loading = true;
    return state
      .set('loading', true)
      .set('carList', Immutable.fromJS(carList));
  case thunkTypes.carModelList.SUCCESSTYPE:
    carList = state.get('carList').toJS();
    nowBrands = carList.find(v => v.value == action.params.brandId);
    nowSeries = nowBrands.children.find(v => v.value == action.params.seriesId);
    nowSeries.loading = false;
    nowSeries.children = action.response.get('result')
      .sort((a, b) => Number(b.get('modelYear')) - Number(a.get('modelYear')))
      .map(v => {
        return {
          label: v.get('name'),
          value: v.get('id'),
          guidePrice: v.get('guidePrice'),
          firstPayment: v.get('firstPayment'),
          monthlyPayment: v.get('monthlyPayment'),
          __type: 'Model',
        };
      });
    return state
      .set('loading', false)
      .set('carList', Immutable.fromJS(carList));
  case thunkTypes.carModelList.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  table,
  form,
  detailForm,
  configCarForm,
});
