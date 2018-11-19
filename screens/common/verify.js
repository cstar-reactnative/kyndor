import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Image,
  Modal,
  AsyncStorage,
  CheckBox,
  Platform,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');
import Stores from '../../stores/'
var DeviceInfo = require('react-native-device-info');

export default class VerifyScreen extends React.Component {
  state = {
    otp: ''
  };

  static navigationOptions = {
    title: 'Verify',
    header: null
  };

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  componentDidMount(){
    console.log('componentDidMount')
  }

  resendOtp(){
    console.log('resend otp')
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{

        api.resendOtp({
          token:tokenItem,
        },
        (e, r) => {
          if(e){
            console.log("resendOtp Error: ");
            console.log(e)
            alert("Resend Otp Error: Please try again.");
          }
          else{
            if(r.success == true){
              console.log('resendOtp success')
              alert("OTP sent successfully.");
            }
            else {
              console.log('resendOtp Error');
              alert("Resend Otp Error: Please try again.");
            }
            console.log(r)
          }
        })
      }
    });
  }

  checkOtp(){
    console.log('check otp')
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{

        api.verifyOtp({
          token:tokenItem,
          otp: this.state.otp
        },
        (e, r) => {
          if(e){
            console.log("verifyOtp Error: ");
            console.log(e)
            alert("Otp validation Error: Please try again.");
          }
          else{
            if(r.success == true){
              console.log('verifyOtp success')
              // alert("Otp validated successfully.");
              Stores.rootNavStore.setData('HomeNavRouter')
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

  logDeviceOut(){
    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        alert(err)
      }
      else{
        api.removeDevice({
          token:token,
          device_id:DeviceInfo.getDeviceId()
        },
        (e, r) => {
          if(e){
            console.log("updateDeviceInfo Error: ");
            console.log(e)
          }
          else{
            if(r.success == true){
              console.log('updateDeviceInfo success')
            }
            else {
              console.log('updateDeviceInfo Error');
            }
            console.log(r)
          }
        })
      }
    });
  }

  logOut(){
    this.logDeviceOut()
    AsyncStorage.removeItem('@KyndorStore:token');
    AsyncStorage.removeItem('@KyndorStore:myName');
    AsyncStorage.removeItem('@KyndorStore:myEmail');
    AsyncStorage.removeItem('@KyndorStore:myImage');
    AsyncStorage.removeItem('@KyndorStore:myId');
    AsyncStorage.removeItem('@KyndorStore:schoolFilters');
    AsyncStorage.removeItem('@KyndorStore:businessFilter');
    Stores.filterStore.setSchoolFilters([]);
    Stores.filterStore.setBusinessFilters([]);
    Stores.groupChannelStore.setData([]);
    Stores.announcementStore.reStartDemo([])
    Stores.rootNavStore.setData('Login');
    Stores.homeTabStore.setData('school');
  }

  render(){

    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.mainView}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          {
            Platform.OS==='ios'
            ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Cancel')
                  this.logOut()
                }}>
                <Text style={{fontSize: 17,fontWeight: "normal", fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <Text style = {{
                fontFamily: "System",
                fontWeight: "600",
                fontStyle: "normal",
                textAlign: "center",
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.41,
                color: "#000"}}>
                Verify yourself
              </Text>
              <Text></Text>
            </View>
            :
            <View style={styles.navbar} >
              <TouchableOpacity
                style={{marginTop:5, marginRight: 10}}
                onPress={() => {
                  console.log('Cancel')
                  this.logOut()
                }}>
                <MaterialIcons
                  name="close"
                  size={22}
                  style={{color:'white'}}
                />
              </TouchableOpacity>
              <Text style = {styles.navText}>
                Verify yourself
              </Text>
            </View>
          }

          <View style={{flex: 1, flexDirection:'column', paddingTop:20, backgroundColor: "transparent", marginHorizontal:'20%'}}>

            {
              (Platform.OS==='android')
              ?
              <View style={{paddingHorizontal:15}}>
                <View>
                  <TextField
                    label='OTP'
                    value={this.state.otp}
                    onChangeText={ (otp) => this.setState({ otp }) }
                    textAlign= "center"
                    textColor='black'
                    tintColor='#9e9e9e'
                    baseColor='#c7c7cd'
                    fontSize={16}
                    lineWidth={1}
                    titleFontSize={12}
                    labelFontSize={12}
                  />
                </View>
              </View>
              :
              <View style={{backgroundColor: "#fff",marginTop: 15,borderTopWidth: 1,borderTopColor: "#c8c7cc",borderBottomWidth: 1,borderBottomColor: "#c8c7cc"}}>
                <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row'}}>
                  <Text style={{flex: .4, fontFamily: "System", fontSize: 17,color: "#030303",letterSpacing: -0.41,fontStyle: "normal",fontWeight: "normal"}}>OTP</Text>
                  <TextInput
                    style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "center",color: "#757575",letterSpacing: -0.41}}
                    placeholder = "OTP"
                    placeholderTextColor = "#c7c7cd"

                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='next'
                    value={this.state.otp}
                    onChangeText={ (otp) => this.setState({ otp }) }
                  />
                </View>

                <View style={{marginLeft: 10,borderBottomWidth: .5,borderBottomColor: "#c8c7cc"}}/>

              </View>
            }
            <View style={styles.buttonHolder}>
              <View style={{
                backgroundColor:'#9513fe',
                alignItems: 'center',
                padding: 12,
                elevation: 2,
                marginTop: 30,
                width: "100%",
                borderRadius: (Platform.OS==='ios')?14:3
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log('Submit')
                    this.checkOtp()
                  }}>
                  <Text style={{color:'#ffffff',fontSize: 17,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    lineHeight: 22,
                    letterSpacing: -0.41,
                    textAlign: "center"}}>
                    {(Platform.OS==='ios')?'Submit':'SUBMIT'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{
                alignItems: 'center',
                padding: 12,
                //elevation: 2,
                marginTop: 30,
                width: "100%",
                //borderRadius: 3
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.resendOtp()
                  }}>
                  <Text style={{
                    color:'#9513fe',fontSize: 17,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 22,
                    letterSpacing: -0.41,
                    textAlign: "center"
                  }}>
                  {(Platform.OS==='ios')?'Resend OTP':'RESEND OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  buttonHolder: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#ffffff',
  },
  navText: {
    fontFamily: "System",
    color: '#ffffff',
    fontSize: 17,
    paddingTop:5,
    height: 40,
    flex: 2,
  },
  navbar: {
    backgroundColor: '#484b89',
    height: 55,
    padding: 15,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
});
