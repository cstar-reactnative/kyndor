import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors3 from '@theme/colorsThree';
import Styles from '@theme/Styles';
import vibeRoute from './vibeRoute.js';
import schoolRoute from './schoolRoute.js';
import BusinessMain from '../screens/business';
import chatRoute from './chatRoute.js';
import Profile from '../screens/profile';
// import Profile from './profileStack.js';
// import Notifications from '../screens/notifications';
import Notifications from './notificationStack/Notification.js';
import Home from '../screens/home/home';
import { w, h } from "./common/helpers";

const AccountStackNavigation = createBottomTabNavigator(
  {
    Schools: {
      screen: schoolRoute,
      navigationOptions: {
        tabBarLabel: 'Schools',
        // tabBarIcon: ({ tintColor }) => (
        //   tintColor==Colors3.indigoBlue ?
        //   <Image source={require('../images/tab/schoolSelected.png')} style={[Styles.tabIcon]} />
        //   :
        //   <Image source={require('../images/tab/school.png')} style={[Styles.tabIcon]} />
        // ),
      }
    },
    Chat: {
      // screen: Home,
      screen:chatRoute,
      navigationOptions: {
        tabBarLabel: 'Chat',
        // tabBarIcon: ({ tintColor }) => (
        //   tintColor==Colors3.indigoBlue ?
        //   <Image source={require('../images/tab/chatselected.png')} style={[Styles.tabIcon]} />
        //   :
        //   <Image source={require('../images/tab/chat.png')} style={[Styles.tabIcon]} />
        // ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        // tabBarIcon: ({ tintColor }) => (
        //   tintColor==Colors3.indigoBlue ?
        //   <Image source={require('../images/tab/profileselected.png')} style={[Styles.tabIcon]} />
        //   :
        //   <Image source={require('../images/tab/profile.png')} style={[Styles.tabIcon]} />
        // ),
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors3.indigoBlue,
      inactiveTintColor: Colors3.blueGrey,
      labelStyle: {
        fontFamily: 'System',
        fontSize: w(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
      },
      style:{
        // marginVertical:10,
        backgroundColor:'white',
        height:65,
        paddingVertical:5,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 1
      }
    },
  }
);

export default class AccountNavigation extends React.Component {
  render() {
    return (
      <AccountStackNavigation
        // Pass these navigation props to child navigation
        // So that it's possible to navigate back to home
        screenProps={{ rootNavigation: this.props.navigation }}
      />
    );
  }
}
