/**
 * 待办列表标签
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
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { getDateString } from '../../utils/date';
import Todo_Dao from '../../services/todo';
import { getColorType } from '../../config/color_type';

let todoDao = new Todo_Dao();

export default class Todolabel extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.fatherComponent = this.props.fatherComponent;
    this.state = {
      Height: 60,
      ifPass: this.props.item.status=='wait-to-do'?false:true,
    };
  }

  //完成待办
  onPressTodo() {
    if (this.state.ifPass) {
      global.todoDao.finishTodo(this.item,'wait-to-do');
      this.setState({ ifPass: false });
    }
    else {
      global.todoDao.finishTodo(this.item,'done');
      this.setState({ ifPass: true });
    }
  }

  //高度适配
  changeView(event) {
    let h = event.nativeEvent.layout.height + 15;
    if (h > 60) this.setState({ Height: h });
  }


  render() {
    /**
     * {
     *   "uuid": 唯一uuid标识,
     *   "type": "everyday" 每日 / "once"一次性,
     *   "status": "done" 已完成 / "wait-to-do" 未完成,
     *   "content": 待办列表内容,
     *   "date": "2019-4-18" 一次性待办列表存在
     * }
     */
    let content = this.item.content;
    let type = this.item.type;
    let date = type=='everyday'?'今天':this.item.date;
    return (
      <TouchableWithoutFeedback onLongPress={()=>this.renderDeleteDialog()}>
        <View
          ref={r => (this.label = r)}
          style={[styles.container, 
            { height: this.state.Height ,
              borderBottomColor: getColorType()['LineColor'],
              backgroundColor: getColorType()['Background'],
            }]}
        >
          <TouchableOpacity
            style={{ position: 'absolute', left: 20 }}
            onPress={() => this.onPressTodo()}
          >
            <Image
              style={styles.image}
              source={
                this.state.ifPass
                  ? require('../main/images/passed.png')
                  : require('../main/images/circle.png')
              }
            />
          </TouchableOpacity>
          <View style={styles.textview} onLayout={this.changeView.bind(this)}>
            <Text style={[this.state.ifPass ? styles.donetext : styles.text, {color:getColorType()['TitleColor']}]}>
              {content}
            </Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:getColorType()['TextColor']}}>{getDateString(date)}</Text>
              {type=='everyday'?
                <Image style={{marginLeft:10,width:15,height:15}} source={require('./images/everyday.png')}/>
                :null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderDeleteDialog = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        '删除待办',
        '您是否要删除该待办事项?',
        [
          {
            text: '取消',
            onPress: () => {
              resolve(false);
            },
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              //你要执行的函数
              //this.postMessage();
              global.todoDao.deleteTodo(this.item.uuid).then((ret)=>{
                this.props.delete(ret);
              });
            }
          }
        ],
        {
          cancelable: true
        }
      );
    });
  };

  


}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  text: {
    width: Dimensions.get('window').width - 80
  },
  donetext: {
    textDecorationLine: 'line-through',
    width: Dimensions.get('window').width - 80
  },
  image: {
    width: 15,
    height: 15
  },
  textview: {
    position: 'absolute',
    left: 50
  }
});
