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
  TouchableOpacity
} from 'react-native';

export default class Todolabel extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.state = {
      Height: 60,
      ifPass: this.props.item.ifpass
    };
  }

  //完成待办
  onPressTodo() {
    if (this.state.ifPass) this.setState({ ifPass: false });
    else this.setState({ ifPass: true });
  }

  //高度适配
  changeView(event) {
    let h = event.nativeEvent.layout.height + 15;
    if (h > 60) this.setState({ Height: h });
  }

  render() {
    let content = this.item.content;
    let ddl = this.item.ddl;
    return (
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
          <Text>截止时间: {ddl}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
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
