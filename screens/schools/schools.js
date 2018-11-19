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
  ViewPagerAndroid,
  Platform,
  Modal,
  Switch,
  AsyncStorage,
  BackHandler,
  FlatList,
  Dimensions
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
// import S_map from './schools/s_map.js';
import ScoolsParticipants from './schoolPart.js';
import ScoolsTags from './schoolTags.js';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from "react-native-material-textfield";
import SchoolsChannels from './schoolChannels';
import Stores from '../../stores/'
import SingleChat from '../chat/singleChat.js';
import RequestGrade from '../chat/requestGrade.js'
import ChannelInfo from '../chat/ChannelInfo.js';
import S_createThread from './schoolCreateThread';
import ChatInvite from '../chat/chat_invite.js';
import RequestSent from '../chat/request_sent.js'
import Invite_people from '../common/invite_people.js';
import { Toolbar, ThemeProvider } from 'react-native-material-ui';
import IsIphoneX from '@theme/IsIphoneX';
import ColorsTwo from '@theme/ColorsTwo';

const uiTheme = {
  fontFamily: 'System',
  toolbar: {
    container: {
      paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 50 : 30 : 7,
      //top: Platform.OS==="ios"?10:0,
      //paddingLeft: 15,
      paddingBottom: 10,
      height: IsIphoneX() ? 80 : 60,
      //backgroundColor: 'transparent'
      backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : ColorsTwo.brandPrimary
    },
    rightElement: {
      //color: "#fff"
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
    //titleText: {
      //borderRadius: 10,
      //backgroundColor: "rgba(72, 75, 137, 0.12)"
    //},
    centerElementContainer: {
      //padding: 5
    }
  }
}

var deviceWidth = Dimensions.get('window').width;

class ChannelView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked: this.props.subscribed,
    }
  }

  static navigationOptions = {
    title: 'Channel View',
    header: null
  };

  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 7, paddingRight: 10 }} >
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
          </View>
          <View style={{flex: 0.78}} >
            <Text style={{fontFamily: "System",fontSize: 16, fontWeight: '400', color: '#212121', paddingLeft: 10}} >{this.props.name}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      active: 'Channels',
      fabVisible: true,
      searchScreen: false,
      searchResult: []
    }
  }

  static navigationOptions = {
    title: 'OneOnOne',
    header: null
  };

  setFabVisible(visible) {
    this.setState({ fabVisible: visible });
  }

  randomColor() {
    let color = '';
    if (this.state.toggled) {
      color = '#9513fe';
    }else{
      color = '#a9a9a9';
    }
    return color;
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

  backFunction(){
    // let { params } = this.props.screenProps.navigation.state;
    // console.log(params.fromHome)
    // if(params.fromHome){
    //   Stores.screenStore.setData({tab: 'home', screen: 'default'})
    // }
    // else{
    //   this.props.screenProps.navigation.goBack()
    // }
    this.props.navigation.goBack()
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
    // alert(a.access_type)
    if(a.access_type == 'default'){
      this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
    }
    else if(a.access_type == 'grade'){
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.navigation.navigate('RequestGrade',{room:a.channel_id});
      }
      else{
        if(channelData.state==0){
          this.props.navigation.navigate('RequestGrade',{room:a.channel_id});
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

      // this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});

      // if private and not in myPrivateChannels -> request page
      // if private and in myPrivateChannel with state 0 -> invite sent page
      // if private and in myPrivateChannel with state 1 -> chat page
      // alert('Private channel')
  }

  componentWillMount(){
    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log('Back')
      this.backFunction()
      return true;
    })

    console.log('schools data: '+ this.props.navigation.state.params.group_name)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress");
  }

  capitalize(s){
    var str = s.toLowerCase()
    var array = str.split(" ");
    var a = '';
    for(i=0;i<array.length;i++){
      var n = array[i];
      var a = a + n.charAt(0).toUpperCase() + n.slice(1) + ' ';
    }
    return a;
  }

  render(){
    // let { params } = this.props.screenProps.navigation.state;
    let { params } = this.props.navigation.state;

    return(
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          {/* <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : ColorsTwo.brandPrimary} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} /> */}

          <View style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#fff'}}>
            <View>

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
                centerElement={<View>
                  <Text numberOfLines={1} style={{fontFamily: "System",fontSize: 14, color:(Platform.OS === 'ios') ? "#000000" : "white", fontWeight: 'bold',fontStyle: "normal",}} >{this.capitalize(params.group_name)}</Text>
                  {/* <Text style={{fontFamily: "System",fontSize: 12, color:(Platform.OS === 'ios') ? "#000000" : "white"}} >{params.group_address}</Text> */}
                </View>}
                rightElement={{
                    //menu: {labels: ['Channel info', 'Channel media', 'Mute notifications', 'Share the chat']}
                }}
                // searchable={{
                //   autoFocus: true,
                //   placeholder: 'Search ..',
                //   onChangeText: (text) => {this.updateSearch(text)},
                //   onSearchClosed: (text) => {this.resetSearch(text)},
                //   onSearchPressed: () => {this.startSearch()}
                // }}
              />

              <View style={styles.tabView}>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({ active: "Channels" });
                    this.setFabVisible(true);
                  }}
                  style={{
                      flex: 1,
                      padding: 10,
                    ...Platform.select({
                      ios: {
                        borderRightWidth: 2,
                        borderRightColor: "#9513fe",
                        //backgroundColor: this.state.active == "Channels" ? "white" : "transparent"
                        backgroundColor: this.state.active == "Channels" ? "#9513fe" : "transparent"
                      },
                      android: {
                        borderBottomWidth: 2,
                        borderBottomColor: this.state.active == "Channels" ? "yellow" : "transparent"
                      }
                    })
                  }}>
                  <Text
                    style={{
                        fontFamily: "System",
                        textAlign: "center",
                      ...Platform.select({
                        ios: {
                          // color: this.state.active == "Channels" ? "black" : "white",
                          color: this.state.active == "Channels" ? "white" : "#9513fe",
                        },
                        android: {
                            color: "white",
                        }
                      }),
                        fontSize: 13
                    }}>
                    Chat Groups
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({ active: "Participants" });
                    this.setFabVisible(false);
                  }}
                  style={{
                      flex: 1,
                      padding: 10,
                    ...Platform.select({
                      ios: {
                          borderRightWidth: 2,
                          borderRightColor: "#9513fe",
                        //backgroundColor: this.state.active == "Participants" ? "white" : "transparent"
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
                          //color: this.state.active == "Participants" ? "black" : "white",
                          color: this.state.active == "Participants" ? "white" : "#9513fe",
                        },
                        android: {
                            color: "white",
                        }
                      }),
                        fontSize: 13
                    }}>
                    Members
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
            {this.renderScreen()}
          </View>

          {/* <TouchableHighlight
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
            onPress={() =>this.props.navigation.navigate('S_createThread')}>
            <MaterialIcons
              name="add"
              size={30}
              color={Platform.OS === "ios" ? "#9513fe":"#fff"}
              style={{ alignSelf: "center" }}
            />
          </TouchableHighlight> */}
        </View>
      </ThemeProvider>
    );

    // if(this.state.searchScreen){
    //   return(
    //     <ThemeProvider uiTheme={uiTheme}>
    //       <View style={styles.container}>
    //         <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
    //
    //         <Toolbar
    //           //style={{backgroundColor: '#393c63'}}
    //           leftElement={
    //             <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.backFunction()}>
    //               <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //                 <MaterialIcons
    //                   name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
    //                   size={Platform.OS==="ios"?40:25}
    //                   color={Platform.OS==='ios'?"#9513fe":"#fff"}
    //                 />
    //                 {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
    //               </View>
    //             </TouchableOpacity>
    //           }
    //           //onLeftElementPress={() => this.props.navigation.goBack()}
    //           centerElement=""
    //           rightElement={{
    //             //menu: {labels: ['Channel info', 'Channel media', 'Mute notifications', 'Share the chat']}
    //           }}
    //           isSearchActive={true}
    //           searchable={{
    //             autoFocus: true,
    //             placeholder: 'Search ..',
    //             onChangeText: (text) => {this.updateSearch(text)},
    //             onSearchClosed: (text) => {this.resetSearch(text)},
    //             onSearchPressed: () => {this.startSearch()}
    //           }}
    //         />
    //
    //         <View style={{flex: 1, backgroundColor: 'white'}}>
    //           <FlatList
    //             data={this.state.searchResult}
    //             renderItem={
    //               ({item}) =>{
    //                 return(
    //                   <TouchableOpacity onPress={() => {this.goToChat(item)}}>
    //                     <ChannelView groupid={this.state.groupId} channelid={item.channel_id} name={item.channel_name} icon={item.icon} subscribed={item.subscribe}/>
    //                   </TouchableOpacity>
    //                 )
    //               }
    //             }
    //             keyExtractor={(item, index) => item.channel_id.toString()}
    //           />
    //         </View>
    //
    //       </View>
    //     </ThemeProvider>
    //   );
    // }
    // else{
    //   return(
    //     <ThemeProvider uiTheme={uiTheme}>
    //       <View style={styles.container}>
    //         <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
    //
    //         <View style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#fff'}}>
    //           <View>
    //
    //             <Toolbar
    //               leftElement={
    //                 <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.backFunction()}>
    //                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //                     <MaterialIcons
    //                       name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
    //                       size={Platform.OS==="ios"?40:25}
    //                       color={Platform.OS==='ios'?"#9513fe":"#fff"}
    //                     />
    //                     {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
    //                   </View>
    //                 </TouchableOpacity>
    //               }
    //               //onLeftElementPress={() => this.props.navigation.goBack()}
    //               centerElement={<View>
    //                 <Text numberOfLines={1} style={{fontFamily: "System",fontSize: 14, color:(Platform.OS === 'ios') ? "#000000" : "white", fontWeight: 'bold',fontStyle: "normal",}} >{params.group_name}</Text>
    //                 <Text style={{fontFamily: "System",fontSize: 12, color:(Platform.OS === 'ios') ? "#000000" : "white"}} >{params.group_address}</Text>
    //               </View>}
    //               rightElement={{
    //                   //menu: {labels: ['Channel info', 'Channel media', 'Mute notifications', 'Share the chat']}
    //               }}
    //               searchable={{
    //                 autoFocus: true,
    //                 placeholder: 'Search ..',
    //                 onChangeText: (text) => {this.updateSearch(text)},
    //                 onSearchClosed: (text) => {this.resetSearch(text)},
    //                 onSearchPressed: () => {this.startSearch()}
    //               }}
    //             />
    //
    //             <View style={styles.tabView}>
    //
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   this.setState({ active: "Channels" });
    //                   this.setFabVisible(true);
    //                 }}
    //                 style={{
    //                     flex: 1,
    //                     padding: 10,
    //                   ...Platform.select({
    //                     ios: {
    //                       borderRightWidth: 2,
    //                       borderRightColor: "#9513fe",
    //                       //backgroundColor: this.state.active == "Channels" ? "white" : "transparent"
    //                       backgroundColor: this.state.active == "Channels" ? "#9513fe" : "transparent"
    //                     },
    //                     android: {
    //                       borderBottomWidth: 2,
    //                       borderBottomColor: this.state.active == "Channels" ? "yellow" : "transparent"
    //                     }
    //                   })
    //                 }}>
    //                 <Text
    //                   style={{
    //                       fontFamily: "System",
    //                       textAlign: "center",
    //                     ...Platform.select({
    //                       ios: {
    //                         // color: this.state.active == "Channels" ? "black" : "white",
    //                         color: this.state.active == "Channels" ? "white" : "#9513fe",
    //                       },
    //                       android: {
    //                           color: "white",
    //                       }
    //                     }),
    //                       fontSize: 13
    //                   }}>
    //                   {Platform.OS==="ios"?"Chat Groups":"CHAT GROUPS"}
    //                 </Text>
    //               </TouchableOpacity>
    //
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   this.setState({ active: "Participants" });
    //                   this.setFabVisible(false);
    //                 }}
    //                 style={{
    //                     flex: 1,
    //                     padding: 10,
    //                   ...Platform.select({
    //                     ios: {
    //                         borderRightWidth: 2,
    //                         borderRightColor: "#9513fe",
    //                       //backgroundColor: this.state.active == "Participants" ? "white" : "transparent"
    //                       backgroundColor: this.state.active == "Participants" ? "#9513fe" : "transparent"
    //                     },
    //                     android: {
    //                         borderBottomWidth: 2,
    //                       borderBottomColor: this.state.active == "Participants" ? "yellow" : "transparent"
    //                     }
    //                   })
    //                 }}>
    //                 <Text
    //                   adjustsFontSizeToFit
    //                   style={{
    //                       fontFamily: "System",
    //                       textAlign: "center",
    //                     ...Platform.select({
    //                       ios: {
    //                         //color: this.state.active == "Participants" ? "black" : "white",
    //                         color: this.state.active == "Participants" ? "white" : "#9513fe",
    //                       },
    //                       android: {
    //                           color: "white",
    //                       }
    //                     }),
    //                       fontSize: 13
    //                   }}>
    //                   {Platform.OS==="ios"?"Members":"MEMBERS"}
    //                 </Text>
    //               </TouchableOpacity>
    //
    //             </View>
    //
    //           </View>
    //           {this.renderScreen()}
    //         </View>
    //
    //         <TouchableHighlight
    //           activeOpacity={0.5}
    //           underlayColor="transparent"
    //           style={{
    //             justifyContent: "center",
    //             alignContent: "center",
    //             ...Platform.select({
    //               ios: {
    //                 backgroundColor: "#ecd9fc",
    //                 height: this.state.fabVisible?50:0,
    //                 width: this.state.fabVisible?70:0,
    //                 borderRadius: 10,
    //               },
    //               android: {
    //                 backgroundColor: "#9513fe",
    //                 height: this.state.fabVisible?60:0,
    //                 width: this.state.fabVisible?60:0,
    //                 borderRadius: 30,
    //               }
    //             }),
    //             position: "absolute",
    //             bottom: 15,
    //             right: 15,
    //             elevation: 3,
    //             zIndex: 5,
    //             overflow: "hidden"
    //           }}
    //           onPress={() =>this.props.navigation.navigate('S_createThread')}>
    //           <MaterialIcons
    //             name="add"
    //             size={30}
    //             color={Platform.OS === "ios" ? "#9513fe":"#fff"}
    //             style={{ alignSelf: "center" }}
    //           />
    //         </TouchableHighlight>
    //
    //       </View>
    //     </ThemeProvider>
    //   );
    // }
  }

  renderScreen(){
    if(this.state.active == 'Channels'){
      return(
        <SchoolsChannels navToChat={this.props.navigation} meraStates={this} />
      )
    }
    else if(this.state.active == 'Participants'){
      return(
        <ScoolsParticipants navToChat={this.props.navigation} meraStates={this} />
      )
    }
    else if(this.state.active == 'Tags'){
      return(
        <ScoolsTags navToChat={this.props.navigation} meraStates={this} />
      )
    }
  }

}

// const SchoolDetailsStack = createStackNavigator({
//   Schools: {
//     screen: Schools,
//   },
//   SingleChat: {screen: SingleChat},
//   ChannelInfo: {screen: ChannelInfo},
//   ChatInvite: {screen: ChatInvite},
//   RequestSent: {screen: RequestSent},
//   S_createThread: {screen: S_createThread},
//   RequestGrade: {screen: RequestGrade},
//   SchoolInvite: {screen: Invite_people}
// });
//
// export default class HomeChatNav extends React.Component {
//   static navigationOptions = {
//     title: 'Schools',
//     header: null
//   };
//   render(){
//     return(
//       <SchoolDetailsStack screenProps={this.props}/>
//       {/* <Schools screenProps={this.props}/> */}
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
  },
  pageStyle: {
    alignItems: 'flex-start',
    paddingLeft: Platform.OS==="ios"?10:40,
    paddingRight: 40
  },
  viewPager: {
    top: 50,
    height: 50,
    marginLeft: 15
  },
  tabView: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: Platform.OS==="ios"?"transparent":ColorsTwo.brandPrimary,
    ...Platform.select({
      ios: {
        //marginTop: IsIphoneX()?55:60,
        marginTop:20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom:10,
        borderWidth: 2,
        //borderColor: "white",
        borderColor: "#9513fe",
        borderRadius: 7
      },
      android: {
        //marginTop: 60,
        paddingTop: 20,
      }
    })
  },
});
