/**
 * 顶部设置组件
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { getColorType } from '../../config/ColorType';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const { Popover } = renderers;

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color ? this.props.color : getColorType()['ItemBackground'],
      width: this.props.width ? this.props.width : 30,
      height: this.props.height ? this.props.height : 30,
    };
  }
    

    Popver = () =>(
      <Menu renderer={Popover} rendererProps={{placement:'bottom',preferredPlacement:'bottom'}}>
        <MenuTrigger style={StyleSheet.menuTrigger}>
          <Image style={{height:this.state.height,width:this.state.width}}
            source={require('./images/setting_white.png')}/>
        </MenuTrigger>
        <MenuOptions style={styles.menuOption}>
          <this.MenuList/>
        </MenuOptions>
      </Menu>
    )

    MenuList = () =>(
      <View>
        <TouchableOpacity style={styles.row}>
          <Image style={styles.icon} source={require('./images/eye.png')}/>
          <Text style={styles.fontmenu}>夜间模式</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Image style={styles.icon} source={require('./images/manager.png')}/>
          <Text style={styles.fontmenu}>批量管理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Image style={styles.icon} source={require('./images/about.png')}/>
          <Text style={styles.fontmenu}>关于我们</Text>
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
    borderBottomColor: '#bdbdbd',
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
  