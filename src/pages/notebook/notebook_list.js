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
  TouchableNativeFeedback,
  DeviceEventEmitter,
  FlatList
} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import NotebookLabel from './notebook_label';
import { getColorType } from '../../config/color_type';
import NoteBook_Dao from '../../services/notebook';
import { GetWithParams, URL } from '../../utils/fetch';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export default class NotebookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle,
      data:[],
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
    //超时
    setTimeout(()=>this.setState({
      refreshState: RefreshState.Idle
    }),500);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
      'notebookrefresh',
      ret => {
        console.log('notebookrefresh' + global.nbDao.notebookList);
        setTimeout(() => {
          this.onRefresh();
        }, 300);
      }
    );
    this.fetch_note();
  }

  note_download = uuid => {
    let NBInfoDirectoryPath =
      RNFS.ExternalDirectoryPath + '/' + global.username + '/nbInfo';
    let tmp = RNFS.ExternalDirectoryPath + '/' + global.username + '/tmp';
    let path = NBInfoDirectoryPath + `/${uuid}`;
    let tmp_path = tmp + `/${uuid}` + Date.now().toString();
    let fetch = RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: tmp_path
    });
    fetch
      .fetch('GET', URL.note_download + `/${uuid}`, {
        //some headers ..
      })
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log('The file saved to ', res.path());
        let _unzip = unzip(tmp_path, path);
        _unzip
          .then(res => {
            console.log(`unzip completed at ${res}`);
            this.onRefresh();
          })
          .catch(error => {
            console.log(error);
          });
      });
  };

  fetch_note = async () => {
    if (global.username != '') {
      let NBInfoDirectoryPath =
        RNFS.ExternalDirectoryPath + '/' + global.username + '/nbInfo';
      let notelist;
      await RNFS.readdir(NBInfoDirectoryPath)
        .then(res => {
          notelist = res;
          GetWithParams(URL.note_get_all_uuid, { usernum: global.username })
            .then(res => {
              console.log(res);
              if (res.ret == 0) {
                for (let uuid of res.uuid) {
                  if (!notelist.includes(uuid)) {
                    console.log(`download ${uuid}...`);
                    this.note_download(uuid);
                  }
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentWillUnMount() {
    this.subscription.remove();
  }

  //获取数据并跳转
  _getItemData(item) {
    console.log('获取数据并跳转' + item.created);
    this.props.navigation.navigate('nbpreview', {
      uuid: item.uuid,
      type: item.type,
      item: item
    });
  }

  /**
   * <RefreshListView
          data={[]}
          renderItem={this.renderItem.bind(this)}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onRefresh.bind(this)}
          keyExtracotr={(item,index)=>index}
          footerFailureText="数据加载失败，下拉刷新"
          footerEmptyDataText="没有更多笔记啦~"
        />
   */

  renderList() {
    return (
      <View>
        <RefreshListView
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onRefresh.bind(this)}
          keyExtracotr={(item, index) => index}
          footerFailureText="数据加载失败，下拉刷新"
          footerEmptyDataText="没有更多笔记啦~"
          footerEmptyDataComponent={<this.renderBlank/>}
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

  renderBlank = () => (
    <View
      style={[styles.blank, { backgroundColor: getColorType()['ViewColor'] }]}
    >
      <Text style={[styles.welcome, { color: getColorType()['TextColor'] }]}>
        当前笔记列表为空
      </Text>
      <Text style={[styles.welcome, { color: getColorType()['TextColor'] }]}>
        赶快动手创建自己的笔记吧！
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length==0?<this.renderBlank/>:this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listcontainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 20 : 0
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
