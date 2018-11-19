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
  ViewPagerAndroid,
  Platform
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var deviceWidth = Dimensions.get('window').width;
const api =  require('../../api/index');
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

export default class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      group_id: null,
      group_name: 'Business name loading ...',
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
        loaderHandler.hideLoader();
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
                replace('B_details',{group_id:group_id,group_name:group_name,group_address:r.result.details.meta_data.school_address, fromHome: false});
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
    loaderHandler.showLoader("Requesting...");
    let group_id = this.state.group_id;
    let group_name = this.state.group_name;
    let group_address = this.state.group_address
    console.log(group_id)
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        loaderHandler.hideLoader();
        alert(err)
      }
      else{
        api.sendInviteRequest({groupId:group_id, token:tokenItem}, (e, r) => {
          loaderHandler.hideLoader();
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              replace('B_details',{group_name:this.state.group_name,group_address:this.state.group_address,group_id:this.state.group_id});
            }
            else {
              alert('Something went wrong. Please try again.');
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
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',width:'100%',paddingTop: Platform.OS==="ios"?IsIphoneX()?40:25:15,paddingBottom: 10}}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
              <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => goBack()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                    size={Platform.OS==="ios"?40:25}
                    color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  />
                  {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                </View>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} >
                <MaterialIcons
                  name='info-outline'
                  size={25}
                  color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  style={{paddingRight: 20}}
                />
              </View> */}
              <View style={styles.viewPager} initialPage={0}>
                <View style={styles.pageStyle} key="0">
                  <Text style={{fontFamily: "System",fontSize: 14, color: (Platform.OS === 'ios') ? '#000000' : '#fff',fontWeight: 'bold',fontStyle: "normal",}} >{this.state.group_name}</Text>
                  <Text style={{fontFamily: "System",fontSize: 14, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_address}</Text>
                </View>
              </View>
              <View style={{justifyContent: 'flex-end'}}></View>
            </View>
            {/* <View style={styles.viewPager} initialPage={0}>
              <View style={styles.pageStyle} key="0">
                <Text style={{fontFamily: "System",fontSize: 22, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_name}</Text>
                <Text style={{fontFamily: "System",fontSize: 14, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_address}</Text>
              </View>
            </View> */}
          </View>
        </View>
        <View style={styles.centerpart}>
          <Text style={styles.centerparthead}>You haven't joined {this.state.group_name} yet</Text>
          <Text style={styles.centerparttext}>Please join to continue.</Text>
          <TouchableOpacity style={styles.sendrequest} onPress={() => this.sendInvite(replace)}>
            <Text style={{fontFamily: "System", color: '#a02dfe', fontSize: 14, textAlign: 'center' }}> JOIN {this.state.group_name} </Text>
          </TouchableOpacity>
        </View>
        <BusyIndicator style={{zIndex: 99}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS==='ios'?'#f4f4f7':'#fff',
  },
  centerparthead:{
    fontFamily: "System",
    color:'#1d1c1c',
    fontSize:16,
    paddingBottom:7,
    textAlign: 'center'
  },
  centerparttext:{
    fontFamily: "System",
  },
  // centerpartsubtext:{
  //   fontFamily: "System",
  // },
  sendrequest:{
    paddingTop:10
  },
  centerpart:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 20
  },
  // toolbar: {
  //   backgroundColor: 'transparent',
  //   height: 60,
  //   position: 'absolute',
  //   top: 50
  // },
  pageStyle: {
    //flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  viewPager: {
    justifyContent: 'center'
    //top: -35,
    //height: 50,
    //marginLeft: 20,
  }
});