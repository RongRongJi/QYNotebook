import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import ComponentTest from './pages/test/component_test';
import MainView from './pages/main/main';

import NotebookView from './pages/notebook/notebook_view';
import Init from './pages/test/init';

const MainStack = createStackNavigator(
  {
    main: {
      screen: MainView
    },
    notebook: {
      screen: NotebookView
    }
  },
  {
    headerMode: 'none'
  }
);

const InitStack = createSwitchNavigator(
  {
    init: {
      screen: Init
    },
    mainstack:{
      screen: MainStack,
    }
  },
  {
    headerMode: 'none'
  }
);

const TestStack = createStackNavigator(
  {
    test: {
      screen: ComponentTest
    }
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = createStackNavigator(
  {
    init: {
      //screen: TestStack,
      //screen: MainStack
      screen: InitStack,
    }
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
