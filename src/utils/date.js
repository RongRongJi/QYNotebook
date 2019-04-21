
//获取当前年月日输出
export function getDateString(d){
  let array = d.split('-');
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if(year==parseInt(array[0]) && month+1==parseInt(array[1]) && day==parseInt(array[2])){
    return '今天';
  }else if(year==parseInt(array[0])){
    return array[1]+'.'+array[2];
  }else{
    return d;
  }
}


//对比日期
export function compareDate(d){
  let array = d.split('-');
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if(year==parseInt(array[0]) && month+1==parseInt(array[1]) && day==parseInt(array[2])){
    return true;
  }
  return false;
}


//处理react-native-modal-datetime-picker中获取的值
export function getDate(d){
  let array = d.split(' ');
  let date = array[3]+'-';
  let month = 0;
  switch(array[1]){
  case 'Jan':month=1;break;
  case 'Feb':month=2;break;
  case 'Mar':month=3;break;
  case 'Apr':month=4;break;
  case 'May':month=5;break;
  case 'Jun':month=6;break;
  case 'Jul':month=7;break;
  case 'Aug':month=8;break;
  case 'Sep':month=9;break;
  case 'Oct':month=10;break;
  case 'Nov':month=11;break;
  case 'Dec':month=12;break;
  }
  date = date+month+'-'+array[2];
  return date;
}