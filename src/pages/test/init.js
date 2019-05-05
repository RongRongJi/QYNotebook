/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { setHeader } from '../../config/header';
import { setColorState } from '../../utils/color_util';
import { setLockState } from '../../utils/lock_util';
import RNFS from 'react-native-fs';
import NoteBook_Dao from '../../services/notebook';

export default class Init extends Component {
  constructor(props) {
    super(props);
  }

  async init() {
    //初始化
    try {
      //初始化颜色
      let p = setColorState().then(ret => {
        setHeader();
      });
      //加载锁密码
      let pwd = await setLockState();

      //初始化notebook文件夹
      if(!global.nbDao)
        global.nbDao = new NoteBook_Dao();
      
      //界面跳转
      setTimeout(() => {
        this.props.navigation.navigate('main');
      },500);
    }catch(e){
      console.log(e);
    }
  }

  render() {
    this.init();
    //setTimeout(this.init.then(this.props.navigation.navigate('main')),2000);
    return (
      <View style={styles.container}>
        <View style={{position:'absolute',top:100}}>
          <Image style={{width:200,height:240}}
            source={require('../login/images/logo.png')}/>
        </View>
        <Text style={{position:'absolute',top:360,fontSize:25,color:'#049F9A'}}>青鱼笔记</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
