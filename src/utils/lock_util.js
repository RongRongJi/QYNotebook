import  '../static/async_storage';

// 存储锁密码
export function setLockType(pwd){
  global.storage.save({
    key:'lock',
    data:{
      password: pwd
    },
  });
  global.lock_pwd = pwd;
}

//初始化锁
export function setLockState(){
  global.storage.load({
    key:'lock',
  }).then((res)=>{
    global.lock_pwd = res.password;
    console.log(global.lock_pwd);
  }).catch((err)=>{
    switch(err.name){
    case 'NotFoundError':
      console.log('NotFoundError');
      //alert('err');
      break;
    case 'ExpiredError':
      console.log('ExpiredErrorLock');
      break;
    }
  });
}

//重置锁
export function resetLock(){
  storage.remove({
    key:'lock',
  });
}