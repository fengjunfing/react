import { combineReducers } from 'redux-immutable';
import brandsManager from './brandsManager';
import seriesManager from './seriesManager';
import modelManager from './modelManager';

export default combineReducers({
  brandsManager,
  seriesManager,
  modelManager,
});
