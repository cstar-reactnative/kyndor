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
  Image,
  ScrollView,
  BackHandler,
  FlatList,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ChannelScreen from './businessChannels';
import ParticipantScreen from './businessPart';
import TagsScreen from './businessTags';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const api =  require('../../api/index');
import Stores from '../../stores/';
//const BusyIndicator = require('react-native-busy-indicator');
//const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import SingleChat from '../chat/singleChat.js'
import RequestGrade from '../chat/requestGrade.js'
import ChannelInfo from '../chat/ChannelInfo.js'
import B_createThread from './businessCreateThread';
import { Toolbar, ThemeProvider } from 'react-native-material-ui';
import ChatInvite from '../chat/chat_invite.js';
import RequestSent from '../chat/request_sent.js';
import IsIphoneX from '@theme/IsIphoneX';
import B_invite from '../common/invite_people.js';

const uiTheme = {
  fontFamily: 'System',
  toolbar: {
    container: {
      paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 50 : 30 : 0,
      //top: Platform.OS==="ios"?10:0,
      //paddingLeft: 15,
      paddingBottom: 10,
      height: IsIphoneX()?80:60,
      //backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89'
      backgroundColor: "transparent"
    },
    rightElement: {
      color: (Platform.OS === 'ios') ? "#9513fe" : "#fff"
    },
  },
  toolbarSearchActive: {
    // container: {
    //   borderRadius: 10,
    //   backgroundColor: "rgba(72, 75, 137, 0.12)"
    // },
    leftElement: {
      color: (Platform.OS === 'ios') ? "#9513fe" : "#000"
    },
    // titleText: {
    //   borderRadius: 10,
    //   backgroundColor: "rgba(72, 75, 137, 0.12)"
    // }
  }
}

const height = Dimensions.get('window').height;

class ChannelView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked: this.props.subscribed,
    }
  }
  render(){
    return(
      <View style={{backgroundColor: "#fff", flexDirection: 'column' }} >
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View style={{flex: 0.12,paddingLeft: 7,paddingTop: 10,paddingBottom: 10}}>
            <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
          </View>
          <View style={{flex: 0.88,paddingLeft: 7, paddingTop: 15,paddingBottom: 10}} >
            <Text style={{fontFamily: "System", fontSize: 16, fontWeight: '400', color: '#212121'}} >{this.props.name}</Text>
          </View>
        </View>
        {(Platform.OS === 'ios') ? <View style={{marginLeft: 60,height: 0.7, width: "100%", backgroundColor: "#bcbbc1"}}/> : <View/>}
      </View>
    )
  }
}

class BusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      active: 'Channels',
      fabVisible: true,
      searchScreen: false,
      searchResult: []
      // group_id: null,
    };
  }

  static navigationOptions = {
    title: 'Business details view',
    header: null
  };

  setFabVisible(visible) {
    this.setState({ fabVisible: visible });
  }

  backFunction(){
    let { params } = this.props.screenProps.navigation.state;
    console.log(params.fromHome)
    if(params.fromHome){
      Stores.screenStore.setData({tab: 'home', screen: 'default'})
    }
    else{
      this.props.screenProps.navigation.goBack()
    }
  }

  componentWillMount(){
    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log('Back')
      this.backFunction()
      return true;
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress");
  }

  updateSearch(text){
    Stores.searchStore.setData(text)
  }

  resetSearch(text){
    Stores.searchStore.setData('')
    this.setState({searchScreen: false})
  }

  startSearch(){
    this.setState({searchScreen: true})
  }

  checkMyChannel(cid){
    var result = Stores.privateChannelStore.getData();
    var returnVal = null

    for(i=0 ; i<result.length ; i++){
      if(result[i].channel_id==cid){
        returnVal = result[i]
        break;
      }
    }
    return returnVal
  }

  goToChat(a){
    // this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});

    if(a.access_type == 'default'){
      this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
    }
    else if(a.access_type == 'grade'){
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.navigation.navigate('RequestGrade',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
      }
      else{
        if(channelData.state==0){
          this.props.navigation.navigate('RequestGrade',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
        }
        else{
          this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
        }
      }
    }
    else{
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.navigation.navigate('ChatInvite',{room:a.channel_id});
      }
      else{
        if(channelData.state==0){
          this.props.navigation.navigate('RequestSent',{room:a.channel_id});
        }
        else if(channelData.state==1){
          this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
        }
      }
    }

  }

  render(){
    const { navigate } = this.props.navigation;
    // let { params } = this.props.navigation.state;
    let { params } = this.props.screenProps.navigation.state;
    let group_id = params.group_id;
    let group_name = params.group_name;
    let address = params.group_address;
    Stores.groupStore.setData({group_id:group_id, group_name:group_name});

    if(this.state.searchScreen){
      return(
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
          <Toolbar
            leftElement={
              <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.backFunction()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                    size={Platform.OS==="ios"?40:25}
                    color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  />
                  {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                </View>
              </TouchableOpacity>
            }
            //onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement=""
            rightElement={{
              //menu: {labels: ['Channel info', 'Channel media', 'Mute notifications', 'Share the chat']}
            }}
            isSearchActive={true}
            searchable={{
              autoFocus: true,
              placeholder: 'Search ..',
              onChangeText: (text) => {this.updateSearch(text)},
              onSearchClosed: (text) => {this.resetSearch(text)},
              onSearchPressed: () => {this.startSearch()}
            }}
          />
          <View style={{flex: 1, backgroundColor: "#f4f4f7"}}>
            <FlatList
              data={this.state.searchResult}
              renderItem={
                ({item}) =>{
                  return(
                    <TouchableOpacity onPress={() => {this.goToChat(item)}}>
                      <ChannelView groupid={this.state.groupId} channelid={item.channel_id} name={item.channel_name} icon={item.icon} subscribed={item.subscribe}/>
                    </TouchableOpacity>
                  )
                }
              }
              keyExtractor={(item, index) => item.channel_id.toString()}
            />
          </View>
        </ThemeProvider>
      );
    }
    else{
      return(
        <ThemeProvider uiTheme={uiTheme}>
          <View style={styles.container}>
            <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
            <View style={{backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89', height: 180}}>
              <Toolbar
                leftElement={
                  <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.backFunction()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons
                        name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                        size={Platform.OS==="ios"?40:25}
                        color={Platform.OS==='ios'?"#9513fe":"#fff"}
                      />
                      {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                    </View>
                  </TouchableOpacity>
                }
                //onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement=""
                rightElement={{
                  //menu: {labels: ['Channel info', 'Channel media', 'Mute notifications', 'Share the chat']}
                }}
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search ..',
                  onChangeText: (text) => {this.updateSearch(text)},
                  onSearchClosed: (text) => {this.resetSearch(text)},
                  onSearchPressed: () => {this.startSearch()}
                }}
              />
              <View style={styles.headingBar}>
                <View style={styles.headingBarContents}>
                  <Animated.View style={{
                    transform: [
                    {
                      translateY: this._deltaY.interpolate({
                          inputRange: [-100, -100, 0, 0],
                          outputRange: [-68, -68, 0, 0]
                      })
                    },
                    {
                      scale: this._deltaY.interpolate({
                          inputRange: [-100, -100, 0, 0],
                          outputRange: [0.75, 0.75, 1, 1]
                      })
                    }
                    ],
                  flexDirection: 'column'}}>
                    <View style={{marginLeft: 20, marginTop: 10}}>
                      <Text numberOfLines={1} style={{fontFamily: "System",fontSize: 20, fontWeight: "bold",fontStyle: "normal", color:(Platform.OS === 'ios') ? "#000000" : "white" }}>{group_name}</Text>
                      <Text style={{fontFamily: "System",fontSize: 16, color:(Platform.OS === 'ios') ? "#000000" : "white"}}>{address}</Text>
                    </View>
                  </Animated.View>
                </View>
              </View>
            </View>

            <Interactable.View
              verticalOnly={true}
              snapPoints={[{y: -100}, {y: -100}]}
              boundaries={{top: -100, bottom: -100}}
              animatedValueY={this._deltaY}>

              <View style={{left: 0, right: 0, height: (Platform.OS==='ios')?(height-130):(height-160), backgroundColor: 'transparent'}}>
                <View style={{
                  flexDirection:'row',
                  alignItems:'stretch',
                  backgroundColor: Platform.OS==="ios"?"transparent":"#484b89",
                  ...Platform.select({
                    ios: {
                      marginLeft: 20,
                      marginEnd: 20,
                      marginBottom: 10,
                      marginTop: 10,
                      borderWidth: 2,
                      borderColor: "#9513fe",
                      borderRadius: 7
                    },
                    android: {
                      paddingTop: 5,
                    }
                  })
                }}
                >

                  <TouchableOpacity
                    onPress={()=>{ this.setState({active:'Channels'}); this.setFabVisible(true);}}
                    style={{
                      flex: 1,
                      padding: 10,
                      ...Platform.select({
                        ios: {
                          borderRightWidth: 2,
                          borderRightColor: "#9513fe",
                          backgroundColor: this.state.active == "Channels" ? "#9513fe" : "transparent"
                        },
                        android: {
                          borderBottomWidth: 2,
                          borderBottomColor: this.state.active == "Channels" ? "yellow" : "transparent"
                        }
                      })
                    }}>
                    <Text style={{
                      fontFamily: "System",
                      textAlign: "center",
                      ...Platform.select({
                        ios: {
                          color: this.state.active == "Channels" ? "white" : "#9513fe",
                        },
                        android: {
                          color: "white",
                        }
                      }),
                      fontSize: 13
                    }}>
                      {Platform.OS==="ios"?"Chat Groups":"CHAT GROUPS"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={()=>{ this.setState({active:'Participants'}); this.setFabVisible(false);}}
                    style={{
                      flex: 1,
                      padding: 10,
                      ...Platform.select({
                        ios: {
                          borderRightWidth: 2,
                          borderRightColor: "#9513fe",
                          backgroundColor: this.state.active == "Participants" ? "#9513fe" : "transparent"
                        },
                        android: {
                          borderBottomWidth: 2,
                          borderBottomColor: this.state.active == "Participants" ? "yellow" : "transparent"
                        }
                      })
                    }}>
                    <Text
                      adjustsFontSizeToFit
                      style={{
                        fontFamily: "System",
                        textAlign: "center",
                        ...Platform.select({
                          ios: {
                            color: this.state.active == "Participants" ? "white" : "#9513fe",
                          },
                          android: {
                            color: "white",
                          }
                        }),
                        fontSize: 13
                      }}>
                      {Platform.OS==="ios"?"Members":"MEMBERS"}
                    </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={()=>{ this.setState({active:'Tags'}); this.setFabVisible(false);}}
                    style={{
                      flex: 1,
                      padding: 10,
                      ...Platform.select({
                    ios: {
                    backgroundColor: this.state.active == "Tags" ? "#9513fe" : "transparent"
                    },
                    android: {
                    borderBottomWidth: 2,
                    borderBottomColor: this.state.active == "Tags" ? "yellow" : "transparent"
                    }
                      })
                    }}>
                    <Text style={{
                      fontFamily: "System",
                      textAlign: "center",
                      ...Platform.select({
                    ios: {
                    color: this.state.active == "Tags" ? "white" : "#9513fe",
                    },
                    android: {
                    color: "white",
                    }
                      }),
                      fontSize: 13
                    }}>
                      {Platform.OS==="ios"?"Tags":"TAGS"}</Text>
                  </TouchableOpacity> */}

                </View>

                {this.renderScreen(group_id)}
              </View>
            </Interactable.View>

            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="transparent"
              style={{
                justifyContent: "center",
                alignContent: "center",
                ...Platform.select({
                  ios: {
                    backgroundColor: "#ecd9fc",
                    height: this.state.fabVisible?50:0,
                    width: this.state.fabVisible?70:0,
                    borderRadius: 10,
                  },
                  android: {
                    backgroundColor: "#9513fe",
                    height: this.state.fabVisible?60:0,
                    width: this.state.fabVisible?60:0,
                    borderRadius: 30,
                  }
                }),
                position: "absolute",
                bottom: 15,
                right: 15,
                elevation: 3,
                zIndex: 5,
                overflow: "hidden"
              }}
              onPress={() =>this.props.navigation.navigate('B_createThread')}>
              <MaterialIcons
                name="add"
                size={30}
                color={Platform.OS === "ios" ? "#9513fe":"#fff"}
                style={{ alignSelf: "center" }}
              />
            </TouchableHighlight>
          </View>
        </ThemeProvider>
      );
    }
  }


  renderScreen(group_id){
    if(this.state.active == 'Channels'){
      return(
        <ChannelScreen meraStates={this} group_id={group_id} navToChat={this.props.navigation} />
      )
    }
    else if(this.state.active == 'Participants'){
      return(
        <ParticipantScreen meraStates={this} group_id={group_id} navToChat={this.props.navigation} />
      )
    }
    else if(this.state.active == 'Tags'){
      return(
        <TagsScreen meraStates={this} group_id={group_id} navToChat={this.props.navigation}/>
      )
    }
  }

}

const BusinessDetailsStack = createStackNavigator({
  Business: {
    screen: BusinessDetails,
  },
  SingleChat: {screen: SingleChat},
  ChannelInfo: {screen: ChannelInfo},
  B_createThread: {screen: B_createThread},
  ChatInvite: {screen: ChatInvite},
  RequestSent: {screen: RequestSent},
  RequestGrade: {screen: RequestGrade},
  B_Invite: {screen: B_invite}
});

export default class BusinessChatNav extends React.Component {
  static navigationOptions = {
    title: 'Schools',
    header: null
  };
  render(){
    return(
      <BusinessDetailsStack screenProps={this.props}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#fff',
  },
  // topBar: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   top: Platform.OS==="ios"?5:10,
  //   paddingLeft: Platform.OS==="ios"?0:15,
  //   paddingRight: 15
  // },
  // navButtonHolder: {
  //   //flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end'
  // },
  headingBar: {
    //backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: (Platform.OS === 'ios') ? 20 : 0,
  },
  headingBarContents: {
    //flex: 1,
    //backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  fab: {
    backgroundColor: '#9513fe',
    height: 50,
    width: 50,
    borderRadius: 50,
    padding: 14,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 5,
    elevation: 3,
    overflow:'hidden'
  },
  // HeaderStyle:
  // {
  //   justifyContent: 'center',
  //   //alignItems: 'center',
  //   position: 'absolute',
  //   backgroundColor: '#484b89',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   overflow: 'hidden',
  // },
  // HeaderInsideTextStyle:
  // {
  //   color: "#fff",
  //   fontSize: 18,
  //   textAlign: 'center',
  //   fontFamily: "System"
  // },
  // TextViewStyle:
  // {
  //   textAlign: 'center',
  //   color: "#000",
  //   fontSize: 18,
  //   margin: 5,
  //   padding: 7,
  //   backgroundColor: "#ECEFF1"
  // }
});
