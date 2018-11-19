import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ToolbarAndroid,
  Platform,
  AsyncStorage,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Stores from '../stores/';
import BlurbModel from './common/blurbModal';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const api =  require('../api/index');
import Colors2 from '@theme/ColorsTwo';
import colors from '@theme/colorsThree';

class NotifyApproveElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true,
      approveText: 'APPROVE',
      rejectText: 'REJECT',
      callingApi: false,
      name: '',
      isGroup: false,
      sub_id: 0,
      line2: 'Wants to join ',
      time: '',
      line3: '..'
    }
  }

  componentWillMount(){
    let itemData = JSON.parse(this.props.data)
    this.setState({name: itemData.username})

    if(itemData.channel_name){
      // is channel
      this.setState({
        sub_id: itemData.channel_sub_id,
        line2: 'Wants to join this chat group ',
        line3: itemData.channel_name + ' of ' + itemData.group_name
      })
    }
    else{
      // is group
      this.setState({
        isGroup: true,
        sub_id: itemData.subscription_id,
        line2: 'Wants to join this group ',
        line3: itemData.group_name
      })
    }
  }

  // approveRequest(subId, isGroup, state){
  //   if(this.state.approveText == 'Approve'){
  //     this.setState({approveText: 'loading..'})
  //     AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
  //       if(err){
  //         alert(err)
  //       }
  //       else{
  //         if(isGroup){
  //           console.log('@acceptJoinRequest')
  //           api.acceptJoinRequest({token:item, sid:subId}, (e, r) => {
  //             console.log('e: '+JSON.stringify(e))
  //             console.log('r: '+JSON.stringify(r))
  //             if(e){
  //               alert("Error: "+e);
  //             }
  //             else{
  //               if(r.success == true){
  //                 this.setState({approveText: 'Done!'})
  //                 let thisElement = this
  //                 setTimeout(function(){ thisElement.setState({display: false}) }, 3000)
  //               }
  //               else {
  //                 // alert('Failed!');
  //               }
  //             }
  //           })
  //         }
  //         else{
  //           console.log('@acceptChannelJoinRequest')
  //           api.acceptChannelJoinRequest({token:item, sid:subId}, (e, r) => {
  //             console.log('e: '+JSON.stringify(e))
  //             console.log('r: '+JSON.stringify(r))
  //             if(e){
  //               alert("Error: "+e);
  //             }
  //             else{
  //               if(r.success == true){
  //                 this.setState({approveText: 'Done!'})
  //                 let thisElement = this
  //                 setTimeout(function(){ thisElement.setState({display: false}) }, 3000)
  //               }
  //               else {
  //                 // alert('Failed!');
  //               }
  //             }
  //           })
  //         }
  //       }
  //     });
  //   }
  // }

  processRequest(subId, isGroup, state){
    if(this.state.callingApi){
      // do nothing
    }
    else{
      if(state == 1){
        this.setState({approveText: 'loading..'})
      }
      if(state == -1){
        this.setState({rejectText: 'loading..'})
      }

      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          console.log(err)
        }
        else{
          if(isGroup){
            console.log('@joinGroupAction')
            api.joinGroupAction({token:item, sid:subId, state:state}, (e, r) => {
              console.log('e: '+JSON.stringify(e))
              console.log('r: '+JSON.stringify(r))
              if(e){
                console.log("Error: "+e);
              }
              else{
                if(r.success == true){
                  if(state == 1){
                    this.setState({approveText: 'Done!'})
                  }
                  if(state == -1){
                    this.setState({rejectText: 'Done!'})
                  }

                  if(r.result.details.length > 0){
                    let gotData = r.result.details[0]
                    let gotAction = (gotData.state == 1) ? 'ACCEPTED' : 'REJECTED'
                    alert('The user request has already been '+gotAction+' by '+gotData.updated_by_name+'.')
                  }

                  let thisElement = this
                  setTimeout(function(){ thisElement.setState({display: false}) }, 3000)
                }
                else {
                  // alert('Failed!');
                }
              }
              this.setState({callingApi: false})
            })
          }
          else{
            console.log('@joinChannelAction')
            api.joinChannelAction({token:item, sid:subId, state:state}, (e, r) => {
              console.log('e: '+JSON.stringify(e))
              console.log('r: '+JSON.stringify(r))
              if(e){
                console.log("Error: "+e);
              }
              else{
                if(r.success == true){
                  if(state == 1){
                    this.setState({approveText: 'Done!'})
                  }
                  if(state == -1){
                    this.setState({rejectText: 'Done!'})
                  }

                  if(r.result.details.length > 0){
                    let gotData = r.result.details[0]
                    let gotAction = (gotData.state == 1) ? 'ACCEPTED' : 'REJECTED'
                    alert('The user request has already been '+gotAction+' by '+gotData.updated_by_name+'.')
                  }

                  let thisElement = this
                  setTimeout(function(){ thisElement.setState({display: false}) }, 3000)
                }
                else {
                  // alert('Failed!');
                }
              }
              this.setState({callingApi: false})
            })
          }
        }
      });

    }
  }

  render() {
    if(this.state.display){
      return (
        <View style={{paddingLeft: 15, backgroundColor: 'transparent', flexDirection: 'row', marginBottom: 10}} >
          <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}} >
            <Image
              source={require('../images/null_avatar.png')}
              style={StyleSheet.absolutefill}
            />
          </View>
          <View style={{flex: 0.88, justifyContent: 'flex-end', marginLeft: 15, paddingTop: 10}} >
            <View style={{paddingRight: 15}} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <Text style={{fontFamily: "System",fontSize: 16, fontWeight: '400', color: '#000000', paddingBottom: 2}} >{this.state.name}</Text>
                <Text style={{fontFamily: "System",fontSize: 14}} >{this.state.time}</Text>
              </View>
              <Text style={{fontFamily: "System",fontSize: 14, color: '#484b89'}} >{this.state.line2}</Text>
              <Text style={{fontFamily: "System",fontSize: 14}} >{this.state.line3}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop:5}}>
              <TouchableOpacity onPress={() => {this.processRequest(this.state.sub_id, this.state.isGroup, 1)}} style={{padding:5, backgroundColor:'white', borderRadius:5}}>
                <Text style={{fontFamily: "System",color:'#9513fe'}}>{this.state.approveText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.processRequest(this.state.sub_id, this.state.isGroup, -1)}} style={{padding:5, backgroundColor:'white', borderRadius:5, marginLeft: 10}}>
                <Text style={{fontFamily: "System",color:'#9513fe'}}>{this.state.rejectText}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}/>
          </View>
        </View>
      )
    }
    else{
      return null;
    }
  }
}

class UpdateView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      line1: '',
      line2: ''
    }
  }

  componentWillMount(){
    let itemData = JSON.parse(this.props.data)
    let username = itemData.username
    let action = ''

    if(itemData.state == 1){
      action = 'accepted'
    }
    else{
      action = 'rejected'
    }

    let byUser = itemData.updated_by_name

    this.setState({line1: username + ' is ' + action + ' by ' + byUser})

    if(itemData.channel_name){
      // is channel
      this.setState({
        line2: 'to the chat group ' + itemData.channel_name + ' of group ' + itemData.group_name,
      })
    }
    else{
      // is group
      if(itemData.notes != 'Requested'){
        this.setState({line1: username + ' has accepted the request'})
      }
      this.setState({
        line2: 'to the group ' + itemData.group_name,
      })
    }
  }

  render() {
    return (
      <TouchableOpacity style={{paddingLeft: 15, backgroundColor: '#ededf3', flexDirection: 'row', marginBottom:10, paddingBottom:10}} >
        <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}} >
          <Image
            source={require('../images/null_avatar.png')}
            style={StyleSheet.absolutefill}
          />
        </View>
        <View style={{flex: 0.88, justifyContent: 'flex-end', marginLeft: 15, paddingTop: 10}} >
          <View style={{paddingRight: 15}} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
              <Text style={{fontFamily: "System",fontSize: 16, fontWeight: '400', color: '#212121', paddingBottom: 2}} >
                {this.state.line1}
              </Text>
              <Text style={{fontFamily: "System",fontSize: 14}} >
              </Text>
            </View>
            <Text style={{fontFamily: "System",fontSize: 14}} >
              {this.state.line2}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class NoNotificationElement extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Text style={styles.noData}>
        You have no {this.props.text}
      </Text>
    )
  }
}

class ViewNotification extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    groupNotification: [],
    ChannelNotification:[],
    TotalNotification:[]
  }

  getChannelNotifications(item){
    api.listChannelRequest({token: item}, (e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          if(r.result.length != this.state.ChannelNotification.length){
            this.setState({ChannelNotification: r.result})
          }

          let allNotificationArray = (this.state.ChannelNotification).concat(this.state.groupNotification);

          if(allNotificationArray.length != this.state.TotalNotification.length){
            this.setState({TotalNotification: allNotificationArray})
          }

          loaderHandler.hideLoader();
        }
        else {
          loaderHandler.hideLoader();
          alert('Failed!');
        }
      }
    })
  }

  componentWillMount(){
    loaderHandler.showLoader("Loading...");
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.listGroupRequest({token: item}, (e, r) => {
          if(e){
            console.log("Error: "+e);
            this.getChannelNotifications(item)
          }
          else{
            if(r.success == true){
              if(r.result.length != this.state.groupNotification.length){
                this.setState({groupNotification: r.result})
              }
              this.getChannelNotifications(item)
            }
            else {
              // alert('Failed!');
              this.getChannelNotifications(item)
            }
          }
        })
      }
    });
  }

  render() {
    if (this.state.TotalNotification.length == 0) {
      return <NoNotificationElement text='new notifications'/>
    }
    else {
      return (

        <View style={{paddingBottom:220}}>

          <FlatList
            data={this.state.TotalNotification}
            renderItem={({item}) => {
              return(
                <NotifyApproveElement
                  data = {JSON.stringify(item)}
                />
              )
            }}
            keyExtractor={(item, index) => (item.subscription_id) ? item.subscription_id.toString() : item.channel_sub_id.toString()}
          />
        </View>

      )
    }
  }
}

class ViewUpdates extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    groupUpdates: [],
    channelUpdates:[],
    totalUpdates:[]
  }

  getChannelUpdates(item){
    api.listChannelUpdates({token: item}, (e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          if(r.result.length != this.state.channelUpdates.length){
            this.setState({channelUpdates: r.result})
          }

          let allUpdatesArray = (this.state.channelUpdates).concat(this.state.groupUpdates);
          // allUpdatesArray.sort(function(a, b){return b.updated_on - a.updated_on});

          if(allUpdatesArray.length != this.state.totalUpdates.length){
            this.setState({totalUpdates: allUpdatesArray})
          }

          loaderHandler.hideLoader();
        }
        else {
          loaderHandler.hideLoader();
          alert('Failed!');
        }
      }
    })
  }

  componentWillMount(){
    loaderHandler.showLoader("Loading...");
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.listGroupUpdates({token: item}, (e, r) => {
          if(e){
            console.log("Error01: "+e);
            this.getChannelUpdates(item)
          }
          else{
            if(r.success == true){
              if(r.result.length != this.state.groupUpdates.length){
                this.setState({groupUpdates: r.result})
              }
              this.getChannelUpdates(item)
            }
            else {
              // alert('Failed!');
              this.getChannelUpdates(item)
            }
          }
        })
      }
    });
  }

  render() {
    if (this.state.totalUpdates.length == 0) {
      return <NoNotificationElement text='updates'/>
    }
    else {
      return (
        <View style={{paddingBottom:220}}>
          <FlatList
            data={this.state.totalUpdates}
            renderItem={({item}) => {
              return(
                <UpdateView
                  data = {JSON.stringify(item)}
                />
              )
            }}
            keyExtractor={(item, index) => (item.subscription_id) ? item.subscription_id.toString() : item.channel_sub_id.toString()}
          />
        </View>
      )
    }
  }
}

class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 'requests',
      display: Stores.chartStore.getData().notification.main,
      blurbText: 'Loading ...'
    }
  }

  static navigationOptions = {
    title: 'Notifications',
    //headerRight: <TouchableOpacity><MaterialIcons name="filter-list" size={28} style={{color:(Platform.OS==='ios')?'#9513fe':'white'}}/></TouchableOpacity>,
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: colors.indigoBlue,
      paddingRight: 10,
      elevation: 5,
    },
  };

  componentWillMount() {
    let helpTest = Stores.verbiageStore.getData().notification
    this.setState({
      blurbText: helpTest
    })
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.notification.main = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.notification.main = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff', flex: 1}} >
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
        <View>
          <View style={{flexDirection:'row',alignItems:'stretch',...Platform.select({
            ios: {
              marginLeft: 20,
              marginEnd: 20,
              marginBottom: 8,
              marginTop: 10,
              borderWidth: 2,
              borderColor: colors.indigoBlue,
              borderRadius: 7,
              backgroundColor: "#efeff9"
            },
            android: {
              width:'100%',
              backgroundColor: colors.indigoBlue,
              //paddingTop: 5,
            }
          })}}>

            <TouchableOpacity onPress={()=>{ this.setState({active:'requests'})}}
              style={{
                flex: 1,
                ...Platform.select({
                  ios: {
                    padding:10,
                    borderRightWidth: 2,
                    borderRightColor: colors.indigoBlue,
                    backgroundColor: this.state.active == "requests" ? colors.indigoBlue : "transparent"
                  },
                  android: {
                    padding:15,
                    borderBottomWidth: 2,
                    borderBottomColor:(this.state.active=='requests'?'#bb7fff':'transparent')
                  }
                }),
              }}>
              <Text style={{
                fontFamily: "System",
                textAlign: "center",
                ...Platform.select({
                  ios: {
                    color:(this.state.active=='requests'?'#ffffff':colors.indigoBlue),
                  },
                  android: {
                    color:(this.state.active=='requests'?'#ffffff':'grey'),
                  }
                }),
              }}>REQUESTS</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ this.setState({active:'updates'})}}
              style={{
                flex: 1,
                ...Platform.select({
                  ios: {
                    padding: 10,
                    backgroundColor: this.state.active == "updates" ? colors.indigoBlue : "transparent"
                  },
                  android: {
                    padding: 15,
                    borderBottomWidth: 2,
                    borderBottomColor:(this.state.active=='updates'?'#bb7fff':'transparent')
                  }
                }),
              }}>
              <Text style={{
                fontFamily: "System",
                textAlign: "center",
                ...Platform.select({
                  ios: {
                    color:(this.state.active=='updates'?'#ffffff':colors.indigoBlue)
                  },
                  android: {
                    color:(this.state.active=='updates'?'#ffffff':'grey')
                  }
                }),
              }}>UPDATES</Text>
            </TouchableOpacity>

          </View>
          <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />
          {this.renderScreen()}

        </View>
      </View>
    );
  }

  renderScreen(){
    if(this.state.active == 'requests'){
      return(
        <ViewNotification/>
      )
    }
    else if(this.state.active == 'updates'){
      return(
        <ViewUpdates/>
      )
    }
  }

}

const styles = StyleSheet.create({
  noData:{
    fontFamily: "System",
    alignSelf: 'center',
    color: '#484b89',
    fontSize: 20
  },
  hr: {
    borderBottomColor: "#d4d4da",
    borderBottomWidth: 1.5,
    paddingBottom: 10
  },
  // toolbar: {
  //   backgroundColor: '#484b89',
  //   height: 60
  // }
});

const NotificationApp = createStackNavigator({
  MyNotifications: { screen: Notifications }
});

export default NotificationApp

{/* <View style={{flexDirection:'row',alignItems:'stretch',...Platform.select({
  ios: {
    marginLeft: 20,
    marginEnd: 20,
    //marginBottom: 10,
    //marginTop: 10,
    borderWidth: 2,
    borderColor: "#9513fe",
    borderRadius: 7,
    backgroundColor: "#efeff9"
  },
  android: {
    width:'100%',
    backgroundColor: '#484b89'
    //paddingTop: 5,
  }
})}}>

  <TouchableOpacity onPress={()=>{ this.setState({active:'requests'})}}
    style={{
      flex: 1,
      ...Platform.select({
        ios: {
          padding:10,
          borderRightWidth: 2,
          borderRightColor: "#9513fe",
          backgroundColor: this.state.active == "requests" ? "#9513fe" : "transparent"
        },
        android: {
          padding:15,
          borderBottomWidth: 2,
          borderBottomColor:(this.state.active=='requests'?'#bb7fff':'transparent')
        }
      }),
    }}>
    <Text style={{
      fontFamily: "System",
      textAlign: "center",
      ...Platform.select({
        ios: {
          color:(this.state.active=='requests'?'#ffffff':'#9513fe'),
        },
        android: {
          color:(this.state.active=='requests'?'#ffffff':'grey'),
        }
      }),
    }}>{Platform.OS="ios"?"Requests":"REQUESTS"}</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>{ this.setState({active:'updates'})}}
    style={{flex: 1,

      ...Platform.select({
        ios: {
          padding: 10,
          backgroundColor: this.state.active == "updates" ? "#9513fe" : "transparent"
        },
        android: {
          padding: 15,
          borderBottomWidth: 2,
          borderBottomColor:(this.state.active=='updates'?'#bb7fff':'transparent')
        }
      })}}>
    <Text style={{fontFamily: "System",
      textAlign: "center",
      ...Platform.select({
        ios: {
          color:(this.state.active=='updates'?'#ffffff':'#9513fe')
        },
        android: {
          color:(this.state.active=='updates'?'#ffffff':'grey')
        }
      })}}>{Platform.OS="ios"?"Updates":"UPDATES"}</Text>
  </TouchableOpacity>

</View> */}
