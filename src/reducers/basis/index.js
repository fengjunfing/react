import { combineReducers } from 'redux-immutable';
import mortgageFreeManager from './mortgageFreeManager';
import bankManager from './bankManager';
import merchantConfManager from './merchantConfManager';
import channelSerTypeConf from './channelSerTypeConf';
import maintenanceProConf from './maintenanceProConf';
import systemCategoryConf from './systemCategoryConf';

export default combineReducers({
  mortgageFreeManager,
  bankManager,
  merchantConfManager,
  channelSerTypeConf,
  maintenanceProConf,
  systemCategoryConf,
});
