import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from './containers/basic/Root';
import configureStore from './store/configureStore';
import basename from './publicData/basename';
import 'less';
// use cdn
// import 'antd/dist/antd.less';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <Root />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);