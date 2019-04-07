import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { Text, View, StyleSheet, Image } from 'react-native';
import React from 'react';

const { Popover } = renderers

const MyPopover = () => (
  <Menu renderer={Popover} rendererProps={{placement: 'bottom', preferredPlacement: 'bottom' }}>
    <MenuTrigger style={styles.menuTrigger} >
      <Image style={{width:30,height:30}} source={require('../main/images/setting_main.png')}/>
    </MenuTrigger>
    <MenuOptions style={styles.menuOptions}>
      <Text style={styles.contentText}>Hello world!</Text>
    </MenuOptions>
  </Menu>
)

const Row = () => (
  <View style={styles.row}>
    <MyPopover />
  </View>
)

const ComponentTest = () => (
  <MenuProvider style={styles.container} customStyles={{ backdrop: styles.backdrop }}>
    <Row />
  </MenuProvider>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backdrop: {
  },
  menuOptions: {
    padding: 50,
  },
  menuTrigger: {
    padding: 5,
  },
  triggerText: {
    fontSize: 20,
  },
  contentText: {
    fontSize: 18,
  },
})

export default ComponentTest;