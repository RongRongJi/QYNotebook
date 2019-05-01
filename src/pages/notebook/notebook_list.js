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

export default class NotebookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      refreshState: RefreshState.Idle
    };
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
    let alldata = [
      {
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记1',
        content: 'wrnm',
        date: '2月13'
      },
      {
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记2',
        content: 'wrnm',
        date: '3月4'
      },
      {
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记3',
        content: 'wrnm',
        date: '6月5'
      }
    ];
    this.setState({
      data: alldata
    });
    //结束刷新
    this.setState({
      refreshState: RefreshState.Idle
    });
  }

  //获取数据并跳转
  _getItemData(item) {
    this.props.navigation.navigate('nbpreview', {
      uuid: item.uuid
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
