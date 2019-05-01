/**
 * 笔记列表
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import NotebookLabel from './notebook_label';
import { getColorType } from '../../config/color_type';
import NoteBook_Dao from '../../services/notebook';

export default class NotebookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle
    };
    NoteBook_Dao.getInitData().then((ret)=>{
      this.setState({data:global.nbDao.notebookList});
      //this.state.data= global.nbDao.NotebookList;
    });
    this.refresh = this.props.refresh;
  }

  //刷新
  async onRefresh() {
    //开始刷新列表
    this.setState({
      data: [],
      refreshState: RefreshState.HeaderRefreshing
    });
    //加载数据
    //测试数据
    NoteBook_Dao.getInitData().then((ret)=>{
      this.setState({data: global.nbDao.notebookList});
      //结束刷新
      this.setState({
        refreshState: RefreshState.Idle
      });
    });
    
  }

  //获取数据并跳转
  _getItemData(item) {
    this.props.navigation.navigate('nbpreview', {
      uuid: item.uuid,
      type: item.type,
      content: item.note,
    });
  }

  renderList() {
    return (
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

  renderItem({ item }) {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this._getItemData(item);
        }}
      >
        <View
          style={{
            backgroundColor: getColorType()['Background']
          }}
        >
          <NotebookLabel
            key={item.key}
            item={item}
            navigation={this.props.navigation}
          />
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listcontainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 20 : 0
  }
});
