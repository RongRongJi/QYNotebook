import  '../static/async_storage';

// 存储锁密码
export function setLockType(pwd){
  global.storage.save({
    key:'lock',
    data:{
      password: pwd
    },
  });
}

//初始化锁
export function setLockState(){
  global.storage.load({
    key:'lock',
  }).then((res)=>{
    global.lock_pwd = res.password;
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

