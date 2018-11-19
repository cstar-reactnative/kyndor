import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

// var defaultTextStyle = StyleSheet.create({
//   text: {
//     fontFamily: Fonts.Normal
//   }
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

AppRegistry.registerComponent('Price-Ride', () => App);
