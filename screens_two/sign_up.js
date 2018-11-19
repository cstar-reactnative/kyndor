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
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
const api =  require('../api/index');
import Styles from '@theme/StylesTwo';
import Colors from '@theme/ColorsTwo';
import Stores from '../stores/';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import { CheckBox } from 'react-native-elements';
import RoundCheckbox from 'rn-round-checkbox';

export default class Register extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
    header: null
  };

  constructor(props){
    super(props);
    this.state= {
      code: '+1',
      phone: '',
      fname: '',
      lname:'',
      zip: 123456,
      checkedBox: false,
      loading: false
    };
  }

  signup(){
    if(this.state.checkedBox){
      this.setState({loading:true});
      let newPhone = this.state.code+this.state.phone
      api.createUser3({fname: this.state.fname, lname: this.state.lname, zip: this.state.zip, phone: newPhone}, (e, r) => {
        this.setState({loading:false});
        if(e){
          console.log("Error: "+e);
          alert('ERR211: Signup error. Please try again.')
        }
        else{
          console.log(JSON.stringify(r))
          if(r.success == true){
            console.log(JSON.stringify(r))
            AsyncStorage.setItem('@KyndorStore:newUserPhone', newPhone);
            // Stores.rootNavStore.setData('Verify')
            this.props.navigation.navigate('Verify',{
              from: 'signup'
            })
          }
          else {
            alert('Registration Failed. ',r.error);
          }
        }
      });
    }
    else{
      alert("Please accept Terms & Conditions")
    }
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{backgroundColor: "#fff", flex:1}}>
            <TouchableOpacity
              style={{marginTop:25, marginLeft:20}}
              // onPress={() => Stores.rootNavStore.setData('Login')}
              onPress={() => this.props.navigation.goBack()}
            >
              <MaterialIcons
                name='arrow-back'
                size={25}
                color='#262628'
              />
            </TouchableOpacity>

            <ActivityIndicator
              color={Colors.brandPrimary}
              animating={this.state.loading}
              size="large"
              style={{position: 'absolute', alignSelf: 'center'}}
            />

            <View style={{marginHorizontal:'15%'}}>
              <View style={{marginTop:20}}>
                <Text style={Styles.loginSignUpHeaderOne}>
                  Sign Up
                </Text>
              </View>

              <View style={{marginTop:30, flexDirection:'row',borderBottomWidth: 1, borderBottomColor:'#91939b'}}>
                <TextInput
                  // ref={this.emailRef}
                  value={this.state.code}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, {width:'15%'}]}
                  // textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  // onFocus={this.onFocus}
                  onChangeText={ (text) => {
                    this.setState({code:text})
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  // ref={this.emailRef}
                  value={''}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, {width:1,borderRightWidth: 1, borderRightColor:'#91939b', marginBottom:10, marginRight:10, marginTop:10}]}
                  // textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder=""
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  // onFocus={this.onFocus}
                  // onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                />

                <TextInput
                  // ref={this.emailRef}
                  value={this.state.phone}
                  underlineColorAndroid={'transparent'}
                  style={[Styles.phoneInputText, {width:'90%'}]}
                  // textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder="Your Phone Number"
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  // onFocus={this.onFocus}
                  onChangeText={ (text) => {
                    this.setState({phone:text})
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                />
              </View>

              <View>
                <TextField
                  // ref={this.emailRef}
                  value={this.state.fname}
                  label='First Name'
                  textColor='#383e53'
                  tintColor='#91939b'
                  baseColor='#91939b'
                  fontSize={16}
                  lineWidth={1}
                  titleFontSize={16}
                  labelFontSize={12}
                  // keyboardType='email-address'
                  autoCapitalize='words'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  // onFocus={this.onFocus}
                  onChangeText={ (text) => {
                    this.setState({fname:text})
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                  // error={errors.email}
                />

                <TextField
                  // ref={this.emailRef}
                  value={this.state.lname}
                  label='Last Name'
                  textColor='#383e53'
                  tintColor='#91939b'
                  baseColor='#91939b'
                  fontSize={16}
                  lineWidth={1}
                  titleFontSize={16}
                  labelFontSize={12}
                  // keyboardType='email-address'
                  autoCapitalize='words'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  // onFocus={this.onFocus}
                  onChangeText={ (text) => {
                    this.setState({lname:text})
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                  // error={errors.email}
                />

              </View>

              <View style={{marginLeft:0, paddingLeft:0,flexDirection:'row', marginTop:20,justifyContent:'flex-start', alignItems:'center'}} >

                <RoundCheckbox
                  size={24}
                  checked={this.state.checkedBox}
                  borderColor='#511fb2'
                  iconColor='#511fb2'
                  backgroundColor='#ece6f8'
                  onValueChange={(newValue) => {this.setState({ checkedBox: !this.state.checkedBox })}}
                />

                <Text style={{fontFamily: 'System', color: "#91939b", marginLeft:5}} >I agree to Terms of service</Text>
              </View>

              <TouchableOpacity
                style={[Styles.loginSignupButton, {marginTop:30}]}
                onPress={() => this.signup()}
              >
                <Text style={Styles.loginSignUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={{marginTop: 25, marginLeft:30, flexDirection:'row', alignContent:'center',}}>
                <Text style={[localStyles.normalText, {color:'#45455e'}]}>
                  I already have an account.
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[localStyles.normalText,{color:Colors.brandPrimary,marginLeft:2}]}
                    // onPress={() => Stores.rootNavStore.setData('Login')}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
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
  }
});
