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



export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <TouchableOpacity style={styles.avatarContainer}
        onPress={()=>onItemSelected('About')}
      >
        <Image
          style={styles.avatar}
          source={require('./images/about.png')}
        />
        <Text style={styles.name}>详细信息</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}
        onPress={()=>onItemSelected('Lock')}
      >
        <Image
          style={styles.avatar}
          source={require('./images/lock.png')}
        />
        <Text style={styles.name}>加密笔记</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}
        onPress={()=>onItemSelected('Delete')}
      >
        <Image
          style={styles.avatar}
          source={require('./images/del.png')}
        />
        <Text style={styles.name}>删除笔记</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: getColorType()['Background'],
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
    color: getColorType()['ItemBackground'],
  },
});