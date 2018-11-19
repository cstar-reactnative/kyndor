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
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Styles from '@theme/Styles';
import Stores from '../stores/';
const api =  require('../api/index');
let d = Dimensions.get('window');
const { height, width } = d;

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: 'SplashScreen',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
    };
  }

  Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
    AsyncStorage.getItem('@KyndorStore:onboarding', (err, onboardingItem) => {
      if(err){
        // alert(err)
        console.log('onboarding Error: '+err)
      }
      else{
        console.log('Saved onboarding: '+onboardingItem)
        if (onboardingItem == "true") {
          // check if looged in
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
                    if(r.result.subscribed_groups[0].user_type == 'user'){
                      Stores.rootNavStore.setData('HomeNavRouter')
                    }
                    else if(r.result.subscribed_groups[0].user_type == 'group_owner'){
                      Stores.rootNavStore.setData('GroupCreatorRouter')
                    }
                  }
                  else {
                    Stores.rootNavStore.setData('Login');
                  }
                }
              })
            }
          });

        }
        else{
          Stores.rootNavStore.setData('Onboarding');
        }
      }
    });
  }

  componentDidMount(){
    var that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 2000);
  }

  render() {
    return(
      <View style={Styles.SplashScreen_RootView}>
        <StatusBar hidden />
        {/* <Image resizeMode = {"cover"} source={require('../images/Splash.png')}
          style= {{flex:1 , width: (Platform.OS==="ios")?undefined:"100%", height: (Platform.OS==="ios")?undefined:"100%"}} /> */}
          <Text>Hello World</Text>
      </View>
    )
  }

}
