import {
  createStackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';

import ProfileMain from './profileStack/ProfileMain.js';
import ProfileEdit from './profile.js';
import ProfileSettings from '../screens/profile/profileSettings.js';

export default createStackNavigator({
  ProfileMain: { screen: ProfileMain },
  ProfileEdit: { screen: ProfileEdit },
  ProfileSettings: {screen: ProfileSettings},
});
