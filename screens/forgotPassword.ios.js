import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  Alert,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
const api = require('../api/index');
import Styles from '@theme/Styles';
import Colors from '@theme/Colors';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import Stores from '../stores/';

export default class ForgotPassword extends React.Component {
  static navigationOptions = {
    title: 'ForgotPassword',
    header: null
  };

  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.emailRef = this.updateRef.bind(this, 'email');
    this.codeRef = this.updateRef.bind(this, 'code');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.state = {
      email: '',
      code: '',
      password: '',
      showcomp: false
    }
  }

  onFocus() {
    let {
      errors = {}
    } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['email', 'code', 'password'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
      if (ref.isFocused()) {
        this.setState({[name]: text});
      }
    });
  }

  onSubmit() {
    let errors = {};
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // ['email'].forEach((name) => {
    //   let value = this[name].value();
    //
    //   if (!value) {
    //     errors[name] = 'Should not be empty';
    //   } else if (reg.test(value) === false) {
    //     errors[name] = 'Email is Not Correct';
    //   } else {
         this.fetchAPI();
    //   }
    // });

    this.setState({errors});
  }

  onSubmitReset() {
    let errors = {};
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let code = new RegExp('^[0-9]+$');
    // ['email'].forEach((name) => {
    //   let value = this[name].value();
    //
    //   if (!value) {
    //     errors[name] = 'Should not be empty';
    //   } else if ('email' === name && reg.test(value) === false) {
    //     errors[name] = 'Email is Not Correct';
    //   } else if ('code' === name && reg.code(value) === false && value.length < 4) {
    //     errors[name] = 'Invalid code';
    //   } else if ('password' === name && value.length < 6) {
    //     errors[name] = 'Password is Not Correct';
    //   } else {
         this.fetchAPIReset();
    //   }
    // });

    this.setState({errors});
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onPress = () => {
    this.onSubmit();
  }
  onPresschngPwd = () => {
    this.onSubmitReset();
  }
  haveCode = () => {
    this.setState({showcomp: true});
  }
  haveNoCode = () => {
    this.setState({showcomp: false});
  }

  fetchAPI = () => {
    api.forgotPassWord(this.state.email, (e, r) => {
      if (e) {
        alert("Error: " + e);
      } else {
        if (r.success == true) {
          Alert.alert('Success: ', r.result.message);
          this.setState({showcomp: true})
        } else {
          Alert.alert('Error: ', r.error);
        }
      }
    });
  }

  fetchAPIReset = () => {
    loaderHandler.showLoader("Loading...");
    api.resetPassword({
      email: this.state.email,
      code: this.state.code,
      password: this.state.password
    }, (e, r) => {
      loaderHandler.hideLoader();
      if (e) {
        alert("Error: " + e);
      } else {
        if (r.success == true) {
          Alert.alert('Success: ', r.result.message);
          // this.props.navigation.navigate('Login');
          Stores.rootNavStore.setData('Login');

        } else {
          Alert.alert('Error: ', r.error);
        }
      }
    });
  }

  render() {
    // const { navigate, goBack } = this.props.navigation;
    let {
      errors = {},
      ...data
    } = this.state;
    const {email, code, password} = this.state;
    const enabled = code.length > 3 && password.length > 3;

    return (
      <ImageBackground style={Styles.loginImageBackgroundStyle} source={require('../images/background.png')}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={Styles.loginContainer}>
            <StatusBar backgroundColor={Colors.statusBarBackground} translucent={false} barStyle="light-content"/>
            <BusyIndicator style={{
              zIndex: 99
            }}/>
            <View style={{
              flex: 0.27,
              justifyContent: 'center', alignContent: 'center', alignItems: 'center'
            }}>
              <View style={Styles.loginLogoHolder}>
                <Image source={require('../images/kyndorlogo.png')} style={{width: 300, height: 95}}/>
            </View>
          </View>
          <View style={{
            flex: 0.72
          }}>
            <View style={[
              Styles.headerTextForgotPassword, {
                display: (
                  !this.state.showcomp
                    ? 'flex'
                    : 'none')
              }
            ]}>
              <Text style={{
                fontFamily: "System",
                color: '#c9c8d9',
                fontSize: 15,
                lineHeight: 22
              }}>Please enter your email. We will send instructions to reset your password on that email</Text>
            </View>
            <View style={[
              Styles.headerTextForgotPassword, {
                display: (
                  !this.state.showcomp
                    ? 'none'
                    : 'flex')
              }
            ]}>
              <Text style={{
                fontFamily: "System",
                color: '#c9c8d9',
                fontSize: 15,
                lineHeight: 22
              }}>Please enter code and password
              </Text>
            </View>

            <View style={Styles.emailTextFieldContainer}>
              <View style={{
                display: (
                  !this.state.showcomp
                    ? 'flex'
                    : 'none')
              }}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.emailRef}
                  value={this.state.email}
                  label='Email'
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize={15}
                  titleFontSize={12}
                  labelFontSize={12}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                error={errors.email}/> */}
                <View style={{ padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.emailRef}
                    value={this.state.email}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Email"
                    placeholderTextColor='#a3a5c4'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                  />
                </View>
              </View>
              <View style={{
                marginTop: 20,
                display: (
                  !this.state.showcomp
                    ? 'none'
                    : 'flex')
              }}>

                {/* <TextField
                  lineWidth={1}
                  ref={this.codeRef}
                  value={this.state.code}
                  label='Code'
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize={15}
                  titleFontSize={12}
                  labelFontSize={12}
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                error={errors.code}/> */}
                <View style={{ padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.codeRef}
                    value={this.state.code}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Code"
                    placeholderTextColor='#a3a5c4'
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                  />
                </View>
              </View>
              <View style={{marginTop: 15,
                display: (
                  !this.state.showcomp
                    ? 'none'
                    : 'flex')
              }}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.passwordRef}
                  value={this.state.password}
                  label='New Password'
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize={15}
                  secureTextEntry
                  titleFontSize={12}
                  labelFontSize={12}
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                error={errors.password}/> */}
                <View style={{ padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.passwordRef}
                    value={this.state.password}
                    secureTextEntry
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="New Password"
                    placeholderTextColor='#a3a5c4'
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                  />
                </View>
              </View>

              <TouchableOpacity disabled={!this.state.email} style={[
                Styles.loginButton, {
                  display: (
                    !this.state.showcomp
                      ? 'flex'
                      : 'none')
                }, {
                  marginTop: 25,
                  backgroundColor: (
                    !this.state.email
                      ? '#60678a7a'
                      : '#dad4d4')
                }
              ]} onPress={this.onPress}>
                <Text style={{
                  fontFamily: "System",
                  color: '#474a82',
                  fontSize: 16,
                  fontWeight: "500"
                }}>
                  SEND EMAIL
                </Text>
              </TouchableOpacity>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 12
              }}>
                <TouchableOpacity style={{
                  display: (
                    !this.state.showcomp
                      ? 'flex'
                      : 'none')
                }} onPress={this.haveCode}>
                  <Text style={{
                    fontFamily: "System",
                    color: '#e0dbdb',
                    fontSize: 14,
                    fontWeight: "500"
                  }}>Already have code ?
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                disabled={!enabled}
                style={{
                  alignItems: 'center',
                  padding: 12,
                  elevation: 2,
                  borderRadius: 9,
                  display: (
                    !this.state.showcomp
                      ? 'none'
                      : 'flex'),
                  marginTop: 10,
                  backgroundColor: (
                    !enabled
                      ? '#60678a7a'
                      : '#dad4d4')

                }}
                onPress={this.onPresschngPwd}>
                <Text style={{
                  fontFamily: "System",
                  color: '#474a82',
                  fontSize: 16,
                  fontWeight: "500"
                }}>
                  SUBMIT
                </Text>
              </TouchableOpacity>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                //marginTop: 10,
                marginBottom: 15,
              }}>
                <TouchableOpacity style={{
                  display: (
                    !this.state.showcomp
                      ? 'none'
                      : 'flex')
                }} onPress={this.haveNoCode}>
                  <Text style={{
                    fontFamily: "System",
                    color: '#e0dbdb',
                    fontSize: 14,
                    padding: 15,
                    fontWeight: "500"
                  }}>Have no code ?
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={Styles.goBackToLoginContainer}>
              <TouchableHighlight style={Styles.registerButton}
                // onPress={() =>goBack()}
                onPress={() => Stores.rootNavStore.setData('Login')} underlayColor={'transparent'}>
                <Text style={{
                  fontFamily: "System",
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: "500"
                }}>
                  GO BACK TO LOGIN
                </Text>
              </TouchableHighlight>
            </View>

          </View>

        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>);
  }
}

//const styles = StyleSheet.create({
// logoHolder: {
//   marginTop: 30
// },
// imageBackgroundStyle: {
//   flex: 1,
//   paddingTop: (Platform.OS === 'ios') ? 20 : 0
// },
// container: {
//   flex: 1,
//   backgroundColor: 'transparent',
//   paddingLeft: 50,
//   paddingRight: 50
// },
// goBackContainer: {
//   flex: 0.4,
//   justifyContent: 'center',
//   alignContent: 'center'
// },
// textFieldContainer: {
//   flex: 0.6,
//   justifyContent: 'center',
// },
// subButton: {
//   alignItems: 'center',
//   marginTop: 25,
//
//   padding: 12,
//   elevation: 2,
//   borderRadius: 3
// },
// goBackButton: {
//   alignItems: 'center',
//
// },
// headerText:{
//   paddingTop:40,
//   paddingBottom:20
// },
//});
