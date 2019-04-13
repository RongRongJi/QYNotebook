/**
 * 笔记列表
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import RefreshListView,{RefreshState} from 'react-native-refresh-list-view';
import NotebookLabel from './notebook_label';
import NaviBar from 'react-native-pure-navigation-bar';



export default class LockNotebook extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      refreshState: RefreshState.Idle,
    };
    this.refresh = this.props.refresh;
  }

  //刷新
  async onRefresh(){
    //开始刷新列表
    this.setState({
      data:[],
      refreshState: RefreshState.HeaderRefreshing,
    });
    //加载数据
    //测试数据
    let alldata=[
      {key:'1',title:'笔记1',content:'wrnm',date:'2月13'},
      {key:'2',title:'笔记2',content:'wrnm',date:'3月4'},
      {key:'3',title:'笔记3',content:'wrnm',date:'6月5'},
    ];
    this.setState({
      data:alldata,
    });
    //结束刷新
    this.setState({
      refreshState: RefreshState.Idle,
    });
  }

  //获取数据并跳转
  _getItemData(){
    this.props.navigation.navigate('nbpreview');
  }



  renderList(){
    return(
      <View>
        <RefreshListView
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onRefresh.bind(this)}
          footerFailureText="数据加载失败，下拉刷新"
          footerEmptyDataText="没有更多笔记啦~"
        />

      </View>
    );
  }

  renderItem({item}){
    return(
      <TouchableOpacity style={styles.itemcontainer}
        onPress={()=>{this._getItemData();}}>
        <NotebookLabel
          key={item.key}
          item={item}
          navigation={this.props.navigation}
        />
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <NaviBar title='加密笔记'/>
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listcontainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },
  itemcontainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#bdbdbd',
  },
});
