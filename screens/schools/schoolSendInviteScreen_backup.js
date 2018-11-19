import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  ToolbarAndroid,
  Image,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  ViewPagerAndroid
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var deviceWidth = Dimensions.get('window').width;
const api =  require('../../api/index');
import Stores from '../../stores/'

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

export default class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      group_id: null,
      group_name: 'School name loading ...',
      group_address:'Address loading...'
    };
  }
  static navigationOptions = {
    title: '',
    header: null
  };
  componentDidMount(){
    loaderHandler.showLoader("Loading...");
    const { params } = this.props.navigation.state;
    const { replace } = this.props.navigation;
    const group_id = params ? params.group_id : 0;
    let group_name = params ? params.group_name : 'School name';
    let group_address = params ? params.group_address : 'School Address'
    this.setState({group_name: group_name});
    this.setState({group_address: group_address});

    Stores.groupStore.setData(null);
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        api.getGroupInfo({group_id: group_id, token: tokenItem}, (e, r) => {
          loaderHandler.hideLoader();
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              if(r.result.details.subscriptionstate == 0){
                Stores.groupStore.setData(r.result.details);
                replace('SchoolInviteSent',{group_name: group_name,group_address:r.result.details.meta_data.school_address});
              }
              else if(r.result.details.subscriptionstate == 1){
                Stores.groupStore.setData(r.result.details);
                replace('SchoolDetailsScreen',{group_id: group_id, group_name: group_name, group_address: r.result.details.meta_data.school_address});
              }
              else{
                this.setState({group_id: group_id})
              }
            }
            else {
              alert('Connection Failed!');
            }
          }
        })
      }
    });
  }
  sendInvite(replace){
    // let { replace } = this.props.navigation;
    let group_id = this.state.group_id;
    let group_name = this.state.group_name;
    let group_address = this.state.group_address
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        api.sendInviteRequest({groupId:group_id, token:tokenItem}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              replace('SchoolInviteSent',{group_name: group_name, group_address: group_address});
            }
            else {
              alert('Connection Failed!');
            }
          }
        })
      }
    });
  }
  render(){
    const { navigate, goBack, replace } = this.props.navigation;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" translucent={true} barStyle="light-content" />
        <BusyIndicator style={{zIndex: 99}}/>
        <View>
          <ImageBackground source={require('../../images/schools-thread-bg.png')} style={{width: '100%', height: 255}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: 50, paddingLeft: 15}} >
              <TouchableOpacity style={{justifyContent: 'flex-start'}} >
                <MaterialIcons
                  name='arrow-back'
                  size={25}
                  color='#fff'
                  onPress={() => goBack()}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} >
                  <MaterialIcons
                    name='info-outline'
                    size={25}
                    color='#fff'
                    style={{paddingRight: 20}}
                  />
              </View>
            </View>
            <View style={styles.viewPager} initialPage={0}>
                <View style={styles.pageStyle} key="0">
                  <Text style={{fontSize: 22, color: '#fff'}} >{this.state.group_name}</Text>
                  <Text style={{fontSize: 14, color: '#d2d2d2'}} >{this.state.group_address}</Text>
                </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.centerpart}>
          <Text style={styles.centerparthead}>You have not yet been invited to this group.</Text>
          <Text style={styles.centerparttext}> To start a conversation, you must </Text>
          <Text style={styles.centerparttext}>send an invitation request.</Text>
          <Text style={styles.centerpartsubtext}> When the admin has invited you to this </Text>
          <Text style={styles.centerparttext}>group, you can start chatting.</Text>
          <TouchableOpacity style={styles.sendrequest} onPress={() => this.sendInvite(replace)}>
            <Text style={{ color: '#a02dfe', fontSize: 14 }}> SEND INVITE REQUEST </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerparthead:{
    color:'#1d1c1c',
    fontSize:16,
    paddingBottom:7
  },
  centerparttext:{

  },
  centerpartsubtext:{

  },
  sendrequest:{
    paddingTop:10
  },
  centerpart:{
  flex: 1,
  justifyContent:'center',
  alignItems:'center'
  },
  toolbar: {
   backgroundColor: 'transparent',
   height: 60,
   position: 'absolute',
   top: 50
  },
  pageStyle: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  viewPager: {
    top: 150,
    height: 50,
    marginLeft: 15,
    marginRight: 15
  }
});
