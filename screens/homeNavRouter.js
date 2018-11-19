import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, SafeAreaView, AppState, AsyncStorage } from 'react-native';
import { COLOR, BottomNavigation, Icon, ThemeProvider } from 'react-native-material-ui';
import Geocoder from 'react-native-geocoding';
import Home from './home/home';
import Notifications from './notifications';
import BusinessMain from './business';
import Profile from './profile';
import Schools from './school';
import SingleChat from './chat/singleChat.js';
import Stores from '../stores/';
import IsIphoneX from '@theme/IsIphoneX';
import Colors2 from '@theme/ColorsTwo';

Geocoder.init('AIzaSyDr3xGvCgT6jEChZgG8hXus5IGFQbXmaIM'); // use a valid API key

const uiTheme = {
  palette: {
    primaryColor: Colors2.brandPrimary,
    canvasColor: (Platform.OS === 'ios') ? '#efeff9' : '#fff',
    borderColor: (Platform.OS === 'ios') ? '#efeff9' : '#fff'
  }
}

// let d = Dimensions.get('window');
//   const { height, width } = d;

class HomeBottomStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'home',
      promptVisible: false,
      zipCode: '0',
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});

    AsyncStorage.getItem('Kyndor:lastNotification').then(data=>{
      if(data){
        Stores.announcementStore.setData([])
        // if notification arrives when app is killed, it should still be logged here
        let notif = JSON.parse(data)
        console.log('last notification', JSON.parse(data));

        if(notif.targetScreen === 'requests'){
          setTimeout(()=>{
            AsyncStorage.removeItem('Kyndor:lastNotification');
            console.log(`from push notification\n${JSON.stringify(notif)}`)
            Stores.screenStore.setData({tab: 'notifications', screen: 'default'})
          }, 500)
        }
        else if(notif.targetScreen === 'chat'){
          setTimeout(()=>{
            var moreData = JSON.parse(notif.more)
            console.log('from push notification navigating chat from home ... ')
            Stores.screenStore.setData({tab: 'home', screen: 'default'})
          }, 500)
        }

      }
      else{

      }
    })
  }

  static navigationOptions = {
    title: 'HomeNav',
    header: null
  };

  getMyCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              var theZip = json.results[0].address_components[json.results[0].address_components.length - 1].long_name;
              // alert(theZip);
              Stores.locationStore.setData(position.coords.latitude, position.coords.longitude, theZip)
            })
            .catch(error => alert(error));
      },
      (error) => {
        // this.setState({ promptVisible: true })
      },
      // { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      {timeout: 15000, enableHighAccuracy: false}
    );
  }

  componentWillMount(){
    Stores.screenStore.on('NAV_TO',(data)=>{
      this.setState({ active: data.tab })
      // alert(data.tab)
    });
    this.getMyCurrentLocation()
  }

  updateTab(tabName){
    Stores.screenStore.setData({tab: tabName, screen: 'default'})
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff'}}> */}
        <View style={{flex: 1, backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff', paddingBottom: IsIphoneX() ? 35:0}}>
          {this.renderTabScreen()}
          <BottomNavigation active={this.state.active} >
            <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"
              onPress={() => this.updateTab('home')}
            />
            {/* <BottomNavigation.Action
              key="notifications"
              icon="notifications"
              label="Notifications"
              onPress={() => this.updateTab('notifications')}
            />
            <BottomNavigation.Action
              key="school"
              icon="school"
              label="School"
              onPress={() => this.updateTab('school')}
            /> */}
            <BottomNavigation.Action
              key="business"
              icon="business"
              label="Business"
              onPress={() => this.updateTab('business')}
            />
            <BottomNavigation.Action
              key="profile"
              icon="account-circle"
              label="Profile"
              onPress={() => this.updateTab('profile')}
            />
          </BottomNavigation>
        </View>
        {/* </SafeAreaView> */}
      </ThemeProvider>
    );
  }

  renderTabScreen(){
    if(this.state.active == 'home'){
      return(
        <Home homeState={this} />
      )
    }
    else if(this.state.active == 'notifications'){
      return(
        <Notifications homeState={this} />
      )
    }
    else if(this.state.active == 'school'){
      return(
        <Schools homeState={this}/>
      )
    }
    else if(this.state.active == 'business'){
      return(
        <BusinessMain homeState={this} />
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
