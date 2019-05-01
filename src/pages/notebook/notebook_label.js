/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import WIDTH from '../../config/styles';
import { getColorType } from '../../config/color_type';
import { WebView } from 'react-native-webview';

/*
 * config:{
 *   "uuid": 唯一uuid标识,
 *   "lock": true 笔记上锁 / false 笔记公开
 *   "create_date": "2019-4-18" 创建时间
 *   "last_date": "2019-4-26" 最后修改时间
 *   "type": "markdown",  //markdown or richtext
 *   "note":{
 *      "html":path,
 *      "raw":path
 *  }
 *   "info":{
 *      key1:"path1"
 *  }
 */

export default class NotebookLabel extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  renderItem = () => {
    let title = this.item.uuid;
    let content = this.item.note.html;
    let date = this.item.last_date;
    return (
      <View
        style={[
          styles.container,
          { borderBottomColor: getColorType()['LineColor'] }
        ]}
      >
        <Text
          style={[styles.titlefont, { color: getColorType()['TitleColor'] }]}
        >
          {title}
        </Text>
        <WebView
          numberOfLines={2}
          style={{
            color: getColorType()['TextColor'],
            marginLeft: 10,
            width: Dimensions.get('window').width - 56
          }}
          source={{ html: content }}
        />
        <Text
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            color: getColorType()['TextColor']
          }}
        >
          {date}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <this.renderItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    height: 95,
    marginLeft: 10,
    borderBottomWidth: 1
  },
  titlerow: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  row: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  titlefont: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold'
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5
  }
});
