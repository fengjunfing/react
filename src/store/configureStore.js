import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '@/middleware/api';
import rootReducer from '@/reducers';

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
  compose(applyMiddleware(thunk, api), window.__REDUX_DEVTOOLS_EXTENSION__()) :
  applyMiddleware(thunk, api);
  
const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  middleware
);

export default configureStore;
