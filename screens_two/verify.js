import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  AsyncStorage,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const api =  require('../api/index');
import Styles from '@theme/StylesTwo';
import Colors from '@theme/ColorsTwo';
import Stores from '../stores/';
var DeviceInfo = require('react-native-device-info');

export default class Verify extends React.Component {
  static navigationOptions = {
    title: 'Log In',
    header: null
  };

  constructor(props){
    super(props);
    this.state= {
      codeA: '',
      codeB: '',
      codeC: '',
      codeD: '',
      codeE: ''
    };
  }

  verifyOtp(){
    let { navigation } = this.props;
    let from = navigation.getParam('from');
    let thisComp = this

    console.log('verify')
    let otp = this.state.codeA+this.state.codeB+this.state.codeC+this.state.codeD+this.state.codeE
    console.log('check otp')
    AsyncStorage.getItem('@KyndorStore:newUserPhone', (err, phoneNum) => {
      if(err){
        console.log(err)
      }
      else{

        api.verifyUser({
          phone:phoneNum,
          otp: otp
        },
        (e, r) => {
          if(e){
            alert("verifyOtp Error: "+JSON.stringify(e));
            console.log(e)
            // alert("Otp validation Error: Please try again.");
          }
          else{
            if(r.success == true){
              console.log('verifyOtp success')
              // alert("Otp validated successfully.");

              AsyncStorage.setItem('@KyndorStore:token', r.result.token);
              AsyncStorage.setItem('@KyndorStore:myName', r.result.user.name);
              // AsyncStorage.setItem('@KyndorStore:myEmail', r.result.user.email);
              AsyncStorage.setItem('@KyndorStore:myPhone', r.result.user.phone);
              AsyncStorage.setItem('@KyndorStore:userType', r.result.user.user_type);
              AsyncStorage.setItem('@KyndorStore:myId', r.result.user.user_id.toString());
              AsyncStorage.setItem('@KyndorStore:myData', JSON.stringify(r.result.user));
              if(r.result.user.profile_pic == null){
                AsyncStorage.setItem('@KyndorStore:myImage', 'no-image.png');
              }
              else{
                AsyncStorage.setItem('@KyndorStore:myImage', r.result.user.profile_pic);
              }

              if(from == 'login'){
                Stores.rootNavStore.setData('HomeNavRouter')
              }
              else if(from == 'signup'){
                thisComp.props.navigation.navigate('Profile',{
                  fname: r.result.user.first_name,
                  lname: r.result.user.last_name,
                  zip: r.result.user.zip_code.toString(),
                  from: 'signup'
                })
              }
              // Stores.rootNavStore.setData('HomeNavRouter')

            }
            else {
              console.log('verifyOtp Error');
              alert("Otp validation Error: Please try again.");
            }
            console.log(r)
          }
        })
      }
    });
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{backgroundColor: "#fff", flex:1}}>
            <TouchableOpacity
              style={{marginTop:25, marginLeft:20}}
              // onPress={() => this.logOut()}
              onPress={() => this.props.navigation.goBack()}
            >
              <MaterialIcons
                name='arrow-back'
                size={25}
                color='#262628'
              />
            </TouchableOpacity>
            <View style={{marginHorizontal:'15%'}}>
              <View style={{marginTop:40}}>
                <Text
                  multiline={true}
                  style={Styles.loginSignUpHeaderOne}>
                  Verify your mobile
                </Text>
                <Text
                  multiline={true}
                  style={[Styles.loginSignUpSubText, {marginTop:10}]}>
                  OTP has been generated and sent to your mobile number. Enter the code below to complete sign up.
                </Text>
              </View>

              <View style={{marginTop:30, flexDirection:'row'}}>

                <TextInput
                  value={this.state.codeA}
                  ref={(input) => { this.firstTextInput = input }}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, localStyles.otpText]}
                  textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  maxLength = {1}
                  blurOnSubmit={false}
                  onChangeText={(text) => {
                    this.setState({codeA:text});
                    this.secondTextInput.focus();
                  }}
                  // onSubmitEditing={() => { this.secondTextInput.focus()}}
                  // onFocus={this.onFocus}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  value={this.state.codeB}
                  ref={(input) => { this.secondTextInput = input }}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, localStyles.otpText]}
                  textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  maxLength = {1}
                  blurOnSubmit={false}
                  // onSubmitEditing={() => { this.thirdTextInput.focus()}}
                  onChangeText={(text) => {
                    this.setState({codeB:text});
                    this.thirdTextInput.focus()
                  }}
                  // onFocus={this.onFocus}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  value={this.state.codeC}
                  ref={(input) => { this.thirdTextInput = input }}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, localStyles.otpText]}
                  textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  maxLength = {1}
                  blurOnSubmit={false}
                  // onSubmitEditing={}
                  onChangeText={(text) => {
                    this.setState({codeC:text});
                    this.fourthTextInput.focus()
                  }}
                  // onFocus={this.onFocus}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  value={this.state.codeD}
                  ref={(input) => { this.fourthTextInput = input }}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, localStyles.otpText]}
                  textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  maxLength = {1}
                  blurOnSubmit={false}
                  // onSubmitEditing={}
                  onChangeText={(text) => {
                    this.setState({codeD:text});
                    this.fifthTextInput.focus()
                  }}
                  // onFocus={this.onFocus}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  value={this.state.codeE}
                  ref={(input) => { this.fifthTextInput = input }}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, localStyles.otpText]}
                  textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  maxLength = {1}
                  blurOnSubmit={false}
                  // onFocus={this.onFocus}
                  onChangeText={(text) => {
                    this.setState({codeE:text});
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                />
              </View>

              <TouchableOpacity
                style={[Styles.loginSignupButton, {marginTop:60}]}
                onPress={() => this.verifyOtp()}
              >
                <Text style={Styles.loginSignUpButtonText}>Verify Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
        );
  }
}

const localStyles = StyleSheet.create({
  normalText: {
    fontFamily: "System",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.32,
  },
  otpText: {
    fontFamily: 'System',
    fontSize:22,
    width:'15%',
    borderWidth:1,
    borderColor:'#91939b',
    marginRight:10,
    borderRadius:5,
    backgroundColor:Colors.paleGrey
  }
});
