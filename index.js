/**
 * @format
 */
import 'react-native-gesture-handler';
import './shim.js'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/base/App';

//export {default} from './.storybook'; 

AppRegistry.registerComponent(appName, () => App);
