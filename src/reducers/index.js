import { combineReducers } from 'redux-immutable';
import basic from './basic';
import sys from './sys';
import cars from './cars';
import channel from './channel';
import basis from './basis';
import operation from './operation';
import sales from './sales';

export default combineReducers({
  basic,
  sys,
  cars,
  channel,
  basis,
  operation,
  sales,
});
