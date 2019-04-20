import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LayoutAnimation
} from 'react-native';


export default class ComponentTest extends Component {

  constructor(props) {
    super(props);
    // 记录点击
    this.state = {
      isSelect: -1,
    };
  }

    subItemData = () => {
      let data = [];
      for (let i = 0; i < 5; i++){
        data.push('subItem' + i);
      }
      return data;
    }

    // header点击
    itemTap = (index) => {

      // 点击的item如果是同一个, 就置为初始状态-1, 也就是折叠的状态
      let select = index;
      if (this.state.isSelect === index){
        select = -1;
      }

      // 就这一句话就有动画效果了, 神奇不... , 对LayoutAnimation不熟悉的可以看上一篇文章.
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isSelect: select
      });
    }

    // 渲染FlatList的item
    renderItem = (item) => {
      const text = '第' + item.index + '个   ' + item.item.title;
      const itemColor = item.index % 2 === 0 ? 'yellow' : 'tan';
      return (
        <View>
          {/*每组的点击header*/}
          <TouchableOpacity
            style={[styles.listItemTouch, {backgroundColor:itemColor}]}
            activeOpacity={0.6}
            onPress={() => {this.itemTap(item.index);}}
          >
            <Text
              style={styles.listItemText}
            >
              {text}
            </Text>
          </TouchableOpacity>

          {/*每组的折叠item, 相等显示, 不等隐藏*/}
          {this.state.isSelect === item.index ?
            <View
              style={styles.listSubBg}
            >
              {
                this.subItemData().map((subItem, subItemIndex) => {
                  return (
                    <TouchableOpacity
                      key={subItemIndex}
                      style={styles.listSubItemTouch}
                    >
                      <Text>
                        {subItem}
                      </Text>
                    </TouchableOpacity>

                  );
                })
              }
            </View> : null}

        </View>
      );
    }

    render () {

      // 数据
      let data = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          title: 'title=' + i
        });
      }

      return (
        <View style={styles.bgView}>
          <FlatList
            style={styles.flatList}
            ref={(flatList) => (this.flatList = flatList)}
            keyExtractor={(item, index) => index}
            data={data}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
}

const windowW = Dimensions.get('window').width;

const styles = StyleSheet.create({

  bgView: {
    flex: 1
  },

  flatList: {
    flex: 1
  },
  listItemTouch: {
    height: 50,
    width: windowW,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemText: {
    textAlign:'center',
    fontSize: 20
  },
  listSubBg: {
    width: windowW,
  },
  listSubItemTouch: {
    marginTop: 2,
    height: 40,
    width: windowW,
    backgroundColor: 'cyan'
  },

});
