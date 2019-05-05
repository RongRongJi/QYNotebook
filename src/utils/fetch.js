/*
 * 网络工具函数
 */
('use strict');

let baseUrl = 'http://192.168.137.1:8000/';
export const URL = {
  register: baseUrl + 'user/register',
  login: baseUrl + 'user/login',
  update: baseUrl + 'user/update',
  get_user_info: baseUrl + '/user/getuserinfo',
  todo_upload: baseUrl + 'todo/upload',
  todo_get_all_uuid: baseUrl + 'todo/getalluuid',
  todo_download: baseUrl + 'todo/download',
  todo_delete: baseUrl + 'todo/delete',
  note_upload: baseUrl + 'note/upload',
  note_download: baseUrl + 'note/download',
  note_get_all_uuid: baseUrl + 'note/getalluuid',
  note_delete: baseUrl + 'note/delete'
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

/**
 * @param {string} url
 * @param {int} timeout 超时(可选, 默认10s)
 * @param {string} authorization token(可选)
 */
export const Get = (url, timeout = 10000, authorization) => {
  console.log('Start get: ' + url);
  //fetch请求
  const request = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: authorization
      }
    })
      .then(response => {
        console.log('Return: ', response);
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

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join('&');
}

/**
 * @param {string} url
 * @param {Object} params
 * @param {int} timeout 超时(可选, 默认10s)
 * @param {string} authorization token(可选)
 */
export const GetWithParams = (url, params, timeout = 10000, authorization) => {
  let query = url + '?' + objToQueryString(params);
  return Get(query, timeout, authorization);
};
/**
 * @param {string} url
 * @param {[Object]} files [{name:uri}]
 * @param {Object} params
 * @param {int} timeout 超时(可选, 默认10s)
 * @param {string} authorization token(可选)
 */
export const PostFile = (
  url,
  params,
  files,
  names,
  timeout = 60000,
  authorization
) => {
  console.log('Start upload:"' + url + '"');
  // format data
  let formdata = new FormData();
  if (params) {
    for (var key in params) {
      if (typeof params[key] == 'object')
        formdata.append(key, JSON.stringify(params[key]));
      else formdata.append(key, params[key]);
    }
  }
  // 图片
  for (var i = 0; i < files.length; i++) {
    var name = names[i];
    var uri = files[i];
    let file = { uri: uri, type: 'multipart/form-data', name: name };
    formdata.append(name, file);
  }
  //fetch请求
  const request = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type':'multipart/form-data',
        Authorization: authorization
      },
      body: formdata
    })
      .then(response => {
        console.log('Return: ', response);
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
