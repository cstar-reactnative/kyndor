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
import {StackNavigator, TabNavigator} from 'react-navigation';
// import S_map from './schools/s_map.js';
import ScoolsParticipants from './groupParticipants.js';
import ScoolsTags from '../../screens/schools/schoolTags.js';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from "react-native-material-textfield";
import SchoolsChannels from './groupChannels.js';
import Stores from '../../stores/'
import api from '../../api/index';
import SingleChat from '../../screens/chat/singleChat.js';
import ChannelInfo from '../../screens/chat/ChannelInfo.js';
import S_createThread from '../../screens/schools/schoolCreateThread';
import ChatInvite from '../../screens/chat/chat_invite.js';
import RequestSent from '../../screens/chat/request_sent.js'
import { Toolbar, ThemeProvider } from 'react-native-material-ui';
const uiTheme = {
  toolbar: {
    container: {
      paddingTop: (Platform.OS === 'ios') ? 30:7,
      //top: Platform.OS==="ios"?10:0,
      //paddingLeft: 15,
      height: 60,
      backgroundColor: 'transparent'
    },
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

  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 7, paddingRight: 10 }} >
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
          </View>
          <View style={{flex: 0.78}} >
            <Text style={{fontSize: 16, fontWeight: '400', color: '#212121', paddingLeft: 10}} >{this.props.name}</Text>
          </View>
        </View>
      </View>
    )
  }
}

class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      active: 'Channels',
      fabVisible: true,
      searchScreen: false,
      searchResult: [],
      groupId: null,
      groupName: 'Loading...',
      groupAddress: 'Loading...'
    }
  }

  static navigationOptions = {
    title: 'OneOnOne',
    header: null
  };

  setFabVisible(visible) {
    this.setState({ fabVisible: visible });
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
    console.log('Back Clicked')
  }

  goToChat(a){
    // alert(a.access_type)
    this.props.navigation.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
  }

  componentWillMount(){
    console.log('@ my groups')
    let navData = this.props.screenProps.navigation.state.params;
    console.log(JSON.stringify(navData))
    this.setState({
      groupId: navData.groupId,
      groupName: navData.groupName,
      groupAddress: navData.groupAddress
    })
    Stores.groupStore.setData({group_id:navData.groupId, group_name:navData.groupName});

    // Stores.myGroupStore.setData(all_data)

    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log('Back')
      this.backFunction()
      return true;
    })
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress");
  }

  render(){

    if(this.state.searchScreen){
      return(
        <ThemeProvider uiTheme={uiTheme}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />

            <Toolbar
              style={{backgroundColor: '#393c63'}}
              leftElement={
                <TouchableOpacity>

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

            <View style={{flex: 1, backgroundColor: 'white'}}>
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

          </View>
        </ThemeProvider>
      );
    }
    else{
      return(
        <ThemeProvider uiTheme={uiTheme}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />

            <View style={{flex: 1, backgroundColor: 'white'}}>
              <View>
                <ImageBackground
                  source={require('../../images/schools-thread-bg.png')}
                  style={{width: '100%', height: 230}}>

                  <Toolbar
                    // leftElement=""
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

                  <View
                    style={styles.viewPager}
                    initialPage={0}>
                    <View style={styles.pageStyle} key="0">
                      <Text style={{fontSize: 24, color: '#fff', fontWeight: Platform.OS==="ios"?'normal':'bold'}} >{this.state.groupName}</Text>
                      <Text style={{fontSize: 14, color: '#d2d2d2'}} >{this.state.groupAddress}</Text>
                    </View>
                  </View>

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
                            borderRightColor: "white",
                            backgroundColor: this.state.active == "Channels" ? "white" : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "Channels" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text
                        style={{
                          textAlign: "center",
                          ...Platform.select({
                            ios: {
                              color: this.state.active == "Channels" ? "black" : "white",
                            },
                            android: {
                              color: "white",
                            }
                          }),
                          fontSize: 13
                        }}>
                        {Platform.OS==="ios"?"Chat Groups":"CHAT GROUPS"}
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
                            borderRightColor: "white",
                            backgroundColor: this.state.active == "Participants" ? "white" : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "Participants" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text
                        style={{
                          textAlign: "center",
                          ...Platform.select({
                            ios: {
                              color: this.state.active == "Participants" ? "black" : "white",
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

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ active: "Tags" });
                        this.setFabVisible(false);
                      }}
                      style={{
                        flex: 1,
                        padding: 10,
                        ...Platform.select({
                          ios: {
                            backgroundColor:
                            this.state.active == "Tags" ? "white" : "transparent"
                          },
                          android: {
                            borderBottomWidth: 2,
                            borderBottomColor: this.state.active == "Tags" ? "yellow" : "transparent"
                          }
                        })
                      }}>
                      <Text
                        style={{
                          textAlign: "center",
                          ...Platform.select({
                            ios: {
                              color: this.state.active == "Tags" ? "black" : "white",
                            },
                            android: {
                              color: "white",
                            }
                          }),
                          fontSize: 13
                        }}>
                        {Platform.OS==="ios"?"Tags":"TAGS"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                </ImageBackground>
              </View>
              {this.renderScreen()}
            </View>

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
              onPress={() =>this.props.navigation.navigate('S_createThread')}>
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

const SchoolDetailsStack = StackNavigator({
  Schools: {
    screen: Schools,
  },
  SingleChat: {screen: SingleChat},
  ChannelInfo: {screen: ChannelInfo},
  ChatInvite: {screen: ChatInvite},
  RequestSent: {screen: RequestSent},
  S_createThread: {screen: S_createThread}
});

export default class HomeChatNav extends React.Component {
  static navigationOptions = {
    title: 'Schools',
    header: null
  };
  render(){
    return(
      <SchoolDetailsStack screenProps={this.props}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484b89'
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
    backgroundColor: "transparent",
    marginTop: 60,
    ...Platform.select({
      ios: {
        marginLeft: 20,
        marginEnd: 20,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 7
      },
      android: {
        paddingTop: 20,
      }
    })
  },
});
