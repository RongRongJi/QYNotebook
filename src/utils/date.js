
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