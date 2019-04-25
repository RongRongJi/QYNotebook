import  '../static/async_storage';

// 主题模式
// day & night & eyeprotect
function setColorType(t){
  global.storage.save({
    key:'colorType',
    data:{
      type: t
    },
  });
}

//初始化颜色
export function setColorState(){
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