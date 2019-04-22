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
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import { getDateString } from '../../utils/date';
import Todo_Dao from '../../services/todo';

let todoDao = new Todo_Dao();

export default class Todolabel extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.state = {
      Height: 60,
      ifPass: this.props.item.status=='wait-to-do'?false:true,
      deleteDialog: false,
    };
  }

  //完成待办
  onPressTodo() {
    if (this.state.ifPass) {
      todoDao.finishTodo(this.item,'wait-to-do');
      this.setState({ ifPass: false });
    }
    else {
      todoDao.finishTodo(this.item,'done');
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
      <TouchableNativeFeedback onLongPress={()=>this.setState({deleteDialog:true})}>
        <View
          ref={r => (this.label = r)}
          style={[styles.container, { height: this.state.Height }]}
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
            <Text style={this.state.ifPass ? styles.donetext : styles.text}>
              {content}
            </Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text>{getDateString(date)}</Text>
              {type=='everyday'?
                <Image style={{marginLeft:10,width:15,height:15}} source={require('./images/everyday.png')}/>
                :null}
            </View>
          </View>
          <this.renderDeleteDialog/>
        </View>
      </TouchableNativeFeedback>
    );
  }

  //删除提示
  renderDeleteDialog = () =>(
    <Dialog
      onDismiss={() => {
        this.setState({ deleteDialog: false });
      }}
      width={0.9}
      visible={this.state.deleteDialog}
      rounded
      actionsBordered
      dialogTitle={
        <DialogTitle
          title="删除待办"
          style={{
            backgroundColor: '#F7F7F8',
          }}
          hasTitleBar={false}
          align="left"
        />
      }
      footer={
        <DialogFooter>
          <DialogButton
            text="取消"
            bordered
            onPress={() => {
              this.setState({ deleteDialog: false });
            }}
            key="button-1"
          />
          <DialogButton
            text="删除"
            bordered
            onPress={() => {
              this.setState({ deleteDialog: false });
              todoDao.deleteTodo(this.item.uuid);
            }}
            key="button-2"
          />
        </DialogFooter>
      }
    >
      <DialogContent
        style={{
          backgroundColor: '#F7F7F8',
        }}
      >
        <Text>您确定要删除该待办事项?</Text>
      </DialogContent>
    </Dialog>
  )




}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd'
  },
  text: {
    color: 'black',
    width: Dimensions.get('window').width - 80
  },
  donetext: {
    textDecorationLine: 'line-through',
    width: Dimensions.get('window').width - 80
  },
  image: {
    width: 30,
    height: 30
  },
  textview: {
    position: 'absolute',
    left: 60
  }
});
