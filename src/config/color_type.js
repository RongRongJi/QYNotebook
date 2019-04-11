//import './global';

const dayType={
  Background : '#FFFFFF',
  TextColor : '#FFFFFF',
  ItemBackground : '#049F9A',
};

const nightType={
  Background : '#263238',
  TextColor : '#ffffff',
  ItemBackground : '#37474f',
};

const eyeprotectType={
  Background : '#C7EDCC',
  TextColor : '#000000',
  ItemBackground : '#ffffff',
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