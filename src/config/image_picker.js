import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { ToastShort, ToastLong } from './toastUtil.js';

//图片选择器
var ImagePicker = require('react-native-image-picker');

//图片选择器参数设置
var options = {
  title: '拍照',
  cancelButtonTitle: null,
  takePhotoButtonTitle: null,
  chooseFromLibraryButtonTitle: null,
  maxWidth: 1024,
  maxHeight: 1024,
};

//默认应用的容器组件
export default class ImagePickerComp extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      data: null,
    };
  }

  renderPhoto = () => {
    if (this.state.source == null) {
      return (
        <View style={styles.item}>
          <Text style={styles.font}>拍照</Text>
        </View>
      );
    }
    else {
      return (
        <Image style={styles.image} source={this.state.source} resizeMode='contain' />
      );
    }
  }

  //渲染
  render() {
    return (
      <TouchableOpacity
        style={styles.container} onPress={this.choosePic.bind(this)}>
        <this.renderPhoto />
      </TouchableOpacity>
    );
  }

  //选择照片按钮点击
  choosePic() {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('Cancel');
      } else if (response.error) {
        console.log('Error: ', response.error);
        ToastShort('拍照失败：', response.error);
      } else {
        this.props.picture(response.uri);
        this.setState({
          source: { uri: response.uri },
        });
      }
    });
  }
}

//样式定义
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  item: {
    flex: 1,
    margin: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    color: '#ddd',
    fontSize: 24,
  },
  image: {
    flex: 1,
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
});