import './global';

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
  const colorType = {};
  if(global.colorType && global.colorType=='day'){
    colorType['Background']=dayType.Background;
    colorType['TextColor']=dayType.TextColor;
    colorType['ItemBackground']=dayType.ItemBackground;
  }else if(global.colorType && global.colorType =='night'){
    colorType['Background']=nightType.Background;
    colorType['TextColor']=nightType.TextColor;
    colorType['ItemBackground']=nightType.ItemBackground;
  }else if(global.colorType && global.colorType =='eyeprotect'){
    colorType['Background']=eyeprotectType.Background;
    colorType['TextColor']=eyeprotectType.TextColor;
    colorType['ItemBackground']=eyeprotectType.ItemBackground;
  }
  //alert(colorType[Background]);
  return colorType;
}