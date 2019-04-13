import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
});

export default class ComponentTest extends Component {
  state = {
    customBackgroundDialog: false,
    defaultAnimationDialog: false,
    scaleAnimationDialog: false,
    slideAnimationDialog: false,
  };

  constructor(props){
    super(props);
    this.changeState = this.changeState.bind(this);
  }

  renderDialog = (title,leftText,leftFunc,rightText,rightFunc,Content) =>(
    <Dialog
      onDismiss={() => {
        this.setState({ defaultAnimationDialog: false });
      }}
      width={0.9}
      visible={this.state.defaultAnimationDialog}
      rounded
      actionsBordered
      // actionContainerStyle={{
      //   height: 100,
      //   flexDirection: 'column',
      // }}
      dialogTitle={
        <DialogTitle
          title={title}
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
            text={leftText}
            bordered
            onPress={leftFunc}
            key="button-1"
          />
          <DialogButton
            text={rightText}
            bordered
            onPress={rightFunc}
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
        {Content}
      </DialogContent>
    </Dialog>
  )

  changeState(){
    this.setState({
      defaultAnimationDialog: false,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            title="Show Dialog - Default Animation"
            onPress={() => {
              this.setState({
                defaultAnimationDialog: true,
              });
            }}
          />

          
        </View>
        {this.renderDialog('','取消',this.changeState,'删除',this.changeState,<Text>你确定要删除该篇笔记吗？</Text>)}
        

        
      </View>
    );
  }
}