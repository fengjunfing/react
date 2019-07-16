import Immutable from 'immutable';
import Actions from '@/actions';

// const thunkTypes = Actions.MENU.thunk;
const actionTypes = Actions.TABS.action;

const initialState = Immutable.fromJS([

]);

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET:
    const cache = localStorage.getItem('cacheTabs') ? JSON.parse(localStorage.getItem('cacheTabs')) : [];
    const result = [];
    cache.forEach(path => {
      result.push(action.params.toJS().find(item => item.path === path));
    });
    return Immutable.fromJS(result.filter(v => v));
  case actionTypes.ADD:
    const addResult = Immutable.fromJS([
      ...state,
      action.tab
    ]);
    localStorage.setItem('cacheTabs', JSON.stringify(addResult.map(item => item.get('path'))));
    return Immutable.fromJS(addResult);
  case actionTypes.REMOVE:
    const removeResult = Immutable.fromJS([
      ...state.filter(item => item.get('path') !== action.path)
    ]);
    localStorage.setItem('cacheTabs', JSON.stringify(removeResult.map(item => item.get('path'))));
    return Immutable.fromJS(removeResult);
  case actionTypes.RESERVE:
    const reserveResult = Immutable.fromJS([action.tab]);
    localStorage.setItem('cacheTabs', JSON.stringify(reserveResult.map(item => item.get('path'))));
    return Immutable.fromJS(reserveResult);
  case actionTypes.CLEAR:
    const clearResult = Immutable.fromJS([]);
    localStorage.setItem('cacheTabs', []);
    return Immutable.fromJS(clearResult);
  default:
    return state;
  }
};