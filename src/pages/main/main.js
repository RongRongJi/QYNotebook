/**
 * 主界面
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TopTab from './tab';
import FloatButton from './floatbutton';
import NotebookList from '../notebook/notebook_list';
import TodoList from '../todolist/todo_list';
import { getColorType } from '../../config/color_type';
import Setting from './setting';
import { MenuProvider } from 'react-native-popup-menu';

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // note 笔记  todo  待办
      currentPage: 'note'
    };
  }

    //界面顶部导航栏
    renderHeader = () => (
      <View
        style={[
          styles.row,
          { backgroundColor: getColorType()['ItemBackground'] }
        ]}
      >
        <TopTab
          ref={r => (this.notetab = r)}
          title={'笔记'}
          color={'white'}
          onFocus={this.state.currentPage == 'note'}
          onPress={() => {
            this._onPressTab(1);
          }}
        />
        <TopTab
          ref={r => (this.todotab = r)}
          title={'待办'}
          color={'white'}
          onFocus={this.state.currentPage == 'todo'}
          onPress={() => {
            this._onPressTab(2);
          }}
        />
        <View style={{ position: 'absolute', right: 20 }}>
          <Setting />
        </View>
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
        { key: '1', title: '笔记1', content: '.....', date: '2月13' },
        {
          key: '2',
          title: '笔记2',
          content: 'hahahahahahah',
          date: '3月4'
        },
        { key: '3', title: '笔记3', content: '123321123321', date: '6月5' }
      ];
      return (
        <NotebookList data={alldata} navigation={this.props.navigation} />
      );
    };

    //获取待办列表
    renderTodoList = () => {
      let alldata = [
        { key: '1', ifpass: true, content: 'Release v3.1', ddl: '5月4日' },
        {
          key: '2',
          ifpass: false,
          content: 'Finish React Native GraphQL Todo List App',
          ddl: '4月10日'
        }
      ];
      return <TodoList data={alldata} navigation={this.props.navigation} />;
    };

    render() {
      return (
        <MenuProvider style={styles.container}>
          <this.renderHeader />
          {this.state.currentPage == 'note'
            ? this.renderNotebookList()
            : this.renderTodoList()}
          <FloatButton
            ref={r => (this.floatbutton = r)}
            navigation={this.props.navigation}
          />
        </MenuProvider>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247,247, 250, 1)'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
