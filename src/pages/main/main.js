/**
 * 主界面
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TopTab from './tab';
import FloatButton from './floatbutton';

export default class MainView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // note 笔记  todo  待办
       currentPage : 'note',
    };
  }

  //界面顶部导航栏
  renderHeader =() =>(
    <View style={styles.row}>
        <TopTab
          ref={(r) => this.notetab = r}
          title={'笔记'}
          onFocus={this.state.currentPage=='note'}
          onPress={()=>{this._onPressTab(1)}}/>
        <TopTab
          ref={(r) => this.todotab = r}
          title={'待办'}
          onFocus={this.state.currentPage=='todo'}
          onPress={()=>{this._onPressTab(2)}}/>
    </View>
  )

  //笔记 待办 页面切换
  _onPressTab(num){
    switch(num){
      case 1:
      this.setState({currentPage: 'note'});
      this.notetab.changeFocus(true);
      this.todotab.changeFocus(false);
      break;
      case 2:
      this.setState({currentPage: 'todo'});
      this.notetab.changeFocus(false);
      this.todotab.changeFocus(true);
      break;
      default:
      break;
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <this.renderHeader/>
        <FloatButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  }
});
