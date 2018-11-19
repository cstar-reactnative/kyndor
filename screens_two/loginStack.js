import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './login.js';
import SignUp from './sign_up';
import Verify from './verify';
import Profile from './profile';

export default createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Verify: {
    screen: Verify
  },
  Profile: {
    screen: Profile
  },
});
