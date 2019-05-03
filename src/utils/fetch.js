/*
 * 网络工具函数
 */
('use strict');

let baseUrl = 'http://192.168.137.1:8000/';
export const URL = {
  register: baseUrl + 'user/register',
  login: baseUrl + 'user/login',
  update: baseUrl + 'user/update'
};

/**
 * @param {string} url
 * @param {Object} params
 * @param {int} timeout 超时(可选, 默认10s)
 * @param {string} authorization token(可选)
 */
export const PostJSON = (url, params, timeout = 10000, authorization) => {
  console.log('Start post: ' + url + '' + '\nparams: ', params);
  // format data
  let formdata = new FormData();
  for (var key in params) {
    if (typeof params[key] == 'object')
      formdata.append(key, JSON.stringify(params[key]));
    else formdata.append(key, params[key]);
  }
  //fetch请求
  const request = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: authorization
      },
      body: formdata
    })
      .then(response => {
        console.log(response);
        console.log('Return: ', response.status, response.statusText);
        if (response.status >= 200 && response.status < 300) {
          resolve(response.json());
        } else {
          reject(`${response.status}`);
        }
      })
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(e => reject(e.message));
  });

  //超时
  const timeoutRequest = new Promise((resolve, reject) => {
    setTimeout(reject, timeout, '网络连接超时');
  });

  return Promise.race([request, timeoutRequest]).then(
    result => {
      return result;
    },
    message => {
      throw new Error(message);
    }
  );
};
