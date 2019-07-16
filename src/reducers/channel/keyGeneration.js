import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
} = Actions.KEY_GENERATION;

const formInitState = Immutable.fromJS({
  data: {},
  loading: false,
});

const form = (state = formInitState, action) => {
  switch (action.type) {
  case thunkTypes.generationKey.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.generationKey.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.generationKey.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};

export default combineReducers({
  form,
});
