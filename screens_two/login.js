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
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
const api =  require('../api/index');
import Styles from '@theme/StylesTwo';
import Colors from '@theme/ColorsTwo';
import Stores from '../stores/';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Log In',
    header: null
  };

  constructor(props){
    super(props);
    this.state= {
      code: '+1',
      loading: false,
      phone:''
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log('Token Error: '+err)
        Stores.rootNavStore.setData('Login');
      }
      else{
        console.log('Saved Token: '+tokenItem)
        api.myProfile(tokenItem, (e, r) => {
          console.log('myProfile API:')
          console.log('e: '+e)
          console.log('r: '+r)
          if(e){
            Stores.rootNavStore.setData('Login');
          }
          else{
            console.log(JSON.stringify(r))
            if(r.success){
              Stores.rootNavStore.setData('HomeNavRouter')
            }
            else {
              Stores.rootNavStore.setData('Login');
            }
          }
        })
      }
    });
  }

  signin(){
    console.log('Calling Login2 API')
    this.setState({loading: true})
    let thisComp = this;
    let phonenumber = this.state.code+this.state.phone
    api.login2({phone: phonenumber}, (e, r) => {
      this.setState({loading: false})
      if(e){
        console.log("Error: "+e);
        alert('ER111: Something went wrong. Please try again.')
      }
      else{
        if(r.success == true){
          console.log(JSON.stringify(r))
          if(r.result.registered){
            AsyncStorage.setItem('@KyndorStore:newUserPhone', phonenumber);
            // Stores.rootNavStore.setData('Verify')
            this.props.navigation.navigate('Verify', {
              from: 'login'
            })
          }
          else{
            alert('Phone number not registered. Please register to continue.')
          }
        }
        else {
          alert(r.error);
        }
      }
    });
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{backgroundColor: "#fff", flex:1}}>
            <View style={{marginHorizontal:'15%', marginTop:'5%'}}>

              <ActivityIndicator
                color={Colors.brandPrimary}
                animating={this.state.loading}
                size="large"
                style={{position: 'absolute', marginTop:'50%', alignSelf: 'center'}}
              />

              <View style={Styles.brandHolder}>
                <Image source={require('../images/kyndorlogowhite.png')} style={{width: 180, height: 57}} />
              </View>

              <View style={{marginTop:40}}>
                <Text style={Styles.loginSignUpHeaderOne}>
                  Log In
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
                  editable={false}
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
                  style={[Styles.phoneInputText, {width:'80%'}]}
                  // textAlign={'center'}
                  selectionColor={'#fff'}
                  placeholder="Your Phone Number"
                  placeholderTextColor={Colors.placeHolder}
                  keyboardType='phone-pad'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  // onFocus={this.onFocus}
                  onChangeText={ (text) => {
                    this.setState({phone:text})
                  }}
                  // onSubmitEditing={this.onSubmitEmail}
                  // onChange={this.handleEmailChange}
                />
              </View>

              <TouchableOpacity
                style={[Styles.loginSignupButton, {marginTop:60}]}
                onPress={() => this.signin()}
              >
                <Text style={Styles.loginSignUpButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={{marginTop: 25, marginLeft:30, flexDirection:'row', alignContent:'center',}}>
                <Text style={[localStyles.normalText, {color:'#45455e'}]}>
                  Don't have an account?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[localStyles.normalText,{color:Colors.brandPrimary,marginLeft:2}]}
                    // onPress={() => Stores.rootNavStore.setData('Register')}
                    onPress = {() => this.props.navigation.navigate('SignUp')}
                    // onPress = {() => this.props.navigation.navigate('Profile')}
                  >
                    Sign Up
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
