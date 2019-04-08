import {InnerNaviBar} from 'react-native-pure-navigation-bar';
import { getColorType } from './ColorType';

InnerNaviBar.defaultProps.style.safeView ={
  flex:0,
  backgroundColor: getColorType()["ItemBackground"],
}
InnerNaviBar.defaultProps.navbarHeight=50;
InnerNaviBar.defaultProps.gobackImage=require('./images/back.png');
InnerNaviBar.defaultProps.style.title={
  fontSize:17,
  color: getColorType()["TextColor"],
  textAlign:'center',
  overflow:'hidden',
  fontWeight: 'bold',
}