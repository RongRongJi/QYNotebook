import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  PixelRatio,
} from 'react-native';

import './color_type';
import ImagePicker from 'react-native-image-picker';
import { RichTextEditor, RichTextToolbar, actions } from './react-native-zss-rich-text-editor';
import { getColorType } from './color_type';
import { WIDTH, getResponsiveWidth } from './styles';

const Actions = [
  actions.insertImage,
  actions.identifyDiary,
  actions.line,
  actions.setBold,
  actions.setBlockquote,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.setStrikethrough
];

const Images = {
  [actions.insertImage]: [require('./images/icon-editor-photo-active.png')],
  [actions.identifyDiary]: [require('./images/ocr.png')],
  [actions.line]: [require('./images/line.png')],
  [actions.setBold]: [require('./images/icon-editor-bold.png'), require('./images/icon-editor-bold-active.png')],
  [actions.setBlockquote]: [require('./images/icon-editor-quote.png'), require('./images/icon-editor-quote-active.png')],
  [actions.insertBulletsList]: [require('./images/icon-editor-ul.png'), require('./images/icon-editor-ul-active.png')],
  [actions.insertOrderedList]: [require('./images/icon-editor-ol.png'), require('./images/icon-editor-ol-active.png')],
  [actions.setStrikethrough]: [require('./images/icon-editor-strikethrough.png'), require('./images/icon-editor-strikethrough-active.png')]
};

export default class RichText extends Component {
  state = {
    onFocus: false,
    title: '',
    content: '',
    preload: {
      [actions.insertImage]: Images[actions.insertImage][0],
      [actions.identifyDiary]: Images[actions.identifyDiary][0],
      [actions.line]: Images[actions.line][0],
      [actions.setBold]: Images[actions.setBold][0],
      [actions.setBlockquote]: Images[actions.setBlockquote][0],
      [actions.insertBulletsList]: Images[actions.insertBulletsList][0],
      [actions.insertOrderedList]: Images[actions.insertOrderedList][0],
      [actions.setStrikethrough]: Images[actions.setStrikethrough][0],
    }
  }
  onEditorInitialized = () => {
    this.setFocusOrBlur();
  }
  setFocusOrBlur() {
    this.richtext.setContentFocusHandler(() => {
      this.setState({
        onFocus: true
      });
    });
    this.richtext.setContentBlurHandler(() => {
      this.setState({
        onFocus: false
      });
    });
  }
  addImage = async () => {
    const options = {
      title: '添加图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍摄',
      chooseFromLibraryButtonTitle: '从相册选择',
      cameraType: 'back',
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      compressImageQuality: 0.5,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true
      }
    };
    ImagePicker.showImagePicker(options, async res => {
      if (!res.didCancel) {
        
        this.richtext.insertImage({
          src:   'data:image/jpeg;base64,' + res.data ,
          // src: image.replace('https:', 'http:')
          //src: 'http://airing.ursb.me/2life/user/1/img_1551536283892.png-2life_note.jpg'
        });
      }
    });
  }
  identifyDiary = () => {
    // TODO: OCR 识别日记
  }
  async componentDidUpdate() {
    if (this.props.startSaveDiary) {
      this.props.saveDiary({
        title: await this.richtext.getTitleHtml(),
        content: await this.richtext.getContentHtml()
      });
    }
  }
  render() {
    return (
      <View style={
        styles.container}>
        <View style={styles.line_separator} />
        <RichTextEditor
          ref={(r) => this.richtext = r}
          style={styles.richText}
          titlePlaceholder={'标题'}
          contentPlaceholder={'正文'}
          editorInitializedCallback={this.onEditorInitialized}
        />
        <RichTextToolbar
          style={{
            backgroundColor: getColorType()['Background'],
            //height: this.state.onFocus ? 50 : 0
          }}
          actions={Actions}
          getEditor={() => this.richtext}
          iconMap={this.state.preload}
          onPressAddImage={this.addImage}
          onPressIdentifyDiary={this.identifyDiary}
          selectedAction={(action, selected, selectedItems) => {
            let addtion = {};
            if (
              action === actions.insertOrderedList && selectedItems.includes(actions.insertBulletsList)
            ) {
              addtion = {
                [actions.insertBulletsList]: Images[actions.insertBulletsList][0]
              };
            }
            if (
              action === actions.insertBulletsList && selectedItems.includes(actions.insertOrderedList)
            ) {
              addtion = {
                [actions.insertOrderedList]: Images[actions.insertOrderedList][0]
              };
            }
            this.setState({
              preload: {
                ...this.state.preload,
                ...addtion,
                [action]: Images[action][selected],
              }
            });
          }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
	    flex: 1,
	    flexDirection: 'column',
	    backgroundColor: '#fff',
	  },
	  richText: {
	    width: WIDTH,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'transparent'
	  },
	  line_separator: {
	    width: WIDTH - getResponsiveWidth(48),
	    height: 1 / PixelRatio.get(),
	    backgroundColor: '#d5d5d5',
	    marginLeft: getResponsiveWidth(24),
	    marginBottom: getResponsiveWidth(40)
	  },
	  text_title: {
	    fontSize: 17,
	    fontWeight: 'bold',
	    paddingLeft: getResponsiveWidth(24),
	    paddingRight: getResponsiveWidth(24),
	    marginBottom: getResponsiveWidth(20)
	  }

});