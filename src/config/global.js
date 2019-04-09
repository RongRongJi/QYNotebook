import '../static/async_storage';

// 主题模式
// day & night & eyeprotect
//alert(global.storage);
/*global.storage.save({
  key: 'colorType',
  id: 'day',
  data: {},
  expires:1000*60,
});

global.storage.getIdsForKey('colorType').then(id =>{
  global.colorType = id;
});*/
global.colorType = 'day';