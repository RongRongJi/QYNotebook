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
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import Editor from '../../config/editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getUUID from '../../services/uuid';
import { getColorType } from '../../config/color_type';
import { ToastShort } from '../../utils/toast_util';
import { getToday } from '../../utils/date';
import { WIDTH } from '../../config/styles';
import NoteBook_Dao from '../../services/notebook';

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.uuid = this.props.navigation.getParam('uuid', false);
    this.type = this.props.navigation.getParam('type', false);
    console.log(this.uuid);
    global.goback = this.goback.bind(this);
    this.state={
      text:''
    };
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
              DeviceEventEmitter.emit('notebookrefresh',true);
              resolve(this.props.navigation.pop);
            },
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              //你要执行的函数
              //this.postMessage();
              if(this.state.text==''){
                this.editor.save(getToday());
              }else{
                this.editor.save(this.state.text);
              }
              DeviceEventEmitter.emit('notebookrefresh',true);
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

  renderTitle = () =>(
    <View style={{
      width:WIDTH-56,
      borderBottomWidth:2,
      borderBottomColor:getColorType()['TabShadow'],
      marginLeft:28
    }}>
      <TextInput
        placeholder={' 标题'}
        placeholderTextColor={getColorType()['LineColor']}
        onChangeText={(text)=>this.setState({text:text})}
        value={this.state.text}
        style={{
          height:50,
          backgroundColor:getColorType()['Background'],
          color:getColorType()['TitleColor'],
          fontSize:17,
          fontWeight:'bold'
        }}
      />
    </View>
  )

  render() {
    // if (this.props.type === 'richtext') {
    let uuid = this.uuid ? this.uuid : getUUID();
    let type = this.type;

    return (
      <KeyboardAwareScrollView contentContainerStyle={[styles.container,{backgroundColor:getColorType()['Background']}]}>
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
                  if(this.state.text==''){
                    this.editor.save(getToday());
                  }else{
                    this.editor.save(this.state.text);
                  }
                  DeviceEventEmitter.emit('notebookrefresh',true);
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
        <this.renderTitle/>
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
