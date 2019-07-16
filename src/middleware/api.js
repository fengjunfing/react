import Immutable from 'immutable';
import axios from 'axios';
const querystring = require('querystring');
import { notification } from 'antd';
import basename from '@/publicData/basename';

export const ajax = (url, params, payload, jump = false) => {
  const fullUrl = /^http/.test(url) ? url : basename.replace(/\/$/, '') + '/'  + url;
  let formData;
  if (payload) {
    formData = params;
  } else {
    for (let attr in params) {
      if (params[attr] && params[attr].constructor === Array) {
        params[attr] = '[' + params[attr].join(',') + ']';
      }
    }
    formData = querystring.stringify(params);
  }
  return axios({
    method: params ? 'post' : 'get',
    url: fullUrl,
    data: formData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }).then(response => {
    if (jump) { return Promise.resolve(response.data); }
    if (response.data.success) {
      return Promise.resolve(Immutable.fromJS(response.data));
    } else {
      return Promise.reject(response.data);
    }
  });
};

export default () => next => action => {
  const NOW_API = Object.keys(action)[0];
  if (NOW_API === 'type') {
    return next(action);
  }
  const API = action[NOW_API];

  const { types, url, params, payload, extraData } = API;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[NOW_API];
    return finalAction;
  };

  const [REQUESTTYPE, SUCCESSTYPE, FAILURETYPE] = types;

  next(actionWith({
    type: REQUESTTYPE,
    url,
    params,
    extraData,
  }));
  return ajax(url, params, payload).then(
    response => {
      next(actionWith({
        type: SUCCESSTYPE,
        response,
        params,
        extraData,
      }));
      return Promise.resolve(response);
    },
    error => {
      next(actionWith({
        type: FAILURETYPE,
        response: Immutable.fromJS({
          success: false
        }),
        params,
      }));
      if (error.errCode) {
        notification['error']({
          message: error.errCode || '错误！',
          description: error.info || '发生了不知名的错误',
        });
      }
      if (error.errCode === '401') {
        next(actionWith({
          type: 'LOGOUT_SUCCESSTYPE',
        }));
      } else {
        return Promise.reject('请求失败！');
      }
    }
  );
};
