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

      //界面跳转
      setTimeout(() => {
        this.props.navigation.navigate('main');
      }, 2000);
    } catch (e) {
      alert(e);
    }
  }

  render() {
    this.init();
    //setTimeout(this.init.then(this.props.navigation.navigate('main')),2000);
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../main/images/logo.png')}
        />
        <Text style={{ fontSize: 40, color: '#fff' }}>QYNotebook</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#049F9A'
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
