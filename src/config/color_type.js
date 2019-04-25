//import './global';

const dayType={
  Background : '#FFFFFF',
  TextColor : '#777',
  TitleColor : '#000',
  Modal : 'rgba(0,0,0,0.5)',
  ItemBackground : '#049F9A',
  FoldColor : '#C8ECEA',
  ViewColor : '#eee',
  LineColor : '#ccc',
  TabShadow : '#dddddd',
};

const nightType={
  Background : '#283337',
  TitleColor : '#9da8ad',
  TextColor : '#9da8ad',
  Modal : 'rgba(50,61,65,1)',
  //ItemBackground : '#263238',
  ItemBackground : '#86959c',
  FoldColor : '#424952',
  ViewColor : '#283337',
  LineColor : '#314047',
  TabShadow : '#314047',
};

/*const eyeprotectType={
  Background : '#C7EDCC',
  TextColor : '#000000',
  Modal : 'rgba(199,237,204,0.5)',
  ItemBackground : '#ffffff',
  FoldColor : '#C8ECEA',
  ViewColor : '#eee',
};*/


export function getColorType(){
  //alert(global.colorType);
  if(global.colorType && global.colorType=='day'){
    return dayType;
  }else if(global.colorType && global.colorType =='night'){
    return nightType;
  }/*else if(global.colorType && global.colorType =='eyeprotect'){
    return eyeprotectType;
  }*/
  //alert(colorType[Background]);
  return dayType;
}