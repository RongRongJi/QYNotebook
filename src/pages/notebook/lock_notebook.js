/**
 * 笔记列表
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  DeviceEventEmitter
} from 'react-native';
import RefreshListView,{RefreshState} from 'react-native-refresh-list-view';
import NotebookLabel from './notebook_label';
import NaviBar from 'react-native-pure-navigation-bar';
import { getColorType } from '../../config/color_type';
import NoteBook_Dao from '../../services/notebook';


export default class LockNotebook extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      refreshState: RefreshState.Idle,
    };
    NoteBook_Dao.getInitData().then((ret)=>{
      this.setState({data:global.nbDao.lockList});
      //this.state.data= global.nbDao.NotebookList;
    });
    this.refresh = this.props.refresh;
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
      'notebookrefresh',
      ret => {
        setTimeout(() => {
          this.onRefresh();
        }, 300);
      }
    );
  }

  componentWillUnMount() {
    this.subscription.remove();
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
    NoteBook_Dao.getInitData().then((ret)=>{
      this.setState({data: global.nbDao.lockList});
      //结束刷新
      this.setState({
        refreshState: RefreshState.Idle
      });
    });
  }

  //获取数据并跳转
  _getItemData(item){
    this.props.navigation.navigate('nbpreview', {
      uuid: item.uuid,
      type: item.type,
      item: item
    });

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

  renderBlank = () => (
    <View
      style={[styles.blank, { backgroundColor: getColorType()['ViewColor'] }]}
    >
      <Text style={[styles.welcome, { color: getColorType()['TextColor'] }]}>
        当前无加密笔记
      </Text>
    </View>
  );

  render() {
    return (
      <View style={[styles.container,{backgroundColor:getColorType()['Background']}]}>
        <NaviBar title='加密笔记'/>
        {this.state.data.length==0?<this.renderBlank/>:this.renderList()}
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
  blank: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5
  }
});
