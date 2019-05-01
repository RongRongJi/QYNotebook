/**
 * 主界面
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
  Image,
  BackHandler
} from 'react-native';
import TopTab from './tab';
import FloatButton from './floatbutton';
import NotebookList from '../notebook/notebook_list';
import TodoList from '../todolist/todo_list';
import { getColorType } from '../../config/color_type';
import Setting from './setting';
import { MenuProvider } from 'react-native-popup-menu';
import { ToastShort } from '../../utils/toast_util';

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // note 笔记  todo  待办
      currentPage: 'note'
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  comPonentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    if (!this.props.navigation.isFocused()) return false;
    else if (
      this.lastBackPressed &&
      this.lastBackPressed + 2000 >= Date.now()
    ) {
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastShort('再按一次退出应用');
    return true;
  };

  //界面顶部导航栏
  renderHeader = () => (
    <View
      style={[
        styles.row,
        {
          backgroundColor: getColorType()['Background'],
          borderBottomWidth: 1,
          borderBottomColor: getColorType()['TabShadow']
        }
      ]}
    >
      <TopTab
        ref={r => (this.notetab = r)}
        title={'笔记'}
        color={getColorType()['ItemBackground']}
        onFocus={this.state.currentPage == 'note'}
        onPress={() => {
          this._onPressTab(1);
        }}
      />
      <TopTab
        ref={r => (this.todotab = r)}
        title={'待办'}
        color={getColorType()['ItemBackground']}
        onFocus={this.state.currentPage == 'todo'}
        onPress={() => {
          this._onPressTab(2);
        }}
      />
      <View style={{ position: 'absolute', right: 20 }}>
        <Setting navigation={this.props.navigation} />
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', right: 70 }}
        onPress={() => this.props.navigation.navigate('lockview')}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={
            global.colorType == 'day'
              ? require('./images/lock_day.png')
              : require('./images/lock_night.png')
          }
        />
      </TouchableOpacity>
    </View>
  );

  //笔记 待办 页面切换
  _onPressTab(num) {
    switch (num) {
    case 1:
      this.setState({ currentPage: 'note' });
      this.notetab.changeFocus(true);
      this.todotab.changeFocus(false);
      this.floatbutton.changeState(true);
      break;
    case 2:
      this.setState({ currentPage: 'todo' });
      this.notetab.changeFocus(false);
      this.todotab.changeFocus(true);
      this.floatbutton.changeState(false);
      break;
    default:
      break;
    }
  }

  //获取笔记列表
  renderNotebookList = () => {
    let alldata = [
      {
        key: 1,
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记1',
        content: '.....',
        date: '2月13'
      },
      {
        key: 2,
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记2',
        content: 'hahahahahahah',
        date: '3月4'
      },
      {
        key: 3,
        uuid: '7872a68c-7815-4ed6-9780-c9a2212d3cf6',
        title: '笔记3',
        content: '123321123321',
        date: '6月5'
      }
    ];
    return <NotebookList data={alldata} navigation={this.props.navigation} />;
  };

  //获取待办列表
  renderTodoList = () => {
    return (
      <TodoList
        navigation={this.props.navigation}
        ref={r => (this.todolist = r)}
      />
    );
  };

  render() {
    return (
      <MenuProvider
        style={{
          flex: 1,
          backgroundColor: getColorType()['ViewColor']
        }}
      >
        <this.renderHeader />
        {this.state.currentPage == 'note'
          ? this.renderNotebookList()
          : this.renderTodoList()}
        <FloatButton
          ref={r => (this.floatbutton = r)}
          navigation={this.props.navigation}
          openInput={() => this.todolist._OpenInput()}
        />
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
