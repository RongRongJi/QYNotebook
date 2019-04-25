/**
 * 顶部设置组件
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { getColorType } from '../../config/color_type';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { changeColorMode } from '../../utils/color_util';

const { Popover } = renderers;

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: getColorType()['ItemBackground'],
      width: this.props.width ? this.props.width : 30,
      height: this.props.height ? this.props.height : 30,
      mode: global.colorType =='day' ? '夜间模式' : '晨间模式',
    };
  }
    
  _changeColorMode(){
    changeColorMode();
    this.props.navigation.navigate('init');
  }


    Popver = () =>(
      <Menu renderer={Popover} rendererProps={{placement:'bottom',preferredPlacement:'bottom'}}>
        <MenuTrigger style={StyleSheet.menuTrigger}>
          <Image style={{height:this.state.height,width:this.state.width}}
            source={this.state.mode=='夜间模式'?require('./images/setting_day.png'):require('./images/setting_night.png')}/>
        </MenuTrigger>
        <MenuOptions style={styles.menuOption}>
          <this.MenuList/>
        </MenuOptions>
      </Menu>
    )

    MenuList = () =>(
      <View style={{backgroundColor:getColorType()['Background']}}>
        <TouchableOpacity style={[styles.row,{borderBottomColor: getColorType()['LineColor'],}]}  onPress={()=>this._changeColorMode()}>
          <Image style={styles.icon} source={require('./images/eye.png')}/>
          <Text style={{
            marginLeft:5,
            color:getColorType()['ItemBackground'],
          }}>{this.state.mode}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row,{borderBottomColor: getColorType()['LineColor'],}]}>
          <Image style={styles.icon} source={require('./images/manager.png')}/>
          <Text style={{
            marginLeft:5,
            color:getColorType()['ItemBackground'],
          }}>批量管理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row,{borderBottomColor: getColorType()['LineColor'],}]}>
          <Image style={styles.icon} source={require('./images/about.png')}/>
          <Text style={{
            marginLeft:5,
            color:getColorType()['ItemBackground'],
          }}>关于我们</Text>
        </TouchableOpacity>
      </View>
    )



    render() {
      return (
        <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
          <this.Popver/>
        </View>
      );
    }
}
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTrigger:{
  },
  menuOption:{
  },
  row:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:(Dimensions.get('window').width-16)/3,
    height:50,
    borderBottomWidth: 1,
  },
  icon:{
    width:20,
    height:20,
    //position:'absolute',
    //left:20,
  },
  fontmenu:{
    marginLeft:5,
    color:getColorType()['ItemBackground'],
  }
});
  