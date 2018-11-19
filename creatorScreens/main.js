import React, { Component, AsyncStorage } from 'react';
import { View, Text } from 'react-native';
import { COLOR, BottomNavigation, Icon, ThemeProvider } from 'react-native-material-ui';
import Geocoder from 'react-native-geocoding';
import Profile from '../screens/profile.js';
import MyGroup from './myGroup/myGroup.js';
import Home from './home/home.js'
import Reports from './reports.js';
import Advertise from './advertise.js';
import Notifications from '../screens/notifications';
import Stores from '../stores/';
import api from '../api/index';

Geocoder.init('AIzaSyDr3xGvCgT6jEChZgG8hXus5IGFQbXmaIM'); // use a valid API key

const uiTheme = {
  palette: {
    primaryColor: '#9513fe',
  }
}

// class MyGroup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       active: 'home',
//     };
//   }
//
//   render(){
//     return(
//       <Text>
//         Your business
//       </Text>
//     )
//   }
// }

class HomeBottomStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'home',
    };
  }

  static navigationOptions = {
    title: 'HomeNav',
    header: null
  };

  componentWillMount(){
    Stores.screenStore.on('NAV_TO',(data)=>{
      this.setState({ active: data.tab })
      // alert(data.tab)
    });
  }

  updateTab(tabName){
    Stores.screenStore.setData({tab: tabName, screen: 'default'})
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}}>
          {this.renderTabScreen()}
          <BottomNavigation active={this.state.active} >
            <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"
              onPress={() => this.updateTab('home')}
            />
            <BottomNavigation.Action
              key="notifications"
              icon="notifications"
              label="Notifications"
              onPress={() => this.updateTab('notifications')}
            />
            <BottomNavigation.Action
              key="reports"
              icon="assessment"
              label="Reports"
              onPress={() => this.updateTab('reports')}
            />
            <BottomNavigation.Action
              key="advertise"
              icon="aspect-ratio"
              label="Advertise"
              onPress={() => this.updateTab('advertise')}
            />
            <BottomNavigation.Action
              key="profile"
              icon="account-circle"
              label="Profile"
              onPress={() => this.updateTab('profile')}
            />
          </BottomNavigation>
        </View>
      </ThemeProvider>
    );
  }

  renderTabScreen(){
    if(this.state.active == 'home'){
      return(
        // <MyGroup homeState={this} />
        <Home homeState={this} />
      )
    }
    else if(this.state.active == 'notifications'){
      return(
        <Notifications homeState={this} />
      )
    }
    else if(this.state.active == 'reports'){
      return(
        <Reports homeState={this}/>
      )
    }
    else if(this.state.active == 'advertise'){
      return(
        <Advertise homeState={this}/>
      )
    }
    else if(this.state.active == 'profile'){
      return(
        <Profile homeState={this} rootNav={this.props.rootNav}/>
      )
    }
  }
}

export default HomeBottomStack;
