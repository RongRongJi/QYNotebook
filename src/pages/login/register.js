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
import { setHeader } from '../../config/header';
import NaviBar from 'react-native-pure-navigation-bar';
import Button from 'apsl-react-native-button';
import { URL, PostJSON } from '../../utils/fetch';
import { getUserData } from '../../utils/login_util';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.password = '';
    this.phonenumber = '';
    this.state = {
      isLoad: false
    };
  }

  init() {
    //登录成功后进行初始化操作
    getUserData(this.phonenumber).then(ret => setHeader());
    setTimeout(() => {
      this.props.navigation.pop();
      this.props.navigation.navigate('main');
    }, 1000);
  }

  register = () => {
    if (this.password == '' || this.phonenumber == '') {
      return;
    }
    PostJSON(URL.register, {
      usernum: this.phonenumber,
      password: this.password
    })
      .then(res => {
        console.log(res);
        if (res.ret == 0) {
          this.init();
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderInput = () => (
    <View style={{ marginTop: 100 }}>
      <TextInputLayout
        style={styles.layout}
        focusColor="#049F9A"
        checkValid={text => {
          return true;
        }}
      >
        <TextInput
          style={styles.input}
          placeholder={'手机号'}
          keyboardType="numeric"
          maxLength={11}
          onChangeText={text => (this.phonenumber = text)}
        />
      </TextInputLayout>
      <TextInputLayout
        style={styles.layout}
        focusColor="#049F9A"
        checkValid={text => {
          return true;
        }}
      >
        <TextInput
          style={styles.input}
          placeholder={'请输入密码'}
          secureTextEntry={true}
          maxLength={20}
          onChangeText={text => (this.password = text)}
        />
      </TextInputLayout>
      <TextInputLayout
        style={styles.layout}
        focusColor="#049F9A"
        checkValid={text => {
          return true;
        }}
      >
        <TextInput
          style={styles.input}
          placeholder={'再次输入密码'}
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
        onPress={() => {
          this.register();
        }}
        style={styles.btnStyle}
        textStyle={{ color: 'white', fontSize: 18 }}
      >
        注 册
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
            title={'注 册'}
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
