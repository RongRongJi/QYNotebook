/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RichText from '../../config/richtext';
import '../../config/global';
import { Width, Height } from '../../config/global';
import FloatingAction from '../../config/floating-action-component/FloatingAction';

const actions = [{
    text: 'MarkDown',
    icon: require('../main/images/markdown.png'),
    name: 'Markdown_button',
    color: '#fff',
    position: 2
  },{
    text: 'NoteBook',
    icon: require('../main/images/notebook.png'),
    name: 'Notebook_button',
    color: '#fff',
    position: 3
  }
];

export default class ComponentTest extends Component {


  render() {
    return (
      <View style={styles.container}>
        <FloatingAction
          actions={actions}
          color={'#049F9A'}
          floatingIcon = {require('../main/images/logo.png')}
          iconWidth={40}
          iconHeight={40}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
