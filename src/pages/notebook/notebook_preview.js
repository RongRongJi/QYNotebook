/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  ScrollView, 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Modal
} from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import { getColorType } from '../../config/color_type';
import SideMenu from 'react-native-side-menu';
import { WIDTH } from '../../config/styles';
import Menu from './menu';


export default class NotebookPreview extends Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>{
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  renderHeader = () =>(
    <View
      style={[
        styles.row,
        { backgroundColor: getColorType()['ItemBackground'] }
      ]}
    >
      <TouchableOpacity 
        style={{position:'absolute',left:15}} 
        onPress={()=>this.props.navigation.goBack()}>
        <Image 
          style={{width:18,height:18}} 
          source={require('../../config/images/back.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{position:'absolute',right:70}} 
        onPress={()=>{}}>
        <Image 
          style={{width:20,height:20}} 
          source={require('./images/editor.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{position:'absolute',right:20}} 
        onPress={this.toggle}>
        <Image 
          style={{width:20,height:20}} 
          source={require('./images/more.png')}/>
      </TouchableOpacity>
    </View>
  )
  
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={WIDTH*3/7}
        menuPosition={'right'}
        disableGestures={true}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={[styles.container,
          this.state.isOpen?
            {backgroundColor:getColorType()['Modal']}:
            {backgroundColor:getColorType()['Background']}]}>
          <this.renderHeader/>
          <ScrollView style={styles.container}>

          </ScrollView>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flexDirection:'row',
    alignItems: 'center',
    height:50,
  }
});
