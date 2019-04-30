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
import Note from './note';
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.note = new Note(props.uuid, this.props.type);
  }

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
    let type = this.props.type;
    let rawData = this.props.rawData ? this.props.rawData : false;
    let init = `window.setEditor('${type}',${nightType},${rawData});`;
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
            this.note.delete();
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
