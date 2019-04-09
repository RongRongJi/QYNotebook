/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import WIDTH from '../../config/styles';



export default class NotebookLabel extends Component {
  constructor(props){
    super(props);
    this.item = this.props.item;
  }

    renderItem = () =>{
      let title = this.item.title;
      let content = this.item.content;
      let date = this.item.date;
      return (
        <View style={styles.container}>
          <Text style={styles.titlefont}>{title}</Text>
          <Text numberOfLines={2} style={{width:Dimensions.get('window').width-56}}>{content}</Text>
          <Text style={{ position:'absolute',left:0,bottom:0,}}>{date}</Text>
        </View>
      );
    }


    render() {
      return(
        <View>
          <this.renderItem/>
        </View>);
    }
}

const styles = StyleSheet.create({
  container:{
    width:Dimensions.get('window').width-16,
    height:85,
    marginLeft:20
  },
  titlerow: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  row: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titlefont: {
    marginTop:10,
    fontSize: 16,
    color: 'black',
    marginRight: 5,
    fontWeight: 'bold', 
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
