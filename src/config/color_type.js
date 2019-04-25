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
  Background : '#191919',
  TitleColor : '#424952',
  TextColor : '#424952',
  Modal : 'rgba(38,50,56,0.5)',
  //ItemBackground : '#263238',
  ItemBackground : '#424952',
  FoldColor : '#424952',
  ViewColor : '#191919',
  LineColor : '#000',
  TabShadow : '#000',
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