import { combineReducers } from 'redux-immutable';
import appManager from './appManager';
import menuManager from './menuManager';
import dictManager from './dictManager';
import userManager from './userManager';
import roleManager from './roleManager';
import functionManager from './functionManager';
import defaultConfig from './defaultConfig';

export default combineReducers({
  appManager,
  menuManager,
  dictManager,
  userManager,
  roleManager,
  functionManager,
  defaultConfig,
});
