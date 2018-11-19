import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from 'react-native';
import Styles from '@theme/Styles';
import Stores from '../stores/';

export default class Onboarding extends React.Component {
  static navigationOptions = {
    title: 'Onboarding',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // componentDidMount(){
  //   var that = this;
  //   setTimeout(function(){
  //     that.Hide_Splash_Screen();
  //   }, 2000);
  // }

  render() {
    return(
      <View style={[Styles.SplashScreen_RootView,{backgroundColor: '#ffffff', flex:1}]}>
        {/* <Image source={require('../images/onboarding.png')}
          style={{flex: 1, width:null, height: null, resizeMode: 'contain'}} /> */}
          <Image source={require('../images/onboarding.png')} style={{flex: 1, width:'100%', height: '100%', resizeMode: 'contain'}} />

        <View style={{ paddingLeft: 80, paddingRight: 80, flex: 0.2, width: '100%', justifyContent: 'center', marginBottom: 45, alignItems: 'center', bottom: 0, position: 'absolute' }} >

          <TouchableHighlight
            underlayColor={'transparent'}
            style={{width: '100%', alignItems: 'center', padding: 12, elevation: 2, borderRadius: 25, backgroundColor: '#511fb2'}}
            onPress={() =>{
              AsyncStorage.setItem('@KyndorStore:onboarding', "true");
              Stores.rootNavStore.setData('Login');
            }
            }>
            <Text style={{ fontFamily: "System", color: '#ffffff', fontSize: 15, fontWeight: '600', letterSpacing: 0.32, fontStyle: "normal" }}> Get Started </Text>
          </TouchableHighlight>

        </View>
      </View>
    )
  }

}
