import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';
import Metrics from './Metrics';
import Colors from './ColorsTwo';
import IsIphoneX from './IsIphoneX';
let Window = Dimensions.get('window');
//import EStyleSheet from 'react-native-extended-stylesheet';
//EStyleSheet.build();

const Styles = StyleSheet.create({
  loginSignupButton: {      //used in login,register and forgotPasswprd
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.brandPrimary
  },
  brandHolder: {
    width: '100%',
    // height: 150,            //used in login,register and forgotPasswprd
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20
  },
  loginSignUpHeaderOne: {
    // width: 222,
    // height: 36,
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 36,
    letterSpacing: 0.26,
    color: "#383e53"
  },
  loginSignUpSubText: {
    // width: 154,
    // height: 21,
    fontFamily: "System",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.44,
    color: "#91939b",
  },
  loginSignUpButtonText:{
    paddingTop:13,
    fontFamily: "System",
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0.32,
    textAlign:'center',
    color: "#ffffff"
  },
  phoneInputText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.34,
    color: "#383e53"
  },
  loginSignUpPlaceHolder:{
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.34,
    color: "#91939b"
  },
  loginTextFieldContainer: {
    flex: 0.3,
  },
  checkboxcontainer:{
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    // borderStyle: "solid",
    borderWidth: 0,
    borderColor: "transparent",
    width: 23
  },

});
export default Styles;
