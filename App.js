import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import ForgotPassword from './screens/forgotPassword';
import Home from './screens/home/home';
import WebPage from './screens/web';
// import HomeNavRouter from './screens/homeNavRouter';
import HomeNavRouter from './screens_two/home_navigator.js';
import B_details from './screens/business/b_details.js';
import One2One from './screens/one2one.js';
import Stores from './stores/'
import GroupCreatorRouter from './creatorScreens/main.js'
// import Login from './screens/login';
import Login from './screens_two/login';
// import Verify from './screens/common/verify.js';
import Verify from './screens_two/verify.js';
// import Register from './screens/register';
import Register from './screens_two/sign_up.js';
import Profile from './screens_two/profile.js';
import LoginStack from './screens_two/loginStack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Login',
      d_info: {},
      onboard: "",
    };
  }

  static navigationOptions = {
    title: 'Kyndor',
    header: null
  };

  componentWillMount(){
    Stores.verbiageStore.updateData()
    Stores.rootNavStore.on('ROOT_NAV',(data)=>{
      this.setState({ active: data })
      // alert(data.tab)

    });
    this.renderNext();
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // this.notificationListener.remove();
  }

  renderNext(){
    //var that = this;
    // AsyncStorage.getItem('@KyndorStore:onboarding', (err, onboardingItem) => {
    //   if(err){
    //     // alert(err)
    //     console.log('onboarding Error: '+err)
    //   }
    //   else{
    //     console.log('Saved onboarding app: '+onboardingItem)
    //     this.setState({onboard:onboardingItem})
    //   }
    // });
  }

  render() {
    return (this.renderScreen())
    // return <Profile />
  }

  renderScreen(){
    var that = this;
    if(this.state.active == 'SplashScreen'){
      // if (Platform.OS === 'ios'){
      //   //return(this.renderNext())
      //   if (that.state.onboard == "true") {
      //     return <Login />
      //   }else{
      //     return <Onboarding />
      //   }
      // }
      // else{
      //   return <SplashScreen />
      // }

      return <SplashScreen />

    }
    else if(this.state.active == 'Onboarding'){
      return(
        <Onboarding />
      )
    }
    else if(this.state.active == 'Login'){
      return(
        // <Login />
        <LoginStack/>
      )
    }
    else if(this.state.active == 'HomeNavRouter'){
      return(
        <HomeNavRouter />
      )
    }
    // else if(this.state.active == 'Register'){
    //   return(
    //     <Register />
    //   )
    // }
    // else if(this.state.active == 'ForgotPassword'){
    //   return(
    //     <ForgotPassword />
    //   )
    // }
    else if(this.state.active == 'WebPage'){
      return(
        <WebPage />
      )
    }
    else if(this.state.active == 'GroupCreatorRouter'){
      return(
        <GroupCreatorRouter />
      )
    }
    // else if(this.state.active == 'Verify'){
    //   return(
    //     <Verify />
    //   )
    // }
  }

}
