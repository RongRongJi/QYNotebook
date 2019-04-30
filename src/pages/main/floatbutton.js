/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import '../../config/color_type';
//import '../../config/global';
import FloatingAction from '../../config/floating-action-component/FloatingAction';
import { getColorType } from '../../config/color_type';

export default class FloatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type ? this.props.type : 'notebook'
    };
    this.actions = [
      {
        text: '新建markdown',
        icon:
          global.colorType == 'day'
            ? require('./images/markdown_day.png')
            : require('./images/markdown_night.png'),
        name: 'Markdown_button',
        color: getColorType()['Background'],
        textBackground: getColorType()['Background'],
        textColor: getColorType()['TitleColor'],
        position: 1
      },
      {
        text: '新建笔记',
        icon:
          global.colorType == 'day'
            ? require('./images/notebook_day.png')
            : require('./images/notebook_night.png'),
        name: 'Notebook_button',
        color: getColorType()['Background'],
        textBackground: getColorType()['Background'],
        textColor: getColorType()['TitleColor'],
        position: 2
      }
    ];

    this.actions1 = [
      {
        text: '新建待办',
        icon:
          global.colorType == 'day'
            ? require('./images/markdown_day.png')
            : require('./images/markdown_night.png'),
        name: 'Todo_button',
        color: getColorType()['Background'],
        textBackground: getColorType()['Background'],
        textColor: getColorType()['TitleColor'],
        position: 1
      }
    ];
  }

  changeState(flag) {
    if (flag) this.setState({ type: 'notebook' });
    else this.setState({ type: 'todo' });
  }

  render() {
    return (
      <FloatingAction
        actions={this.state.type == 'notebook' ? this.actions : this.actions1}
        color={getColorType()['ItemBackground']}
        floatingIcon={
          global.colorType == 'day'
            ? require('./images/logo.png')
            : require('./images/logo_night.png')
        }
        iconWidth={40}
        iconHeight={40}
        onPressItem={name => {
          //alert(name);
          if (this.state.type == 'notebook') {
            if (name == 'Notebook_button') {
              this.props.navigation.navigate('notebook', { type: 'richtext' });
            } else if (name == 'Markdown_button') {
              this.props.navigation.navigate('notebook', { type: 'markdown' });
            }
          } else {
            if (name == 'Todo_button') {
              this.props.openInput();
            }
          }
        }}
      />
    );
  }
}
