/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from 'react-native-popup-dialog';
import NaviBar from 'react-native-pure-navigation-bar';
import { getColorType } from '../../config/color_type';
import SideMenu from 'react-native-side-menu';
import { WIDTH } from '../../config/styles';
import Menu from './menu';
import Note from '../../services/note';
import Editor from '../../config/editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NotebookPreview extends Component {
  constructor(props) {
    super(props);
    this.uuid = this.props.navigation.getParam('uuid', false);
    this.type = this.props.navigation.getParam('type', false);
    this.content = this.props.navigation.getParam('content', false);
    if (!this.uuid) {
      throw new Error('no uuid found!');
    }
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      deleteDialog: false,
      lockDialog: false,
      rawData: false
    };

    this.data = {
      time: '5月9日',
      size: '52kb'
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item => {
    this.setState({
      //isOpen: false,
      selectedItem: item
    });
    if (item == 'Delete') {
      this.setState({ deleteDialog: true });
    } else if (item == 'Lock') {
      this.setState({ lockDialog: true });
    }
  };

  renderHeader = () => (
    <View
      style={[
        styles.row,
        { 
          backgroundColor: getColorType()['Background'],
          borderBottomWidth: 1,
          borderBottomColor: getColorType()['LineColor']
        }
      ]}
    >
      <TouchableOpacity
        style={{ position: 'absolute', left: 15 }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('../../config/images/back_day.png'):
            require('../../config/images/back_night.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', right: 70 }}
        onPress={() => {
          this.editor.unReadOnly();
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('./images/editor_day.png'):
            require('./images/editor_night.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', right: 20 }}
        onPress={this.toggle}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={global.colorType=='day'?
            require('./images/more_day.png'):
            require('./images/more_night.png')}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    const menu = (
      <Menu onItemSelected={this.onMenuItemSelected} data={this.data} />
    );
    // let getSync = async () => {
    // let rawData = await this.note.readContent();
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={(WIDTH * 4) / 7}
        menuPosition={'right'}
        disableGestures={true}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View
          style={[
            styles.container,
            this.state.isOpen
              ? { backgroundColor: getColorType()['Modal'] }
              : { backgroundColor: getColorType()['Background'] }
          ]}
        >
          <this.renderHeader />
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Editor
              ref={editor => {
                this.editor = editor;
              }}
              uuid={this.uuid}
              show={true}
            />
          </KeyboardAwareScrollView>
        </View>
        <this.renderDeleteDialog />
        <this.renderLockDialog />
      </SideMenu>
    );
    // };

    // return getSync();
  }

  renderDeleteDialog = () => (
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
          title="删除笔记"
          style={{
            backgroundColor: '#F7F7F8'
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
              this.editor.delete();
              this.setState({ deleteDialog: false });
              this.props.navigation.pop();
            }}
            key="button-2"
          />
        </DialogFooter>
      }
    >
      <DialogContent
        style={{
          backgroundColor: '#F7F7F8'
        }}
      >
        <Text>你确定要删除该篇笔记吗？</Text>
      </DialogContent>
    </Dialog>
  );

  renderLockDialog = () => (
    <Dialog
      onDismiss={() => {
        this.setState({ lockDialog: false });
      }}
      width={0.9}
      visible={this.state.lockDialog}
      rounded
      actionsBordered
      dialogTitle={
        <DialogTitle
          title="加密笔记"
          style={{
            backgroundColor: '#F7F7F8'
          }}
          hasTitleBar={false}
          align="left"
        />
      }
      footer={
        <DialogFooter>
          <DialogButton
            text="确定"
            bordered
            onPress={() => {
              this.setState({ lockDialog: false });
            }}
            key="button-1"
          />
        </DialogFooter>
      }
    >
      <DialogContent
        style={{
          backgroundColor: '#F7F7F8'
        }}
      >
        <Text>您还未设置加密笔记密码，请前往设置！</Text>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18
  },
  navigationTitle: {
    padding: 10
  },
  navigationButton: {
    padding: 10
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40
  }
});
