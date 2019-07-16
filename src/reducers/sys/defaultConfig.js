import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
} = Actions.DEFAULT_CONFIG;

const dataInitState = Immutable.fromJS({
  data: {},
  channelInfoList: [],
  schemeInfoList: [],
  loading: false,
});

const data = (state = dataInitState, action) => {
  switch (action.type) {
  case thunkTypes.getDefaultData.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getDefaultData.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.getDefaultData.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.getChannelInfoList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getChannelInfoList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('channelInfoList', action.response.get('result'));
  case thunkTypes.getChannelInfoList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.getSchemeInfoList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getSchemeInfoList.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('schemeInfoList', action.response.get('result'));
  case thunkTypes.getSchemeInfoList.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  data,
});