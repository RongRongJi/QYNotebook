/**
 * 待办列表
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
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import Todolabel from './todo_label';
import { getColorType } from '../../config/color_type';
import { compareDate, getToday } from '../../utils/date';
import Todo_Dao from '../../services/todo';
import TodoInput from './todo_input';
import TodoDataManager from '../../services/todo_data_manager';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      refreshState: RefreshState.Idle,
      today: true,
      wait: true,
      done: true,
      todayTd: [],
      waitTd: [],
      doneTd: [],
    };
    this.refresh = this.props.refresh;
    //异步分配数据
    if(!global.todoDao){
      let tdm = new TodoDataManager();
      tdm.getInitData().then((ret)=>{
        this.setState({todayTd:global.todoDao.todayTd});
        this.setState({doneTd:global.todoDao.doneTd});
        this.setState({waitTd:global.todoDao.waitTd});
      });
    }else{
      this.state.todayTd=global.todoDao.todayTd;
      this.state.doneTd=global.todoDao.doneTd;
      this.state.waitTd=global.todoDao.waitTd;
    }
  }

  _openFold(flag){
    if(flag==1){
      this.setState({today: !this.state.today});
    }
    else if(flag==2){
      this.setState({wait: !this.state.wait});
    }
    else if(flag==3){
      this.setState({done: !this.state.done});
    }
  }

  renderList(listdata) {
    return (
      <FlatList
        data={listdata}
        renderItem={this.renderItem.bind(this)}
        extraData={this.state}
      />
    );
  }

  renderItem({ item }) {
    return (
      <View style={styles.itemcontainer}>
        <Todolabel
          key={item.uuid}
          item={item}
          navigation={this.props.navigation}
          delete={this.delete.bind(this)}
        />
      </View>
    );
  }

  renderFold = () =>(
    <View>
      <TouchableNativeFeedback onPress={()=>this._openFold(1)}>
        <View style={[styles.foldView,{backgroundColor: getColorType()['FoldColor']}]}>
          <Text style={{position:'absolute',left:20}}>今天</Text>
          <Image style={{width:20,height:20,position:'absolute',right:20}} 
            source={this.state.today?require('./images/angle_down.png'):
              require('./images/angle_right.png')}/>
        </View>
      </TouchableNativeFeedback>
      {this.state.today?this.renderList(this.state.todayTd):null}
      <TouchableNativeFeedback onPress={()=>this._openFold(2)}>
        <View style={[styles.foldView,{backgroundColor: getColorType()['FoldColor']}]}>
          <Text style={{position:'absolute',left:20}}>待办</Text>
          <Image style={{width:20,height:20,position:'absolute',right:20}} 
            source={this.state.wait?require('./images/angle_down.png'):
              require('./images/angle_right.png')}/>
        </View>
      </TouchableNativeFeedback>
      {this.state.wait?this.renderList(this.state.waitTd):null}
      <TouchableNativeFeedback onPress={()=>this._openFold(3)}>
        <View style={[styles.foldView,{backgroundColor: getColorType()['FoldColor']}]}>
          <Text style={{position:'absolute',left:20}}>已完成</Text> 
          <Image style={{width:20,height:20,position:'absolute',right:20}} 
            source={this.state.done?require('./images/angle_down.png'):
              require('./images/angle_right.png')}/>
        </View>
      </TouchableNativeFeedback>
      {this.state.done?this.renderList(this.state.doneTd):null}
    </View>
  )

  _OpenInput(){
    this.todoinput.changeState();
  }

  public(ret){
    if(ret==1)
      this.setState({todayTd:global.todoDao.todayTd});
    else if(ret==2)
      this.setState({waitTd:global.todoDao.waitTd});
  }

  delete(ret){
    if(ret==1)
      this.setState({todayTd:global.todoDao.todayTd});
    else if(ret==2)
      this.setState({waitTd:global.todoDao.waitTd});
    else if(ret==3)
      this.setState({doneTd:global.todoDao.doneTd});
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <this.renderFold/>
        <TodoInput ref={r => (this.todoinput = r)}
          public={this.public.bind(this)}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listcontainer: {
    flex:1
  },
  itemcontainer: {
    backgroundColor: 'white',
    width:Dimensions.get('window').width,
    //marginLeft:15,
  },
  foldView:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    height:30,
    alignItems: 'center',
    //marginLeft:13,
  }
});
