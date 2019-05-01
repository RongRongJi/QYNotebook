/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Note from '../services/note';
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      rawData: null
    };
  }
  componentWillMount = async () => {
    this.note = new Note(this.props.uuid, this.props.type);
    await this.note.init();
    if (this.props.show) {
      await this.note.readContent().then(res => {
        this.rawData = res;
        this.setState({ type: this.note.type, rawData: res.raw });
      });
    } else {
      this.setState({ type: this.note.type });
    }
  };
  unReadOnly = () => {
    console.log('unReadOnly...');
    let unReadOnly = `
    window.editor.editor.unReadOnly()
    `;

    this.webView.injectJavaScript(unReadOnly);
  };
  delete = () => {
    console.log('delete note');
    this.note.delete();
  };
  save = () => {
    console.log('richtext content saving...');
    let save = `
    setTimeout(function(){
    var config = window.editor.editor.save();
    window.ReactNativeWebView.postMessage(config);
    },30);
    `;

    this.webView.injectJavaScript(save);
  };

  render() {
    const source =
      Platform.OS == 'ios'
        ? require('./type-editor/dist/index.html')
        : { uri: 'file:///android_asset/index.html' };
    const nightType = !(global.colorType == 'day');
    let type = this.state.type;
    if (type == null) {
      return <View />;
    }
    let rawData = this.state.rawData ? this.state.rawData : false;
    let init;
    if (rawData) {
      init = `window.setEditor('${type}',${nightType},'${rawData}');`;
    } else {
      init = `window.setEditor('${type}',${nightType});`;
    }

    console.log(init);
    return (
      <WebView
        ref={webView => {
          this.webView = webView;
        }}
        source={source}
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={styles.container}
        javaScriptEnabled={true}
        injectedJavaScript={init}
        onMessage={event => {
          let config = JSON.parse(event.nativeEvent.data);
          console.log(config);
          if (
            (this.props.type == 'markdown' && config.html == '') ||
            (this.props.type == 'richtext' && config.html == '<p></p>')
          ) {
            console.log('no edit note');
            this.delete();
            return;
          }
          this.note.save(config.html, config.raw);
        }}
      />
    );
  }
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
