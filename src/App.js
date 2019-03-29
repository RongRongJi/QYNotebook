

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ComponentTest from './pages/test/component_test'

const MainStack = createStackNavigator({
  'test':{
    screen: ComponentTest,
  },
},
{
  headerMode:'none',
});

const AppNavigator = createStackNavigator({
  'init': {
    screen: MainStack,
  },  
},
{
  headerMode:'none',
}
);

export default createAppContainer(AppNavigator);