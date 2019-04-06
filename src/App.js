

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ComponentTest from './pages/test/component_test';
import MainView from './pages/main/main';

const MainStack = createStackNavigator({
  'main':{
    screen: MainView,
  },
},
{
  headerMode:'none',
});

const TestStack = createStackNavigator({
  'test':{
    screen: ComponentTest,
  },
},
{
  headerMode:'none',
})

const AppNavigator = createStackNavigator({
  'init': {
    //screen: TestStack,
    screen: MainStack,
  },  
},
{
  headerMode:'none',
}
);

export default createAppContainer(AppNavigator);