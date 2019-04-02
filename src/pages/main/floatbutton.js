/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import '../../config/ColorType';
import '../../config/global';
import FloatingAction from '../../config/floating-action-component/FloatingAction';
import { getColorType } from '../../config/ColorType';

const actions = [{
    text: 'MarkDown',
    icon: require('./images/markdown.png'),
    name: 'Markdown_button',
    color: '#fff',
    position: 1
  },{
    text: 'NoteBook',
    icon: require('./images/notebook.png'),
    name: 'Notebook_button',
    color: '#fff',
    position: 2
  }
];

export default class FloatButton extends Component {


  render() {
    return (
        <FloatingAction
          actions={actions}
          color={getColorType()["ItemBackground"]}
          floatingIcon = {require('./images/logo.png')}
          iconWidth={40}
          iconHeight={40}
        />
    );
  }
}
