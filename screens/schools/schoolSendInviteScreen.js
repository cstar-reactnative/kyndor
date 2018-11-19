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
import BlurbModel from '../common/blurbModal.js';
import IsIphoneX from '@theme/IsIphoneX';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

export default class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      group_id: null,
      group_name: 'School name loading ...',
      group_address:'Address loading...',
      display: Stores.chartStore.getData().schools.individual,
      blurbText: 'Loading ...'
    };
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){
    let helpTest = Stores.verbiageStore.getData().s_sendInvite
    this.setState({
      blurbText: helpTest
    })
    console.log(this.state.blurbText)
  }

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
                replace('SchoolDetailsScreen',{group_id: group_id, group_name: group_name, group_address: r.result.details.meta_data.school_address, fromHome: false});
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
    console.log('sendInvite click')
    // let { replace } = this.props.navigation;
    let group_id = this.state.group_id;
    let group_name = this.state.group_name;
    let group_address = this.state.group_address
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        loaderHandler.hideLoader();
        alert(err)
        console.log("Error1: "+err);
      }
      else{
        api.sendInviteRequest({groupId:group_id, token:tokenItem}, (e, r) => {
          loaderHandler.hideLoader();
          console.log("R: "+JSON.stringify(r))
          if(e){
            console.log("Error2: "+e);
            alert('Error connecting to server. Please try again.')
          }
          else{
            console.log("R: "+JSON.stringify(r))
            if(r.success == true){
              replace('SchoolInviteSent',{group_name: group_name, group_address: group_address});
            }
            else {
              alert('Something went wrong. Please try again')
            }
          }
        })
      }
    });
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.individual = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.individual = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    const { navigate, goBack, replace } = this.props.navigation;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        <BusyIndicator style={{zIndex: 99}}/>
        {/* <View>
          <ImageBackground source={require('../../images/schools-thread-bg.png')} style={{width: '100%', height: 230}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: Platform.OS==="ios"?IsIphoneX()?40:25:40, paddingLeft: Platform.OS==="ios"?0:15}} >
          <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
          name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
          size={Platform.OS==="ios"?40:25}
          color="#fff"
          />
          {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "white", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
          </View>
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
          <Text style={{fontFamily: "System",fontSize: 22, color: '#fff'}} >{this.state.group_name}</Text>
          <Text style={{fontFamily: "System",fontSize: 14, color: '#d2d2d2'}} >{this.state.group_address}</Text>
          </View>
            </View>
          </ImageBackground>
        </View> */}

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
                  <Text style={{fontFamily: "System",fontSize: 12, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_address}</Text>
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

        <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />
        <View style={styles.centerpart}>
          <Text style={styles.centerparthead}>Request an invitation for permission to</Text>
          <Text style={styles.centerparttext}>access this school’s network.</Text>
          <Text style={styles.centerparttext}>When a moderator has approved your</Text>
          <Text style={styles.centerpartsubtext}>request, you can start chatting</Text>
          <TouchableOpacity style={styles.sendrequest} onPress={() => this.sendInvite(replace)}>
            <Text style={{ fontFamily: "System",color: '#a02dfe', fontSize: 14 }}> SEND INVITE REQUEST </Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom:7
  },
  centerparttext:{
    fontFamily: "System",
  },
  centerpartsubtext:{
    fontFamily: "System",
  },
  sendrequest:{
    paddingTop:10
  },
  centerpart:{
  flex: 1,
  justifyContent:'center',
  alignItems:'center'
  },
  // pageStyle: {
  //   flex: 1,
  //   justifyContent:'center',
  //   alignItems:'center'
  // },
  // viewPager: {
  //   top: 130,
  //   height: 50,
  //   marginLeft: 15,
  //   marginRight: 15
  // }
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
