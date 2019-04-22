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
    let todoDao = new Todo_Dao();
    todoDao.getTodo().then((ret)=>{
      let allData = ret;
      let todayTd=[],doneTd=[],waitTd=[];
      for(var i=0;i<allData.length;i++){
        if(allData[i].type=='everyday' && allData[i].date!=getToday()){
          allData[i].status='wait-to-do';
        }
        if(allData[i].type=='everyday' && allData[i].status=='wait-to-do') {
          todayTd.push(allData[i]);
          this.setState({todayTd:todayTd});
        }
        else if(allData[i].type=='everyday') {
          doneTd.push(allData[i]);
          this.setState({doneTd:doneTd});
        }
        else if(allData[i].status=='wait-to-do' && compareDate(allData[i].date)) {
          todayTd.push(allData[i]);
          this.setState({todayTd:todayTd});
        }
        else if(allData[i].status=='wait-to-do') {
          waitTd.push(allData[i]);
          this.setState({waitTd:waitTd});
        }
        else {
          doneTd.push(allData[i]);
          this.setState({doneTd:doneTd});
        }
      }
    });
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
      />
    );
  }

  renderItem({ item }) {
    return (
      <View style={styles.itemcontainer}>
        <Todolabel
          key={item.key}
          item={item}
          navigation={this.props.navigation}
        />
      </View>
    );
  }

  renderFold = () =>(
    <View>
      <TouchableNativeFeedback onPress={()=>this._openFold(1)}>
        <View style={styles.foldView}>
          <Text style={{position:'absolute',left:20}}>今天</Text>
          <Image style={{width:20,height:20,position:'absolute',right:20}} 
            source={this.state.today?require('./images/angle_down.png'):
              require('./images/angle_right.png')}/>
        </View>
      </TouchableNativeFeedback>
      {this.state.today?this.renderList(this.state.todayTd):null}
      <TouchableNativeFeedback onPress={()=>this._openFold(2)}>
        <View style={styles.foldView}>
          <Text style={{position:'absolute',left:20}}>待办</Text>
          <Image style={{width:20,height:20,position:'absolute',right:20}} 
            source={this.state.wait?require('./images/angle_down.png'):
              require('./images/angle_right.png')}/>
        </View>
      </TouchableNativeFeedback>
      {this.state.wait?this.renderList(this.state.waitTd):null}
      <TouchableNativeFeedback onPress={()=>this._openFold(3)}>
        <View style={styles.foldView}>
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

  render() {
    return(
      <ScrollView style={styles.container}>
        <this.renderFold/>
        <TodoInput ref={r => (this.todoinput = r)}/>
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
    width:Dimensions.get('window').width-30,
    marginLeft:15,
  },
  foldView:{
    flexDirection:'row',
    width:Dimensions.get('window').width-26,
    height:30,
    backgroundColor: getColorType()['FoldColor'],
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    marginTop:10,
    marginLeft:13,
    borderRadius: 4,
  }
});
