import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import ComponentTest from './pages/test/component_test';
import MainView from './pages/main/main';

import NotebookView from './pages/notebook/notebook_view';
import Init from './pages/test/init';
import NotebookPreview from './pages/notebook/notebook_preview';
import LockView from './pages/notebook/lock';
import LockNotebook from './pages/notebook/lock_notebook';


const MainStack = createStackNavigator(
  {
    main: {
      screen: MainView
    },
    notebook: {
      screen: NotebookView
    },
    nbpreview:{
      screen: NotebookPreview,
    },
    locknotebook: {
      screen: LockNotebook,
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
    },
    lockview: {
      screen: LockView,
    },
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
