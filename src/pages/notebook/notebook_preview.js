/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import { getColorType } from '../../config/color_type';
import SideMenu from 'react-native-side-menu';
import { WIDTH } from '../../config/styles';
import Menu from './menu';
import Note from '../../services/note';
import Editor from '../../config/editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getToday } from '../../utils/date';
import { ToastShort } from '../../utils/toast_util';

export default class NotebookPreview extends Component {
  constructor(props) {
    super(props);
    this.uuid = this.props.navigation.getParam('uuid', false);
    this.type = this.props.navigation.getParam('type', false);
    this.item = this.props.navigation.getParam('item', false);
    if (!this.uuid) {
      throw new Error('no uuid found!');
    }
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      rawData: false,
      readOnly: true,
      text: this.item.title,
    };

    this.data = {
      create_date: this.item.created,
      last_date: this.item.last_date,
      type: this.item.type,
      lock: this.item.lock,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item => {
    this.setState({
      //isOpen: false,
      selectedItem: item
    });
    if (item == 'Delete') {
      this.renderDeleteDialog();
    } else if (item == 'Lock') {
      this.renderLockDialog();
    }
  };

  //加密操作
  Encrypthion(){

    ToastShort('解锁成功!');
  }

  //解密操作
  Unencryption(){

    ToastShort('解锁成功!');
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
              if(this.state.text==''){
                this.editor.save(getToday());
              }else{
                this.editor.save(this.state.text);
              }
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
        editable={!this.state.readOnly}
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

  renderHeader = () => (
    <View
      style={[
        styles.row,
        { 
          backgroundColor: getColorType()['Background'],
          borderBottomWidth: 1,
          borderBottomColor: getColorType()['LineColor']
        }
      ]}
    >
      <TouchableOpacity
        style={{ position: 'absolute', left: 15 }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('../../config/images/back_day.png'):
            require('../../config/images/back_night.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', right: 70 }}
        onPress={() => {
          this.editor.unReadOnly();
          this.setState({readOnly:false});
          global.goback=this.goback.bind(this);
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('./images/editor_day.png'):
            require('./images/editor_night.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', right: 20 }}
        onPress={this.toggle}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('./images/more_day.png'):
            require('./images/more_night.png')}
        />
      </TouchableOpacity>
    </View>
  );

  renderSaveHeader=()=>(
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
              this.setState({readOnly:true});
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
      title={''}
    />
  )

  render() {
    const menu = (
      <Menu onItemSelected={this.onMenuItemSelected} data={this.data} />
    );
    // let getSync = async () => {
    // let rawData = await this.note.readContent();
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={(WIDTH * 4) / 7}
        menuPosition={'right'}
        disableGestures={true}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: getColorType()['Background'] }
          ]}
        >
          {this.state.readOnly?<this.renderHeader />:<this.renderSaveHeader/>}
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <this.renderTitle/>
            <Editor
              ref={editor => {
                this.editor = editor;
              }}
              uuid={this.uuid}
              show={true}
            />
          </KeyboardAwareScrollView>
        </View>
      </SideMenu>
    );
    // };

    // return getSync();
  }

  renderDeleteDialog = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        '删除笔记',
        '您是否要删除此篇笔记?',
        [
          {
            text: '取消',
            onPress: () => {
              resolve(false);
            },
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              //你要执行的函数
              //this.postMessage();
              this.editor.delete();
              this.props.navigation.pop();
            }
          }
        ],
        {
          cancelable: true
        }
      );
    });
  }
    

  renderLockDialog = () => {
    if(global.lock_pwd==''){
      return new Promise((resolve, reject) => {
        Alert.alert(
          '加密笔记',
          '您还未设置加密笔记密码，请前往设置!',
          [
            {
              text: '确定',
              onPress: () => {
                resolve(false);
              },
              style: 'cancel'
            }
          ],
          {
            cancelable: true
          }
        );
      });
    }else if(!this.item.lock){
      return new Promise((resolve, reject) => {
        Alert.alert(
          '加密笔记',
          '您是否要加密此篇笔记?',
          [
            {
              text: '取消',
              onPress: () => {
                resolve(false);
              },
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => {
                //你要执行的函数
                this.Encrypthion();
              }
            }
          ],
          {
            cancelable: true
          }
        );
      });
    }else{
      return new Promise((resolve, reject) => {
        Alert.alert(
          '解锁笔记',
          '您是否要解锁此篇笔记?',
          [
            {
              text: '取消',
              onPress: () => {
                resolve(false);
              },
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => {
                //你要执行的函数
                this.Unencryption();
              }
            }
          ],
          {
            cancelable: true
          }
        );
      });
    } 
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18
  },
  navigationTitle: {
    padding: 10
  },
  navigationButton: {
    padding: 10
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40
  }
});
