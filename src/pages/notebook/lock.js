/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity,Dimensions} from 'react-native';
import GesturePassword from '../../config/react-native-smart-gesture-password';
import {getColorType} from '../../config/color_type';
import NaviBar from 'react-native-pure-navigation-bar';
import { setLockType } from '../../utils/lock_util';


export default class LockView extends Component {
  constructor(props){
    super(props);
    this.state = {
      lock: global.lock_pwd ? true : false,
      width: this.props.width ? this.props.width : 30,
      height: this.props.height ? this.props.height : 30,
      isWarning: false,
      message: '请绘制你的图案',
      messageColor: getColorType()['ItemBackground'],
      password: '',
      thumbnails: [],
      title : global.lock_pwd ? '输入密码' : '设置密码',
    };
    this._cachedPassword = global.lock_pwd ? global.lock_pwd : '';
  }

  getText(){
    if(this.state.lock==false){
      if(this._cachedPassword!='') this.setState({title:'确认密码'});
      else this.setState({title:'设置密码'});
    }else{
      this.setState({title:'输入密码'});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <GesturePassword
          pointBackgroundColor={'#F4F4F4'}
          isWarning={this.state.isWarning}
          color={getColorType()['ItemBackground']}
          activeColor={getColorType()['ItemBackground']}
          warningColor={'red'}
          warningDuration={1500}
          allowCross={true}
          topComponent={this._renderDescription()}
          bottomComponent={this._renderActions()}
          onFinish={this._onFinish}
          onReset={this._onReset}
        />
      </View>

    );
  }

  _renderDescription = () => {
    return (
      <View>
        <NaviBar title={this.state.title}/>
        <View style={{height: 158, paddingBottom: 10, justifyContent: 'flex-end', alignItems: 'center',}}>
          <Text
            style={{fontSize: 14, marginVertical: 6, color: this.state.messageColor}}>{this.state.message}</Text>
        </View>
      </View>
    );
  }

  _renderActions = () => {
    return (
      <View
        style={{position: 'absolute', bottom: 0, flex:1, justifyContent: 'space-between', flexDirection: 'row', width: Dimensions.get('window').width, }}>
      </View>
    );
  }

  _onReset = () => {
    let isWarning = false;
    //let password = ''
    let message = '请绘制你的图案';
    let messageColor = '#A9A9A9';
    this.setState({
      isWarning,
      //password,
      message,
      messageColor,
    });
  }

  _onFinish = (password) => {
    //设置密码
    if (this.state.lock==false && this._cachedPassword==''){
      //密码至少四个点
      if(password.length<4){
        message = '请至少连接四个点';
        let isWarning = true;
        let message;
        let messageColor = 'red';
        this.setState({
          isWarning,
          password,
          message,
          messageColor,
        });
        return;
      }
      //密码设置成功
      this._cachedPassword = password;
      let isWarning = false;
      let message = '绘制完成';
      let messageColor = '#00AAEF';
      this.setState({
        isWarning,
        password,
        message,
        messageColor,
        title : '确认密码',
      });
      return;
    }
    //确认密码
    if(this.state.lock==false && this._cachedPassword!=''){
      //密码正确
      if(password === this._cachedPassword){
        let isWarning = false;
        let message = '设置密码成功！';
        let messageColor = '#00AAEF';
        this.setState({
          isWarning,
          password,
          message,
          messageColor,
          lock : true,
        });
        setLockType(this._cachedPassword);
        this.props.navigation.pop();
        this.props.navigation.navigate('locknotebook');
        return;
      }
      //密码错误
      else{
        message = '密码前后设置不相同，请重新设置！';
        let isWarning = true;
        let message;
        let messageColor = 'red';
        this.setState({
          isWarning,
          password,
          message,
          messageColor,
          title : '设置密码'
        });
        this._cachedPassword='';
        return;
      }
    }
    //正常进入 输入密码
    if (this.state.lock && password === this._cachedPassword) {
      let isWarning = false;
      let message = '绘制成功';
      let messageColor = '#00AAEF';
      this.setState({
        isWarning,
        password,
        message,
        messageColor,
      });
      this.props.navigation.pop();
      this.props.navigation.navigate('locknotebook');
      return;
    }
    else {
      let isWarning = true;
      let message = '图案错误，请重新绘制';
      let messageColor = 'red';
      this.setState({
        isWarning,
        password,
        message,
        messageColor,
      });
      return;
    }
    //Alert.alert('password is ' + password);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColorType()['Background'],
  },
});
