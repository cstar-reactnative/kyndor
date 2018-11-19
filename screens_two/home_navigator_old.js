import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors3 from '@theme/colorsThree';
import Styles from '@theme/Styles';
import vibeRoute from './vibeRoute.js';
import schoolRoute from './schoolRoute.js';
import chatRoute from './chatRoute.js';
import Profile from '../screens/profile';
import Notifications from '../screens/notifications';
import Home from '../screens/home/home';

const AccountStackNavigation = createBottomTabNavigator(
  {
    Vibes: {
      screen: vibeRoute,
      navigationOptions: {
        tabBarLabel: 'Vibes',
        tabBarIcon: ({ tintColor }) => (
          tintColor==Colors3.indigoBlue ?
          <Image source={require('../images/tab/vibesSelected.png')} style={[Styles.tabIcon]} />
          :
          <Image source={require('../images/tab/vibes.png')} style={[Styles.tabIcon]} />
        ),
      }
    },
    Schools: {
      screen: schoolRoute,
      navigationOptions: {
        tabBarLabel: 'Schools',
        tabBarIcon: ({ tintColor }) => (
          tintColor==Colors3.indigoBlue ?
          <Image source={require('../images/tab/schoolSelected.png')} style={[Styles.tabIcon]} />
          :
          <Image source={require('../images/tab/school.png')} style={[Styles.tabIcon]} />
        ),
      }
    },
    Chat: {
      // screen: Home,
      screen:chatRoute,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor }) => (
          tintColor==Colors3.indigoBlue ?
          <Image source={require('../images/tab/chatselected.png')} style={[Styles.tabIcon]} />
          :
          <Image source={require('../images/tab/chat.png')} style={[Styles.tabIcon]} />
        ),
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ tintColor }) => (
          tintColor==Colors3.indigoBlue ?
          <Image source={require('../images/tab/notificationsselected.png')} style={[Styles.tabIcon]} />
          :
          <Image source={require('../images/tab/notifications.png')} style={[Styles.tabIcon]} />
        ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          tintColor==Colors3.indigoBlue ?
          <Image source={require('../images/tab/profileselected.png')} style={[Styles.tabIcon]} />
          :
          <Image source={require('../images/tab/profile.png')} style={[Styles.tabIcon]} />
        ),
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors3.indigoBlue,
      inactiveTintColor: Colors3.blueGrey,
      labelStyle: {
        fontFamily: 'System',
        fontSize: 11,
      },
      style:{
        // marginVertical:10,
        backgroundColor:'white',
        height:65,
        paddingVertical:5
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
