import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';
import IsIphoneX from './IsIphoneX';
let Window = Dimensions.get('window');
//import EStyleSheet from 'react-native-extended-stylesheet';
//EStyleSheet.build();

const Styles = StyleSheet.create({
  loginImageBackgroundStyle: {      //used in login,register and forgotPasswprd
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? (IsIphoneX() ? 40:20) : 0,
    paddingBottom: (Platform.OS === 'ios') ? (IsIphoneX() ? 20:0) : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLogoHolder: {
    width: 300,
    height: 150,            //used in login,register and forgotPasswprd
    marginTop: 30
  },
  loginContainer: {           //used in login,register and forgotPasswprd
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 40,
    paddingRight: 40,
  },
  loginTextFieldContainer: {      //used in login
    flex: 0.3,
  },
  loginButton: {                  //used in login, register and forgotPasswprd
    alignItems: 'center',
    padding: 12,
    elevation: 2,
    borderRadius: (Platform.OS === 'ios') ? 9 : 3,
    marginBottom: 20
  },
  registerButton: {                 //used in login,register and forgotPasswprd
    alignItems: 'center',
    marginTop:10
  },
  loginFacebook: {                  //used in login,register and forgotPasswprd
    flexDirection: 'row',
    backgroundColor: '#4b75a3',
    alignItems: 'center',
    padding: 12,
    elevation: 2,
    borderRadius: (Platform.OS === 'ios') ? 9 : 3,
    marginBottom: 20
  },
  goBackToLoginContainer: {       //used in forgotPassword
    flex: 0.4,
    justifyContent: 'center',
    alignContent: 'center'
  },
  emailTextFieldContainer: {    //used in forgotPassword
    flex: 0.6,
    justifyContent: 'center',
  },
  headerTextForgotPassword: {     //used in forgotPassword
    paddingTop:40,
    paddingBottom:20
  },
  checkboxcontainer:{
    borderWidth:0,
    margin: 0,
    padding: 0,
    backgroundColor:'transparent',
    width: 23
  },
  SplashScreen_RootView:{
    justifyContent: 'center',
    flex:1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
export default Styles;
