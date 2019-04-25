import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';



export default class ComponentTest extends Component {
  

  constructor(props){
    super(props);
  }

  render() {
    let todoDao = new Todo_Dao();
    return (
      <View style={{ flex: 1 }}>
      </View>
    );
  }
}