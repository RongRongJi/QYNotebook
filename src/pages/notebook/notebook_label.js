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
import { getColorType } from '../../config/color_type';



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
        <View style={[styles.container,
          {borderBottomColor:getColorType()['LineColor']}  
        ]}>
          <Text style={[styles.titlefont,{color:getColorType()['TitleColor']}]}>{title}</Text>
          <Text numberOfLines={2} style={{color:getColorType()['TextColor'],marginLeft:10,width:Dimensions.get('window').width-56}}>{content}</Text>
          <Text style={{ position:'absolute',left:10,bottom:10,color:getColorType()['TextColor']}}>{date}</Text>
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
    width:Dimensions.get('window').width-20,
    height:95,
    marginLeft:10,
    borderBottomWidth: 1,
  },
  titlerow: {
    marginLeft:10,
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
    marginLeft:10,
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold', 
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
