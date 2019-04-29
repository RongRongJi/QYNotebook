/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { getColorType } from '../../config/color_type';
import NaviBar from 'react-native-pure-navigation-bar';



export default class About extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let textStyle={
      fontSize:15,
      color:getColorType()['TitleColor'],
      marginTop:5,
    };
    return (
      <View style={{flex:1}}>
        <NaviBar title='关于我们'/>
        <ScrollView contentContainerStyle={styles.container}>
          <Image style={{marginTop:20,width:80,height:80}} source={require('./images/logo-3.png')}/>
          <Text style={{fontSize:25,color:getColorType()['TitleColor']}}>青鱼笔记</Text>
          <Text style={textStyle}>武汉大学计算机学院</Text>
          <Text style={textStyle}>开发者：</Text>
          <Text style={textStyle}>刘劭荣</Text>
          <Text style={textStyle}>王  丰</Text>
          <Text style={textStyle}>朱陆刚</Text>
          <Text style={textStyle}>王清玉</Text>
          <Text style={textStyle}>石  可</Text>
          <Text style={textStyle}>苏嘉诚</Text>
          <Text style={textStyle}>联系方式：</Text>
          <Text style={textStyle}>316315867@qq.com</Text>
          <Text style={textStyle}>开源地址：</Text>
          <Text style={textStyle}>https://github.com/RongRongJi/QYNotebook</Text>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
