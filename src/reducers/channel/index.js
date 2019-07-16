import { combineReducers } from 'redux-immutable';
import channelManager from './channelManager';
import keyGeneration from './keyGeneration';
import channelAdminManager from './channelAdminManager';
import commodityQuery from './commodityQuery';

export default combineReducers({
  channelManager,
  keyGeneration,
  channelAdminManager,
  commodityQuery,
});
