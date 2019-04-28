/**
 * Sample React Native App
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
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { DirectLogin } from '../../utils/login_util';



export default class Advertise extends Component {
  constructor(props){
    super(props);
  }

  initData(){
    DirectLogin().then((res)=>{
      console.log('res= '+res);
      if(res==false){
        this.props.navigation.pop();
        this.props.navigation.navigate('index');
      }else{
        global.username = res.username;
        global.lock_pwd = res.lock;
        global.colorType = res.color;
        this.props.navigation.pop();
        this.props.navigation.navigate('main');
      }
    });
  }

  render() {
    this.initData();
    return (
      <View style={styles.container}>
        <View style={{position:'absolute',top:100}}>
          <Image style={{width:200,height:240}}
            source={require('./images/logo.png')}/>
        </View>
        <Text style={{position:'absolute',top:360,fontSize:25,color:'#049F9A'}}>青鱼笔记</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
