/**
 * 顶部导航组件
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import '../../config/color_type';
import { getColorType } from '../../config/color_type';

export default class TopTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      onFocus: this.props.onFocus ? this.props.onFocus : false,
      title: this.props.title ? this.props.title : '233',
      color: this.props.color ? this.props.color : getColorType()['ItemBackground'],
      width: this.props.width ? this.props.width : 70,
      height: this.props.height ? this.props.height : 50,
    };
  }

  _onPress(){
    if(this.props.onPress)
      return this.props.onPress();
    else
      return;
  }

  changeFocus(flag){
    this.setState({onFocus:flag});
  }


  render() {
    return (
      <TouchableOpacity style={{width:this.state.width,height:this.state.height}}
        onPress={()=>this._onPress()}
      >
        <View style={styles.container}>
          <Text style={
            [this.state.onFocus?styles.selectedtext:styles.text,
              {color:this.state.color}]
          }>{this.state.title}</Text>
          <View style={[
            this.state.onFocus?{
              borderBottomWidth: 5,
              borderBottomColor: this.state.color,
            }:{}, 
            {width: this.state.width-30,alignItems:'center'}
          ]}></View>
        </View>
      </TouchableOpacity>
    );
  }
}
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize:15,
  },
  selectedtext: {
    textAlign: 'center',
    margin:10,
    fontWeight: 'bold', 
    fontSize:18,
  },
  selected: {
    borderBottomWidth: 5,
    borderBottomColor: getColorType()['ItemBackground'],
  },

});
  