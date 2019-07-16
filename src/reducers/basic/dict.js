import Immutable from 'immutable';
import Actions from '@/actions';

const thunkTypes = Actions.DICT.thunk;

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case thunkTypes.getData.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getData.SUCCESSTYPE:
    const dictData = {};
    const filterResult = action.response.get('result').toJS().filter(item => item.status === 'y');
    filterResult.forEach(item => {
      dictData[item.typeCode] = {};
    });
    filterResult.forEach(item => {
      dictData[item.typeCode][item.dictValue] = item.dictName;
    });
    return state
      .set('loading', false)
      .set('data', Immutable.fromJS(dictData));
  case thunkTypes.getData.FAILURETYPE:
    return state
      .set('loading', false);
  default:
    return state;
  }
};