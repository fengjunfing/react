import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  getDefaultData: transToThunk(THISACTION + 'GET_DEFAULT_DATA'),
  getChannelInfoList: transToThunk(THISACTION + 'GET_CHANNEL_INFO_LIST'),
  getSchemeInfoList: transToThunk(THISACTION + 'GET_SCHEME_INFO_LIST'),
  addOrUpdateDefaultChannel: transToThunk(THISACTION + 'ADD_OR_UPDATE_DEFAULT_CHANNEL'),
  addOrUpdateDefaultScheme: transToThunk(THISACTION + 'ADD_OR_UPDATE_DEFAULT_SCHEME'),
  addOrUpdateDefaultCity: transToThunk(THISACTION + 'ADD_OR_UPDATE_DEFAULT_CITY'),
};

const getDefaultData = params => dispatch => dispatch({
  [THISACTION + 'GET_DEFAULT_DATA']: {
    types: Object.values(thunk.getDefaultData),
    url: 'defaultConfig/getDefaultData',
    params,
  }
});

const getChannelInfoList = params => dispatch => dispatch({
  [THISACTION + 'GET_CHANNEL_INFO_LIST']: {
    types: Object.values(thunk.getChannelInfoList),
    url: 'defaultConfig/channelInfoList',
    params,
  }
});

const getSchemeInfoList = params => dispatch => dispatch({
  [THISACTION + 'GET_SCHEME_INFO_LIST']: {
    types: Object.values(thunk.getSchemeInfoList),
    url: 'defaultConfig/schemeInfoList',
    params,
  }
});

const addOrUpdateDefaultChannel = params => dispatch => dispatch({
  [THISACTION + 'ADD_OR_UPDATE_DEFAULT_CHANNEL']: {
    types: Object.values(thunk.addOrUpdateDefaultChannel),
    url: 'defaultConfig/addOrUpdateDefaultChannel',
    params,
  }
});

const addOrUpdateDefaultScheme = params => dispatch => dispatch({
  [THISACTION + 'ADD_OR_UPDATE_DEFAULT_SCHEME']: {
    types: Object.values(thunk.addOrUpdateDefaultScheme),
    url: 'defaultConfig/addOrUpdateDefaultScheme',
    params,
  }
});

const addOrUpdateDefaultCity = params => dispatch => dispatch({
  [THISACTION + 'ADD_OR_UPDATE_DEFAULT_CITY']: {
    types: Object.values(thunk.addOrUpdateDefaultCity),
    url: 'defaultConfig/addOrUpdateDefaultCity',
    params,
  }
});

export default {
  thunk,
  getDefaultData,
  getChannelInfoList,
  getSchemeInfoList,
  addOrUpdateDefaultChannel,
  addOrUpdateDefaultScheme,
  addOrUpdateDefaultCity,
};