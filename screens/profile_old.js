import {
  createStackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';

import MyProfile from './profile/myProfile.js';
import ProfileSettings from './profile/profileSettings.js';
import BusinessSettings from './profile/businessSettings.js';
import ProfileGroup from './profile/profileGrp.js';
import ProfileNotifications from './profile/profileNotifications.js';
import ChangePassword from './profile/changePassword.js';
import ProfileMain from './profile/profileMain.js';
import Preferences from './profile/preferences.js';

const ProfileApp = createStackNavigator({
  ProfileMain: { screen: ProfileMain },
  MyProfile: { screen: MyProfile },
  ProfileSettings: {screen: ProfileSettings},
  BusinessSettings: {screen: BusinessSettings},
  ProfileGroup: {screen: ProfileGroup},
  ProfileNotifications: {screen: ProfileNotifications},
  ChangePassword: {screen: ChangePassword},
  Preferences: {screen: Preferences}
});

export default class ProfileAppStack extends React.Component {
  render(){
    return(
      <ProfileApp screenProps={this.props} />
    )
  }
}

// export default ProfileApp
