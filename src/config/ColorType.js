import './global'

const dayType={
    Background : '#F2F4F7',
    TextColor : '#000000',
    ItemBackground : '#ffffff',
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
}

export function getColorType(){
    const colorType = {};
    if(global.colorType && global.colorType=='day'){
        colorType["Background"]=dayType.Background;
        colorType["TextColor"]=dayType.TextColor;
        colorType["ItemBackground"]=dayType.ItemBackground;
    }else if(global.colorType && global.colorType =='night'){
        colorType = nightType;
    }else if(global.colorType && global.colorType =='eyeprotect'){
        colorType = eyeprotectType;
    }
    //alert(colorType[Background]);
    return colorType;
}