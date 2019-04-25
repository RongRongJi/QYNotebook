import {InnerNaviBar} from 'react-native-pure-navigation-bar';
import { getColorType } from './color_type';

export function setHeader(){
  InnerNaviBar.defaultProps.style.safeView ={
    flex:0,
    backgroundColor: getColorType()['Background'],
  };
  InnerNaviBar.defaultProps.navbarHeight=50;
  InnerNaviBar.defaultProps.gobackImage=require('./images/back.png');
  InnerNaviBar.defaultProps.style.title={
    fontSize:17,
    color: getColorType()['ItemBackground'],
    textAlign:'center',
    overflow:'hidden',
    fontWeight: 'bold',
  };
}
