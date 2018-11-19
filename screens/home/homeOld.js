import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  Platform,
  AsyncStorage,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import { TabNavigator, createStackNavigator } from 'react-navigation';
import Business from './businessTab';
import OneOnOneChats from './1on1';
import Interactable from 'react-native-interactable';
import { Card } from 'react-native-elements';
import SchoolsHome from './schoolsTab';
import SingleChat from '../chat/singleChat.js';
import RequestGrade from '../chat/requestGrade.js'
import ChannelInfo from '../chat/ChannelInfo.js';
import ChatInvite from '../chat/chat_invite.js'
const api =  require('../../api/index');
import Stores from '../../stores/';
import RequestSent from '../chat/request_sent.js';
import IsIphoneX from '@theme/IsIphoneX';
var DeviceInfo = require('react-native-device-info');
import FCM from 'react-native-fcm';
import Colors2 from '@theme/ColorsTwo';
import { registerKilledListener, registerAppListener } from "../common/push_listeners";
registerKilledListener();

const height = Dimensions.get('window').height;

class Home extends React.Component {
  static navigationOptions = {
    title: 'School map view',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // allData:[],
      modalVisible: false,
      active: Stores.homeTabStore.getData(),
      announcement_text: 'loading..',
      announcement_title: 'loading..',
      d_info: {}
    }
    this._deltaY = new Animated.Value(0);
  }

  updateDeviceInfo(fcm){
    var thisComp = this
    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        alert(err)
      }
      else{
        api.updateDevice({
          token:token,
          fcm:fcm,
          d_info: thisComp.state.d_info
        },
        (e, r) => {
          if(e){
            console.log("updateDeviceInfo Error: ");
            console.log(e)
          }
          else{
            if(r.success == true){
              console.log('updateDeviceInfo success')
            }
            else {
              console.log('updateDeviceInfo Error');
            }
            console.log(r)
          }
        })
      }
    });
  }

  async registerFCM() {
    try {
      await FCM.requestPermissions({ badge: true, sound: true, alert: true });
      const token = await FCM.getFCMToken();
      console.log('getFCMToken token: '+token)
      this.updateDeviceInfo(token)
    }
    catch(e) {
      console.log('token error: '+e)
    }
    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN: ", token);
      });
    }
  }

  componentWillMount(){

    let myAnnouncement = Stores.announcementStore.getData()
    if(myAnnouncement.length > 0){
      this.setState({modalVisible: true})
    }

    console.log('UniqueID: '+DeviceInfo.getUniqueID())
    console.log('getInstanceID: '+DeviceInfo.getInstanceID())
    console.log('DeviceID: '+DeviceInfo.getDeviceId())
    // alert('DeviceId: '+DeviceInfo.getDeviceId()+'     ||     UniqueID: '+DeviceInfo.getUniqueID())

    this.setState({
      d_info: {
        device_id: DeviceInfo.getDeviceId(),
        brand: DeviceInfo.getBrand(),
        carrier: DeviceInfo.getCarrier(),
        country: DeviceInfo.getDeviceCountry(),
        device_name: DeviceInfo.getDeviceName(),
        app_first_installed: DeviceInfo.getFirstInstallTime(),
        manufacturer: DeviceInfo.getManufacturer(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        timeZone: DeviceInfo.getTimezone(),
        unique_id: DeviceInfo.getUniqueID(),
        app_version: DeviceInfo.getVersion(),
        isEmulator: DeviceInfo.isEmulator(),
        isTablet: DeviceInfo.isTablet()
      }
    })
    Stores.deviceInfo.setData(this.state.d_info)

    this.registerFCM();
  }

  closeAnnouncement() {
    Stores.announcementStore.setData([])
    this.setState({modalVisible: false})
  }

  componentDidMount(){
    const { navigate } = this.props.navigation;
    FCM.setBadgeNumber(0);
    registerAppListener(this.props.navigation);

    // Stores.groupChannelStore.updateData();
    Stores.unreadCountStore.updateData();
    Stores.chatStore.updateData()
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        api.privateChannel({token: item}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              // this.setState({allData : r.result});
              Stores.privateChannelStore.setData(r.result);
            }
            else {
              //this.props.navToChat.navigate('RequestSent',{room:a.channel_id});
              // alert('Failed!');
            }
          }
        })
      }
    });

    Stores.homeTabStore.on('ActiveHomeTab',(term)=>{
      this.setState({active:term})
    });

    AsyncStorage.getItem('Kyndor:lastNotification').then(data=>{
      if(data){
        Stores.announcementStore.setData([])
        // if notification arrives when app is killed, it should still be logged here
        let notif = JSON.parse(data)
        console.log('last notification', JSON.parse(data));
        if(notif.targetScreen === 'chat'){
          setTimeout(()=>{
            var moreData = JSON.parse(notif.more)
            console.log('from push notification navigating chat from home ... ')
            AsyncStorage.removeItem('Kyndor:lastNotification');
            navigate('SingleChat',{
              groupId:moreData.groupId,
              channelId:moreData.channelId,
              isGroup:moreData.isGroup,
              channelName:moreData.channelName,
              groupName:moreData.groupName
            });
          }, 500)
        }
      }
      else{

      }
    })

  }

  componentWillUnMount(){
    Stores.homeTabStore.removeListener('ActiveHomeTab');
  }

  render(){
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible = {this.state.modalVisible}
          onRequestClose = {() => {this.closeAnnouncement()}}>
          <View style={styles.modalContainer}>
            <View style={styles.modal} >
              <Image
                source={require('../../images/announce-dialog.png')}
                style={{height: 230,width: 335, borderTopLeftRadius: (Platform.OS === 'ios') ? 14 : 0, borderTopRightRadius: (Platform.OS === 'ios') ? 14 : 0}}
              />
              <View style={{paddingHorizontal: (Platform.OS==='ios')?0:20}}>
                <Text style={{fontFamily: "System", fontSize: (Platform.OS === 'ios') ? 22 : 26, color: '#000', marginLeft: 15, marginRight: 15, marginTop: (Platform.OS === 'ios') ? 20 : 10, marginBottom: (Platform.OS === 'ios') ? 5 : 0, textAlign: 'center', fontWeight: (Platform.OS === 'ios') ? '700' : 'normal'}}>Welcome To Kyndor</Text>
                  <Text style={{fontFamily: "System", fontSize: 18, marginLeft: (Platform.OS === 'ios') ?15:0, marginRight: (Platform.OS === 'ios') ?15:0, marginBottom: (Platform.OS === 'ios') ?20:0, textAlign: 'center'}}>
                    We’re a different kind of community with a mission to connect families at the school level.
                  </Text>
                  {(Platform.OS === 'ios') ? <View style={{height: 0.5, width: "100%", backgroundColor: "#000"}}/> : <View/>}
                  <TouchableHighlight
                    underlayColor='transparent'
                    onPress={() => {this.closeAnnouncement()}}>
                    <Text style={{fontFamily: "System", fontSize: (Platform.OS === 'ios') ?23:19, marginVertical: 15, color: Colors2.brandPrimary, textAlign: (Platform.OS === 'ios') ? 'center' : 'right', fontWeight: 'bold'}} >Connect</Text>
                  </TouchableHighlight>
                </View>
            </View>
          </View>
        </Modal>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89', alignItems: 'center'}}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [-58, -58, 0, 0]
                  })
                },
                {
                  scale: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [0.35, 0.35, 1, 1]
                  })
                }
              ]
            }}>
            <Image source={(Platform.OS==='ios')?require('../../images/kyndorlogowhite.png'):require('../../images/kyndorlogo.png')} style={{width: 240,height:75,marginTop:15,marginBottom:10}} />
          </Animated.View>
        </View>
              <Interactable.View
                verticalOnly={true}
                snapPoints={[{y: 0}, {y: -80}]}
                boundaries={{top: 0, bottom: 0}}
                animatedValueY={this._deltaY}>
                <View style={{left: 0, right: 0, height: IsIphoneX() ? (height-240) : (height-175), backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : "#fff"}}>
                  <View style={{
                    flexDirection:'row',
                    alignItems:'stretch',
                    backgroundColor:'transparent',
                    ...Platform.select({
                      ios: {
                        marginLeft: 20,
                        marginEnd: 20,
                        marginBottom: 10,
                        marginTop: 10,
                        borderWidth: 2,
                        borderColor: Colors2.brandPrimary,
                        borderRadius: 7,
                        backgroundColor:'transparent',
                      },
                      android: {
                        backgroundColor:'#484b89',
                        paddingTop: 20,
                      }
                    })
                  }}>
                    <TouchableOpacity onPress={()=>{ Stores.homeTabStore.setData('school') }}
                      style={{
                        flex: 1,
                        padding: 10,
                        ...Platform.select({
                          ios: {
                            borderRightWidth: 2,
                            borderRightColor: Colors2.brandPrimary,
                            backgroundColor: this.state.active == "school" ? Colors2.brandPrimary : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "school" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text style={{
                        fontFamily: "System",
                        textAlign: "center",
                        ...Platform.select({
                          ios: {
                            color: this.state.active == "school" ? "white" : Colors2.brandPrimary,
                          },
                          android: {
                            color: "white",
                          }
                        }),
                        fontSize: 14
                      }}>
                      {Platform.OS==="ios"?"Schools":"SCHOOLS"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{ Stores.homeTabStore.setData('business') }}
                      style={{
                        flex: 1,
                        padding: 10,
                        ...Platform.select({
                          ios: {
                            borderRightWidth: 2,
                            borderRightColor: Colors2.brandPrimary,
                            backgroundColor: this.state.active == "business" ? Colors2.brandPrimary : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "business" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text style={{
                        fontFamily: "System",
                        textAlign: "center",
                        ...Platform.select({
                          ios: {
                            color: this.state.active == "business" ? "white" : Colors2.brandPrimary,
                          },
                          android: {
                            color: "white",
                          }
                        }),
                        fontSize: 14
                      }}
                      >
                        {Platform.OS==="ios"?"Business":"BUSINESS"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{ Stores.homeTabStore.setData('oneoneone') }}
                      style={{
                        flex: 1,
                        padding: 10,
                        ...Platform.select({
                          ios: {
                            borderLeftWidth: 0.5,
                            borderLeftColor: Colors2.brandPrimary,
                            backgroundColor: this.state.active == "oneoneone" ? Colors2.brandPrimary : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "oneoneone" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text adjustsFontSizeToFit style={{
                        fontFamily: "System",
                        textAlign: "center",
                        ...Platform.select({
                            ios: {
                              color: this.state.active == "oneoneone" ? "white" : Colors2.brandPrimary,
                            },
                            android: {
                              color: "white",
                            }
                          }),
                        fontSize: 14
                        }}>
                        {Platform.OS==="ios"?"1 on 1 Chats":"1 ON 1 CHATS"}
                      </Text>
                    </TouchableOpacity>

                  </View>

                  {this.renderScreen(this.props.screenProps)}

                </View>
              </Interactable.View>
        </View>
    );
  }

  renderScreen(mainTabProp){
    if(this.state.active == 'school'){
      return(
        <SchoolsHome navToChat={this.props.navigation} changeNav={mainTabProp}/>
      )
    }
    else if(this.state.active == 'business'){
      return(
        <Business navToChat={this.props.navigation} changeNav={mainTabProp}/>
      )
    }
    else if(this.state.active == 'oneoneone'){
      return(
        <OneOnOneChats navToChat={this.props.navigation}/>
      )
    }
  }

}

const HomeStack = createStackNavigator({
  Home: {screen: Home},
  SingleChat: {screen: SingleChat},
  RequestGrade: {screen: RequestGrade},
  ChannelInfo: {screen: ChannelInfo},
  ChatInvite: {screen: ChatInvite},
  RequestSent: {screen: RequestSent},
});

export default class HomeChatNav extends React.Component {
  render(){
    return(
      <HomeStack screenProps={this.props} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : "#484b89",
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#fff',
    borderRadius: (Platform.OS === 'ios') ? 14 : 3,
    marginHorizontal: 40,
    overflow: 'hidden'
  }
});
