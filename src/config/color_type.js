//import './global';

const dayType={
  Background : '#FFFFFF',
  TextColor : '#000000',
  Modal : 'rgba(0,0,0,0.5)',
  ItemBackground : '#049F9A',
  FoldColor : '#C8ECEA',
  ViewColor : '#eee',
};

const nightType={
  Background : '#37474f',
  TextColor : '#000000',
  Modal : 'rgba(38,50,56,0.5)',
  ItemBackground : '#263238',
  FoldColor : '#C8ECEA',
  ViewColor : '#eee',
};

const eyeprotectType={
  Background : '#C7EDCC',
  TextColor : '#000000',
  Modal : 'rgba(199,237,204,0.5)',
  ItemBackground : '#ffffff',
  FoldColor : '#C8ECEA',
  ViewColor : '#eee',
};


export function getColorType(){
  //alert(global.colorType);
  if(global.colorType && global.colorType=='day'){
    return dayType;
  }else if(global.colorType && global.colorType =='night'){
    return nightType;
  }else if(global.colorType && global.colorType =='eyeprotect'){
    return eyeprotectType;
  }
  //alert(colorType[Background]);
  return dayType;
}