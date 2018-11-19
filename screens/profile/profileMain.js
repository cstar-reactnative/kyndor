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
  Dimensions
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
// import S_map from './schools/s_map.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements';
import Info from './ProfileMainTabs/info';
import Posts from './ProfileMainTabs/posts';
import Replies from './ProfileMainTabs/replies';
import Likes from './ProfileMainTabs/likes';
const api =  require('../../api/index');
import Stores from '../../stores/';
import BlurbModel from '../common/blurbModal.js';
import AppConfig from '../../config.js';
const imgcdn = AppConfig.imgLoc
import IsIphoneX from '@theme/IsIphoneX';
import Colors2 from '@theme/ColorsTwo';

var deviceHeight = Dimensions.get('window').height;

class PrefBadge extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: Stores.chartStore.getData().profile.main,
    };
  }
  render(){
    return(
      <Badge
        // onPress={() => this.props.goto('Preferences')}
        containerStyle={{ backgroundColor: '#ebebeb', marginRight: 10, marginTop: 5}}>
        <Text style={{fontFamily: "System",color: '#6b6b6b', fontSize: 16, paddingVertical: 3}}>{this.props.name}</Text>
      </Badge>
    )
  }
}

export default class MainProfile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    header: null
  };

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      active: 'Info',
      name: '...',
      about: '... ... ...',
      zip_code: '',
      picUrl: '../../images/avatar-default.png',
      // pic: { uri: '../../images/avatar-default.png' },
      pic: require('../../images/avatar-default.png'),
      allPref: Stores.preferenceStore.getData(),
      blurbText: 'Loading ...'
    };
  }

  componentWillMount() {
    let helpTest = Stores.verbiageStore.getData().p_main
    this.setState({
      blurbText: helpTest
    })

    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        console.log(err)
      }
      else{
        api.myProfile(token, (e, r) => {
          if(e){
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){

              let allData = r.result.subscribed_groups[0];
              console.log(JSON.stringify(allData));
              this.setState({
                name: allData.name,
                about: (allData.about == null) ? '' : allData.about,
              })
              if(allData.profile_pic == null || allData.profile_pic == 'no-image.png'){
                // nothing
              }
              else{
                this.setState({
                  pic: {uri: imgcdn+allData.profile_pic}
                })
              }

              // alert('Success')

            }
            else {
              // alert('Failed!');
            }
          }
        })
      }
    });
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.profile.main = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.profile.main = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    const {navigate, goBack} = this.props.navigation;

    return(
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" /> */}

        <View style={{height: (deviceHeight)*32/100, backgroundColor: 'white'}}>
          {/* <View> */}
          <ImageBackground
            style={[{height: (deviceHeight)*32/100}, StyleSheet.absoluteFill]}
            source={this.state.pic}
            // source={this.state.ImageSource}
          >
            <View style={[{height: (deviceHeight)*32/100, backgroundColor: 'rgba(0,0,0,0.1)'}, StyleSheet.absoluteFill]} />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: IsIphoneX() ? 50 : 30}} >
              <View style={{justifyContent: 'flex-start'}} >
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} >
                <TouchableOpacity onPress={() => navigate('MyProfile', {ProfileMain: this})}>
                  <MaterialIcons
                    name='edit'
                    size={25}
                    color='#fff'
                    style={{paddingRight: 15,paddingLeft: 15,paddingBottom: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ProfileSettings')}>
                  <MaterialIcons
                    name='settings'
                    size={25}
                    color='#fff'
                    style={{paddingRight: 15,paddingLeft: 15,paddingBottom: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 100,flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignContent: 'center'}} >
              <View style={{justifyContent: 'flex-start', alignContent: 'center'}} >
                <Text style={{fontFamily: "System",fontSize: 24, color: '#fff', position: 'absolute', bottom: 15}} >
                  {this.state.name}
                </Text>
              </View>
              {/* <View style={{justifyContent: 'flex-end', bottom: 10}} >
                <ImageBackground source={require('../../images/points-star.png')} style={{width: 50, height: 50}} ><Text style={{color: '#fff', alignSelf: 'center', top: 15, fontSize: 15}} >353</Text></ImageBackground>
              </View>*/}
            </View>

            {/* <View
                style={{
                flexDirection: "row",
                //alignItems: "stretch",
                backgroundColor: "transparent",
                //width: "90%",
                marginTop: 60,
              ...Platform.select({
                ios: {
                //marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                //borderWidth: 2,
                //borderColor: "white",
                //borderRadius: 7
                },
                android: {
                paddingTop: 20,
                }
              })
                }}
                >

                <TouchableOpacity
              onPress={()=>{ this.setState({active:'Info'})}}
              style={{
              flex: 1,
              padding: 10,
                ...Platform.select({
              ios: {
              borderRightWidth: 2,
              borderRightColor: "white",
              backgroundColor:
              this.state.active == "Info" ? "white" : "transparent"
              },
              android: {
              borderBottomWidth: 2,
              borderBottomColor: this.state.active == "Info" ? "yellow" : "transparent"
              }
                })
              }}>
              <Text style={{
                fontFamily: "System",
              textAlign: "center",
                ...Platform.select({
              ios: {
              color: this.state.active == "Info" ? "black" : "white",
              },
              android: {
              color: "white",
              }
                }),
              fontSize: 15
              }}
              >
                Info
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={()=>{ this.setState({active:'Posts'})}}
              style={{
              flex: 1,
              padding: 10,
                ...Platform.select({
              ios: {
              borderRightWidth: 2,
              borderRightColor: "white",
              backgroundColor:
              this.state.active == "Posts"
              ? "white"
              : "transparent"
              },
              android: {
              borderBottomWidth: 2,

              borderBottomColor:
              this.state.active == "Posts"
              ? "yellow"
              : "transparent"
              }
                })
              }}>
              <Text style={{
                fontFamily: "System",
              textAlign: "center",
                ...Platform.select({
              ios: {
              color:
              this.state.active == "Posts" ? "black" : "white",
              },
              android: {
              color: "white",
              }
                }),
              fontSize: 15
              }}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{ this.setState({active:'Replies'})}}
              style={{
              flex: 1,
              padding: 10,
                ...Platform.select({
              ios: {
              borderRightWidth: 2,
              borderRightColor: "white",
              backgroundColor:
              this.state.active == "Replies"
              ? "white"
              : "transparent"
              },
              android: {
              borderBottomWidth: 2,

              borderBottomColor:
              this.state.active == "Replies"
              ? "yellow"
              : "transparent"
              }
                })
              }}>
              <Text adjustsFontSizeToFit style={{
                fontFamily: "System",
              textAlign: "center",
                ...Platform.select({
              ios: {
              color:
              this.state.active == "Replies" ? "black" : "white",
              },
              android: {
              color: "white",
              }
                }),
              fontSize: 15
              }}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{ this.setState({active:'Likes'})}}
              style={{
              flex: 1,
              padding: 10,
                ...Platform.select({
              ios: {
              //borderWidth: 1,
              //borderRightColor: "white",
              backgroundColor:
              this.state.active == "Likes" ? "white" : "transparent"
              },
              android: {
              borderBottomWidth: 2,

              borderBottomColor:
              this.state.active == "Likes" ? "yellow" : "transparent"
              }
                })
              }}>
              <Text style={{
                fontFamily: "System",
              textAlign: "center",
                ...Platform.select({
              ios: {
              color:
              this.state.active == "Likes" ? "black" : "white",
              },
              android: {
              color: "white",
              }
                }),
              fontSize: 15
              }}>Likes</Text>
                </TouchableOpacity>

            </View>*/}

          </ImageBackground>
          {/* </View> */}
        </View>
        {this.renderScreen()}
        {/* </View> */}

      </View>
      );
    }

    renderScreen(){
      if(this.state.active == 'Info'){
        return(
          <Info navToChat={this.props.navigation} profileMain={this} />
        )
      }
      else if(this.state.active == 'Posts'){
        return(
          <Posts navToChat={this.props.navigation} />
        )
      }
      else if(this.state.active == 'Replies'){
        return(
          <Replies navToChat={this.props.navigation} />
        )
      }
      else if(this.state.active == 'Likes'){
        return(
          <Likes navToChat={this.props.navigation}/>
        )
      }
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
      // borderColor: 'red',
      // borderWidth: 2
    },
    toolbar: {
      backgroundColor: 'transparent',
      height: 60,
      position: 'absolute',
      top: 50
    },
    pageStyle: {
      alignItems: 'flex-start',
      paddingLeft: 40,
      paddingRight: 40
    },
    viewPager: {
      top: 80,
      height: 80,
      marginLeft: 15
    },
    modalcontainer1: {
      flex: 1,
      alignContent: "flex-start",
      backgroundColor: "white",
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    modalcontainer2: {
      flex: 0.3,
      alignContent: "center",
      justifyContent: 'center',
      flexDirection: "row",
      paddingLeft: 15,
      paddingRight: 15
    },
    modaltextFieldContainer: {
      flex: 1,
      paddingLeft: 15,
      alignContent: 'center',
      justifyContent: 'center'
    },
    modaltextsection: {
      paddingTop: 20,
      paddingLeft: 20,
      borderBottomWidth: 1.5,
      borderBottomColor: "#e0dbdb",
      paddingBottom: 25
    },
    modaltextsection1: {
      paddingTop: 15,
      marginLeft: 20,
      borderBottomWidth: 1.5,
      borderBottomColor: "#e0dbdb",
      paddingBottom: 15
    },
    modaltextsection2: {
      paddingTop: 15,
      marginLeft: 20,
      paddingBottom: 15
    },
    modalcameraiconstyle: {
      color: "#9c9ebf",
      position: "absolute",
      top: 44,
      left: 40,
      color: "#9513fe"
    },
    modaltextstyle: {
      fontFamily: "System",
      fontSize: 15,
      fontWeight: "500",
      color: "#444444"
    },
    modaltextFieldstyle: {
      fontFamily: "System",
      fontWeight: "600"
    },
    modalimageContainer: {
      width: 80,
      height: 80,
      marginTop: 20,
      borderRadius: 50
    },
    modaloverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(244, 231, 254, 1)",
      borderRadius: 50
    },
    modalFab: {
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
    }
  });
