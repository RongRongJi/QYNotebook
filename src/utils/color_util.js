import  '../static/async_storage';

// 主题模式
// day & night & eyeprotect
function setColorType(t){
  console.log('global username' +global.username+ ' t='+t);
  //本地模式
  if(global.username==''){
    global.storage.save({
      key:'colorType',
      data:{
        type: t
      },
    });
  }
  //云同步模式
  else{
    global.storage.save({
      key:global.username,
      data:{
        username: global.username,
        lock: global.lock_pwd,
        color: t,
      }  
    });
  }
}

//初始化颜色
export function setColorState(){
  var p = new Promise(function(resolve,reject){
    //本地模式
    if(global.username==''){
      global.storage.load({
        key:'colorType',
      }).then((res)=>{
        console.log(res.type);
        global.colorType = res.type;
      }).catch((err)=>{
        switch(err.name){
        case 'NotFoundError':
          console.log('NotFoundError');
          setColorType('day');
          global.colorType = 'day';
          break;
        case 'ExpiredError':
          console.log('ExpiredError');
          setColorType('day');
          global.colorType = 'day';
          break;
        }
      });
    }
    //云同步模式
    else{
      global.storage.load({
        key:global.username,
      }).then((res)=>{
        console.log(res.color);
        global.colorType = res.color;
      }).catch((err)=>{
        switch(err.name){
        case 'NotFoundError':
          console.log('NotFoundError');
          setColorType('day');
          global.colorType = 'day';
          break;
        case 'ExpiredError':
          console.log('ExpiredError');
          setColorType('day');
          global.colorType = 'day';
          break;
        }
      });
    }
  });
  return p;
}

//切换模式
export function changeColorMode(){
  //切换成夜间模式
  if(global.colorType=='day'){
    global.colorType = 'night';
    setColorType('night');
    //初始化颜色
    //setHeader();
  }
  //切换日间模式
  else if(global.colorType=='night'){
    global.colorType = 'day';
    setColorType('day');
  }
}