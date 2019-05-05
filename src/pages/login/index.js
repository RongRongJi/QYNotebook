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
import NoteBook_Dao from '../../services/notebook';



export default class Index extends Component {
  constructor(props){
    super(props);
  }

  //本地登录
  async Skip(){
    global.username='';
    //初始化notebook文件夹
    if(!global.nbDao)
    {
      global.nbDao = new NoteBook_Dao();
      await global.nbDao.init();
    }
    this.props.navigation.navigate('initial');
  }

  renderButton = () =>(
    <View style={styles.btnView}>
      <TouchableOpacity style={styles.loginPos}
        onPress={()=>this.props.navigation.navigate('login')}>
        <View style={styles.loginBtn}>
          <Text style={{color:'#fff',fontSize:16}}>登录</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerPos}
        onPress={()=>this.props.navigation.navigate('register')}>
        <View style={styles.registerBtn}>
          <Text style={{color:'#049F9A',fontSize:16}}>注册</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  renderSkip = ()=>(
    <View style={{position:'absolute',right:10,bottom:10}}>
      <TouchableOpacity onPress={()=>this.Skip()}>
        <Text>>>跳过</Text>
      </TouchableOpacity>
    </View>
  )


  render() {
    return (
      <View style={styles.container}>
        <View style={{position:'absolute',top:100}}>
          <Image style={{width:200,height:240}}
            source={require('./images/logo.png')}/>
        </View>
        <Text style={{position:'absolute',top:360,fontSize:25,color:'#049F9A'}}>青鱼笔记</Text>
        <this.renderButton/>
        <this.renderSkip/>
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
  btnView:{
    flexDirection:'row',
    position:'absolute',
    bottom:120,
  },
  loginBtn:{
    backgroundColor: '#049F9A',
    borderRadius: 20,
    height:40,
    width: Dimensions.get('window').width/2-30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPos:{
    position:'absolute',
    right:10,
  },
  registerBtn:{
    backgroundColor:'white',
    borderRadius: 20,
    height:40,
    width: Dimensions.get('window').width/2-30,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#049F9A',
  },
  registerPos:{
    position:'absolute',
    left:10,
  }
});
