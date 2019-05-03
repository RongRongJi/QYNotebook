import '../static/async_storage';
import { URL, PostJSON } from './fetch';
// 主题模式
// day & night & eyeprotect
function setColorType(t) {
  //本地模式
  if (global.username == '') {
    global.storage.save({
      key: 'colorType',
      data: {
        type: t
      }
    });
  }
  //云同步模式
  else {
    global.storage.save({
      key: global.username,
      data: {
        username: global.username,
        lock: global.lock_pwd,
        color: t
      }
    });
    PostJSON(URL.update, {
      usernum: global.username,
      lock: global.lock_pwd,
      color: global.colorType
    }).then(res => {
      console.log(res);
      if (res.ret == 0) {
        console.log(res.ret);
      } else {
        console.log('failed');
      }
    });
  }
}

//初始化颜色
export function setColorState() {
  var p = new Promise(function(resolve, reject) {
    global.storage
      .load({
        key: 'colorType'
      })
      .then(res => {
        console.log(res.type);
        global.colorType = res.type;
      })
      .catch(err => {
        switch (err.name) {
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
  });
  return p;
}

//切换模式
export function changeColorMode() {
  //切换成夜间模式
  if (global.colorType == 'day') {
    global.colorType = 'night';
    setColorType('night');
    //初始化颜色
    //setHeader();
  }
  //切换日间模式
  else if (global.colorType == 'night') {
    global.colorType = 'day';
    setColorType('day');
  }
}
