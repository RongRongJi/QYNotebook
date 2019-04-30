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
  Alert
} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import Editor from '../../config/editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getUUID from '../../services/uuid';

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.uuid = this.props.navigation.getParam('uuid', false);
    this.type = this.props.navigation.getParam('type', false);
    console.log(this.props.navigation);
    console.log(this.uuid);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      backFn: () => {
        return new Promise((resolve, reject) => {
          this.editor.save();
          resolve(this.props.navigation.pop);
          // Alert.alert(
          //   '提示',
          //   '是否保存数据?',
          //   [
          //     {
          //       text: '取消',
          //       onPress: () => {
          //         resolve(this.props.navigation.pop);
          //       },
          //       style: 'cancel'
          //     },
          //     {
          //       text: '确定',
          //       onPress: () => {
          //         //你要执行的函数
          //         //this.postMessage();
          //         this.editor.save();
          //         resolve(this.props.navigation.pop);
          //       }
          //     }
          //   ],
          //   {
          //     cancelable: true
          //   }
          // );
        });
      }
    });
  }
  render() {
    // if (this.props.type === 'richtext') {
    let uuid = this.uuid ? this.uuid : getUUID();
    let type = this.type;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NaviBar title="青鱼笔记" />

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
