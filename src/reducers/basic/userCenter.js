import Immutable from 'immutable';
import Actions from '@/actions';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.USERCENTER;

const initState = Immutable.fromJS({
  data: {
    user: {},
  },
  visible: false,
  loading: false,
});

export default (state = initState, action) => {
  switch (action.type) {
  case thunkTypes.getData.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getData.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('data', action.response.get('result'));
  case thunkTypes.getData.FAILURETYPE:
    return state
      .set('loading', false)
      .set('visible', false);
  case actionTypes.SHOW:
    return state
      .set('visible', true);
  case actionTypes.HIDE:
    return state
      .set('visible', false);
  default:
    return state;
  }
};