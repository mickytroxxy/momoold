import { AppRegistry } from "react-native";
// import './setup';
import '../shim'
// import 'react-native-gesture-handler';
// import './rn-addons';
import { name as appName } from "../app.json";
import "./storybook.requires";
import Story from "./Story";


AppRegistry.registerComponent(appName, () => Story);

