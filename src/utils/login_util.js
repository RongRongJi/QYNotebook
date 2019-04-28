import  '../static/async_storage';

/**
 * data: {
 *      username: 13705934511,
 *      lock: '1234',
 *      color: 'day',
 * }
 */

/**
 * 用户已经登录过
 * 直接登录
 */
export function DirectLogin(){
  let p = new Promise(function(resolve,reject){
    global.storage.load({
      key:'currentUser',
    }).then((res)=>{
      resolve(res);
    }).catch((err)=>{
      resolve(false);
    });
  });
  return p;
}

/**
 * 注销用户
 */
export function LogOff(){
  let p = new Promise(function(resolve,reject){
    storage.remove({
      key:'currentUser',
    });
    resolve(true);
  });
  return p;
}

/**
 * 存储当前用户信息
 */
export function LogIn(username,lock,color){
  let p = new Promise(function(resolve,reject){
    storage.save({
      key:'currentUser',
      data:{
        username: username,
        lock: lock,
        color: color,
      }  
    });
  });
  return p;
}


/**
 * 登录账号
 * 读取用户数据
 * 若无此用户数据则新建数据
 */
export function getUserData(username){
  let p = new Promise(function(resolve,reject){
    global.storage.load({
      key:username,
    }).then((res)=>{
      global.username = res.username;
      global.lock_pwd = res.lock;
      global.colorType = res.color;
      console.log('getUserData'+username);
      LogIn(res.username,res.lock,res.color);
      resolve(res);
    }).catch((err)=>{
      switch(err.name){
      case 'NotFoundError':
        console.log('NotFoundError_getUserData');
        InitSetting(username);
        global.username =username;
        global.lock_pwd ='';
        global.colorType='day';
        console.log('getUserData'+global.username);
        LogIn(username,'','day');
        resolve(false);
        break;
      case 'ExpiredError':
        console.log('ExpiredError_getUserData');
        break;
      }
    });
  });
  return p;
}

/**
 * 本地新用户初始化设置
 */
export function InitSetting(username){
  global.storage.save({
    key:username,
    data:{
      username: username,
      lock: '',
      color: 'day',
    }  
  });
}