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
  ScrollView,
  Keyboard,
  Alert,
  Image,
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import Editor from '../../config/editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getUUID from '../../services/uuid';
import { getColorType } from '../../config/color_type';
import { ToastShort } from '../../utils/toast_util';

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.uuid = this.props.navigation.getParam('uuid', false);
    this.type = this.props.navigation.getParam('type', false);
    console.log(this.props.navigation);
    console.log(this.uuid);
    global.goback = this.goback.bind(this);
  }

  goback() {
    return new Promise((resolve, reject) => {
      Alert.alert(
        '提示',
        '是否保存数据?',
        [
          {
            text: '取消',
            onPress: () => {
              global.goback = null;
              resolve(this.props.navigation.pop);
            },
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              //你要执行的函数
              //this.postMessage();
              this.editor.save();
              global.goback = null;
              resolve(this.props.navigation.pop);
            }
          }
        ],
        {
          cancelable: true
        }
      );
    });
  }

  render() {
    // if (this.props.type === 'richtext') {
    let uuid = this.uuid ? this.uuid : getUUID();
    let type = this.type;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NaviBar
          style={{
            safeView: {
              flex: 0,
              backgroundColor: getColorType()['Background']
            },
            title: {
              fontSize: 17,
              color: getColorType()['ItemBackground'],
              textAlign: 'center',
              overflow: 'hidden',
              fontWeight: 'bold'
            }
          }}
          rightElement={
            <TouchableOpacity
              onPress={() => {
                return new Promise((resolve, reject) => {
                  this.editor.save();
                  resolve(ToastShort('保存成功'));
                });
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={
                  global.colorType == 'day'
                    ? require('../../config/images/save_day.png')
                    : require('../../config/images/save_night.png')
                }
              />
            </TouchableOpacity>
          }
          leftElement={
            <TouchableOpacity
              onPress={() => {
                this.goback().then(ret => {
                  if (ret != false) ret();
                });
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={
                  global.colorType == 'day'
                    ? require('../../config/images/back_day.png')
                    : require('../../config/images/back_night.png')
                }
              />
            </TouchableOpacity>
          }
          navbarHeight={50}
          title={'青鱼笔记'}
        />

        <Editor
          type={type}
          ref={editor => {
            this.editor = editor;
          }}
          uuid={uuid}
        />
      </KeyboardAwareScrollView>
    );
  }
  //}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
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
