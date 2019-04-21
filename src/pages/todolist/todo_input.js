import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  Keyboard,
  Image,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { getColorType } from '../../config/color_type';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getDate } from '../../utils/date';
import Toast from 'react-native-root-toast';
import Todo_Dao from '../../services/todo';


export default class TodoInput extends Component {

  constructor(props) {
    super(props);
    // 记录点击
    this.state = {
      visible: false,
      text: '',
      type: '',
      date: '',
      isDateTimePickerVisible: false,
      selectedDate: '',
    };
  }

  //发布待办
  publishTodo = () =>{
    if(this.state.text==''){
      return;
    }else if(this.state.type==''){
      return;
    }else{
      let todoDao = new Todo_Dao();
      todoDao.addTodo(this.state.type,this.state.text,this.state.date);
      this.changeState();
    }
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this.hideDateTimePicker();
    console.log(getDate(this.state.selectedDate));
    this.setState({
      type:'once',
      date:getDate(this.state.selectedDate),
    });
  };

  setEveryDay = () =>{
    this.setState({
      type:'everyday',
    });
  }

  changeState(){
    if(this.state.visible){
      this.setState({visible:false});
      Keyboard.dismiss();
    }else{
      this.setState({visible:true});
      //this.myTextInput.focus();
    }
  }

  renderKeyboard = () =>(
    <Modal
      animationTyle='fade'
      transparent={true}
      visible={this.state.visible}
      onShow={()=>this.myTextInput.focus()}
    >
      <TouchableWithoutFeedback onPress={()=>this.changeState()}>
        <View style={{flex:1,backgroundColor:getColorType()['Modal']}}>
        </View>
      </TouchableWithoutFeedback>
      <View style={[{
        width:Dimensions.get('window').width,
        height:100,
        position:'absolute',
      },this.state.visible?{bottom:0}:{bottom:-120}]}>
        <TextInput ref={(ref)=>{this.myTextInput = ref;}}
          placeholder={' 还有什么事要做?'}
          onChangeText={(text)=>this.setState({text:text})}
          value={this.state.text}
          style={{
            height:55,
            backgroundColor:getColorType()['Background'],
          }}
        />
        <View style={{    
          flexDirection: 'row',
          backgroundColor:'rgba(247,247, 250, 1)',
          width:Dimensions.get('window').width,
          alignItems: 'center',
          height:45,
        }}>
          <TouchableOpacity style={{position:'absolute',left:15}}
            onPress={this.showDateTimePicker}>
            <Image style={{width:20,height:20,}} source={require('./images/calendar.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute',left:60}}
            onPress={this.setEveryDay}>
            <Image style={{width:20,height:20,}} source={require('./images/everyday.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{position:'absolute',right:15}}
            onPress={this.publishTodo}>
            <Image style={{width:20,height:20,}} source={require('./images/public.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

    
  render () {
    return(
      <View>
        <this.renderKeyboard/>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>

    );
  }
}
