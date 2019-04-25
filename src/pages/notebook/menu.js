import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { getColorType } from '../../config/color_type';

const window = Dimensions.get('window');



export default function Menu({ onItemSelected, data }) {
  return (
    <ScrollView scrollsToTop={false} style={[styles.menu,
      {backgroundColor: getColorType()['Background'],}]}>
      <Text style={{
        fontSize:17,
        color:getColorType()['ItemBackground'],
      }}>笔记信息</Text>
      <Text style={{
        marginTop:10,
        color:getColorType()['ItemBackground'],
      }}>类型</Text>
      <Text style={{
        fontSize:16,
        color:getColorType()['TitleColor'],
      }}>笔记</Text>
      <Text style={{
        marginTop:15,
        color:getColorType()['ItemBackground'],
      }}>大小</Text>
      <Text style={{
        fontSize:16,
        color:getColorType()['TitleColor'],
      }}>{data.size}</Text>
      <Text style={{
        marginTop:15,
        color:getColorType()['ItemBackground'],
      }}>创建时间</Text>
      <Text style={{
        fontSize:16,
        color:getColorType()['TitleColor'],
      }}>{data.time}</Text>
      <Text style={{
        marginTop:15,
        color:getColorType()['ItemBackground'],
      }}>最近修改时间</Text>
      <Text style={{
        fontSize:16,
        color:getColorType()['TitleColor'],
      }}>{data.time}</Text>
      <View style={{height:20}}></View>

      <TouchableOpacity style={styles.avatarContainer}
        onPress={()=>onItemSelected('Lock')}
      >
        <Image
          style={styles.avatar}
          source={global.colorType=='day'?require('./images/lock_day.png'):require('./images/lock_night.png')}
        />
        <Text style={{marginLeft:15,color:getColorType()['ItemBackground']}}>加密笔记</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}
        onPress={()=>onItemSelected('Delete')}
      >
        <Image
          style={styles.avatar}
          source={global.colorType=='day'?require('./images/del_day.png'):require('./images/del_night.png')}
        />
        <Text style={{marginLeft:15,color:getColorType()['ItemBackground']}}>删除笔记</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
  },
  avatarContainer: {
    height:50,
    flexDirection:'row',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
  },
  name: {
    marginLeft:15,
  },
});