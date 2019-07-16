import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.ICBC_E_GROUP_MANAGER;

const tableInitState = Immutable.fromJS({
  type: '',
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
  case actionTypes.SET_TYPE:
    return state
      .set('type', action.types);
  case actionTypes.SET_SEARCH_DATA:
    return state
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
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
  carList: [],
  activityList: [],
  visible: false,
  loading: false,
  uploadLoading: false,
  title: '',
});

let carList, nowBrands, nowSeries;

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
  case actionTypes.HANK_CASCADER_CAR_BRANDS_LIST:
    return state
      .set('carList', Immutable.fromJS([{
        label: action.params.name,
        value: action.params.id,
        __type: 'Brands',
        disabled: true,
      }]));
  case thunkTypes.carBrandsList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.carBrandsList.SUCCESSTYPE:
    carList = state.get('carList').size === 1 ? state.get('carList').toJS() : [];
    return state
      .set('loading', false)
      .set('carList', action.response.get('result').map(v => {
        return {
          label: v.get('name'),
          value: v.get('id'),
          __type: 'Brands',
          isLeaf: false,
        };
      }).push(...carList));
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
          cover: v.get('cover'),
          __type: 'Model',
        };
      });
    return state
      .set('loading', false)
      .set('carList', Immutable.fromJS(carList));
  case thunkTypes.carModelList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.activityList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.activityList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('activityList', action.response.get('result'));
  case thunkTypes.activityList.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

const leftsTableInitState = Immutable.fromJS({
  data: [],
  loading: false,
});

const leftsTable = (state = leftsTableInitState, action) => {
  switch (action.type) {
  case thunkTypes.leftsTableGet.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.leftsTableGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.leftsTableGet.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

const leftsFormInitState = Immutable.fromJS({
  data: {},
  visible: false,
  loading: false,
  uploadLoading: false,
  title: '',
});

const leftsForm = (state = leftsFormInitState, action) => {
  switch (action.type) {
  case thunkTypes.leftsFormGet.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.leftsFormGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.leftsFormGet.FAILURETYPE:
    return state
      .set('loading', false)
      .set('visible', false);
  case actionTypes.LEFTS_FORM_SETDATA:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)));
  case actionTypes.LEFTS_FORM_RESET:
    return state
      .set('data', Immutable.fromJS({}));
  case actionTypes.LEFTS_FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.LEFTS_FORM_HIDE:
    return state
      .set('visible', false);
  case thunkTypes.leftsFormSubmit.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('data', Immutable.fromJS(action.params));
  case thunkTypes.leftsFormSubmit.SUCCESSTYPE:
    return state
      .set('loading', false);
  case thunkTypes.leftsFormSubmit.FAILURETYPE:
    return state
      .set('loading', false);
  case actionTypes.LEFTS_FORM_OPEN_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', true);
  case actionTypes.LEFTS_FORM_CLOSE_UPLOAD_LOADING:
    return state
      .set('data', state.get('data').merge(Immutable.fromJS(action.params)))
      .set('uploadLoading', false);
  default:
    return state;
  }
};

const nameFormInitState = Immutable.fromJS({
  visible: false,
  loading: false,
  title: '',
  leftData: {},
  type: '',
});

const nameForm = (state = nameFormInitState, action) => {
  switch (action.type) {
  case actionTypes.NAME_FORM_SHOW:
    return state
      .set('visible', true)
      .set('title', action.title);
  case actionTypes.NAME_FORM_HIDE:
    return state
      .set('visible', false);
  case actionTypes.NAME_FORM_SET_LEFT_DATA:
    return state
      .set('leftData', Immutable.fromJS(action.leftData));
  case actionTypes.NAME_FORM_RESET:
    return state
      .set('leftData', Immutable.fromJS({}));
  case actionTypes.NAME_FORM_SET_TYPE:
    return state
      .set('type', action.types);
  default:
    return state;
  }
};

const nameTableLeftInitState = Immutable.fromJS({
  data: [],
  loading: false,
  count: 0,
  searchData: {
    currentPage: 1,
    pageSize: 10,
  },
});

const nameTableLeft = (state = nameTableLeftInitState, action) => {
  switch (action.type) {
  case thunkTypes.nameTableLeftGet.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
  case thunkTypes.nameTableLeftGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'))
      .set('count', action.response.get('count'));
  case thunkTypes.nameTableLeftGet.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

const nameTableRightInitState = Immutable.fromJS({
  data: [],
  loading: false,
  count: 0,
  searchData: {
    currentPage: 1,
    pageSize: 10,
  },
});

const nameTableRight = (state = nameTableRightInitState, action) => {
  switch (action.type) {
  case thunkTypes.nameTableRightGet.REQUESTTYPE:
    return state
      .set('loading', true)
      .set('searchData', state.get('searchData').merge(Immutable.fromJS(action.params)));
  case thunkTypes.nameTableRightGet.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'))
      .set('count', action.response.get('count'));
  case thunkTypes.nameTableRightGet.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  table,
  form,
  leftsTable,
  leftsForm,
  nameForm,
  nameTableLeft,
  nameTableRight,
});
