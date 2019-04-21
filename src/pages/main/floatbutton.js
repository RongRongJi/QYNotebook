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

const actions = [
  {
    text: '新建markdown',
    icon: require('./images/markdown.png'),
    name: 'Markdown_button',
    color: '#fff',
    position: 1
  },
  {
    text: '新建笔记',
    icon: require('./images/notebook.png'),
    name: 'Notebook_button',
    color: '#fff',
    position: 2
  }
];

const actions1 = [
  {
    text: '新建待办',
    icon: require('./images/notebook.png'),
    name: 'Todo_button',
    color: '#fff',
    position: 1
  }
];

export default class FloatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type ? this.props.type : 'notebook'
    };
  }

  changeState(flag) {
    if (flag) this.setState({ type: 'notebook' });
    else this.setState({ type: 'todo' });
  }

  render() {
    return (
      <FloatingAction
        actions={this.state.type == 'notebook' ? actions : actions1}
        color={getColorType()['ItemBackground']}
        floatingIcon={require('./images/logo.png')}
        iconWidth={40}
        iconHeight={40}
        onPressItem={name => {
          //alert(name);
          if (this.state.type == 'notebook') {
            if (name == 'Notebook_button') {
              this.props.navigation.navigate('notebook');
            }
          }else{
            if (name == 'Todo_button'){
              this.props.openInput();
            }
          }
        }}
      />
    );
  }
}
