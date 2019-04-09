/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './src/static/async_storage';

AppRegistry.registerComponent(appName, () => App);
