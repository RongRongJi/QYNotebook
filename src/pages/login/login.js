/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextInputLayout } from 'rn-textinputlayout';
import NaviBar from 'react-native-pure-navigation-bar';
import Button from 'apsl-react-native-button';
import { setHeader } from '../../config/header';
import { getUserData } from '../../utils/login_util';
import { URL, PostJSON } from '../../utils/fetch';
import { ToastShort } from '../../utils/toast_util';

const phoneh_0 = '手机号';
const phoneh_1 = '请输入正确的手机号';
const pw_0 = '密码';
const pw_1 = '密码长度应在6~20位之间';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      //账号密码提示
      phonehint: phoneh_0,
      pwhint: pw_0
    };
  }

  init() {
    //登录成功后进行初始化操作
    getUserData(this.phonenumber).then(ret => {
      setHeader();
      this.props.navigation.pop();
      this.props.navigation.navigate('main');
    });
    /*setTimeout(() => {
      this.props.navigation.pop();
      this.props.navigation.navigate('main');
    }, 1000);*/
  }

  //检查电话号码
  checkPN = (text) => {
    if (text == null || text.length != 11) {
      this.setState({ phonehint: phoneh_1 });
      return false;
    } else {
      this.setState({ phonehint: phoneh_0 });
      return true;
    }
  }
  //检查密码
  checkPW = (text) => {
    if (text == null || text.length < 6 || text.length > 20) {
      this.setState({ pwhint: pw_1 });
      return false;
    } else {
      this.setState({ pwhint: pw_0 });
      return true;
    }
  }

  Login = () => {
    if (!this.checkPN(this.phonenumber) || !this.checkPW(this.password)) {
      ToastShort('用户名或密码不正确');
      return;
    }
    this.setState({ isLoad: true });
    PostJSON(URL.login, {
      usernum: this.phonenumber,
      password: this.password
    })
      .then(res => {
        console.log(res);
        if (res.ret == 0) {
          //登录检测逻辑
          //存储初始化
          this.init();
        }
      })
      .catch(err => {
        this.setState({ isLoad: false});
        ToastShort(err);
        console.log(err);
      });
  };

  renderInput = () => (
    <View style={{ marginTop: 100 }}>
      <TextInputLayout
        style={styles.layout}
        focusColor="#049F9A"
        checkValid={text => this.checkPN(text)}
      >
        <TextInput
          style={styles.input}
          placeholder={this.state.phonehint}
          keyboardType="numeric"
          maxLength={11}
          onChangeText={text => (this.phonenumber = text)}
        />
      </TextInputLayout>
      <TextInputLayout
        style={styles.layout}
        focusColor="#049F9A"
        checkValid={text => this.checkPW(text)}
      >
        <TextInput
          style={styles.input}
          placeholder={this.state.pwhint}
          secureTextEntry={true}
          maxLength={20}
          onChangeText={text => (this.password = text)}
        />
      </TextInputLayout>
    </View>
  );

  renderButton = () => (
    <View style={{ marginTop: 50 }}>
      <Button
        style={styles.btnStyle}
        textStyle={{ color: 'white', fontSize: 18 }}
        isLoading={this.state.isLoad}
        onPress={() => this.Login()}
      >
        登 录
      </Button>
    </View>
  );

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <NaviBar
            style={{
              safeView: { flex: 0, backgroundColor: 'white' },
              title: {
                fontSize: 17,
                color: '#049F9A',
                textAlign: 'center',
                overflow: 'hidden'
              }
            }}
            navbarHeight={50}
            title={'登 录'}
          />
          <this.renderInput />
          <this.renderButton />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  layout: {
    marginLeft: 60,
    marginRight: 60
  },
  input: {
    fontSize: 15,
    height: 40
  },
  btnStyle: {
    borderRadius: 10,
    borderColor: '#049F9A',
    backgroundColor: '#049F9A',
    marginLeft: 50,
    marginRight: 50
  }
});
