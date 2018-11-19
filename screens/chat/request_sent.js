import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Image,
  CheckBox,
  FlatList,
  StatusBar,
  ToolbarAndroid,
  AsyncStorage,
  ScrollView,
  Platform,
  Dimensions,
  Modal
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
const api =  require('../../api/index');
import IsIphoneX from '@theme/IsIphoneX';
let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var LATITUDE = 32.4241531;
var LONGITUDE = -86.9608986;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}



export default class ChatInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: 0,
      titleLine1:'--',
      titleLine2:'--'
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){
    const { navigate, goBack } = this.props.navigation;
    // let { replace } = this.props.navigation;
    let { params } = this.props.navigation.state;
    let channelId = params ? params.room : 9999;
    this.setState({
      channelId: channelId,
      titleLine1:params.channelName,
      titleLine2:params.groupName,
    });
  }

  render(){
  const { navigate, goBack, replace } = this.props.navigation;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        <View style={styles.businessNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight underlayColor={'transparent'} onPress = {() => goBack()} >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons
                  name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                  size={Platform.OS==="ios"?40:25}
                  color={Platform.OS==='ios'?"#9513fe":"#fff"}
                />
                {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.textinputView}>
            <Text style={{fontFamily: "System",color:(Platform.OS==='ios')? "black" :'white',fontSize:18}}>{this.state.titleLine1}</Text>
            <Text style={{fontFamily: "System",color:'#abacc8',fontSize:11}}>{this.state.titleLine2}</Text>
          </View>
          <View style={styles.navButtonHolder}>
            <TouchableHighlight underlayColor={'transparent'} >
              <MaterialIcons
                name="more-vert"
                size={27}
                color={Platform.OS==='ios'?"#9513fe":"#fff"}
              />
            </TouchableHighlight>

          </View>
        </View>
        <View style={styles.centerpart}>
          <Text style={styles.centerpartheader}>Request had been sent</Text>
          <Text style={styles.centerparttext}>Admin will review it</Text>
          <Text style={styles.centerparttext}>and invite you shortly</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX()?40:20 : 0,
    flex:1
  },
  textinputView:{
    flex:7,
    marginLeft:(Platform.OS==='ios')?40:15
  },
  // navText: {
  //   fontFamily: "System",
  //   color: '#c1c1d6',
  //   fontSize: 14,
  //   paddingTop:10,
  //   paddingBottom: 15,
  //   height: 40,
  //   flex: 2,
  //   height: 40,
  // },
  navButtonHolder:{
    justifyContent:'center'
  },
  navButtonback:{
    justifyContent:'center',
    paddingLeft: 8,
    flex:1,
  },
  businessNav: {
    //flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    // paddingLeft:15,
    paddingRight:15,
    //maxHeight: 50,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    zIndex: 40,
    //position: 'absolute',
    //top: 20
  },
  // addnewschool:{
  //   paddingTop:30,
  //   paddingBottom:50,
  //   marginLeft:20
  //
  // },
  // input:{
  //   fontFamily: "System",
  //   fontSize:15,
  //   color:'#fff'
  // },
  // navbar: {
  //   backgroundColor: '#484b89',
  //   height: 55,
  //   paddingLeft: 12,
  //   paddingTop: 15,
  //   flexDirection:'row'
  // },
  // containerStyle: {
  //   marginLeft: 5,
  //   marginRight: 5,
  //   flexDirection: 'row',
  //   height: 75,
  //   alignContent: 'flex-start',
  // },
  // navbartextInpView:{
  //   flex:10,
  // },
  // navbarIcon:{
  //   paddingRight:7,
  // },
  //
  // myschooltitleview:{
  //   paddingLeft: 15,
  //
  // },
  // myschooltitle:{
  //   fontFamily: "System",
  //   color:'#64679a',
  //   fontWeight:"500",
  //   fontSize:15
  // },
  // containerImage:{
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flex:2,
  // },
  // containerView:{
  //   flex:6,
  //   justifyContent: 'center',
  //   paddingLeft:10
  // },
  // containermainText:{
  //   fontFamily: "System",
  //   fontSize: 14,
  //   fontWeight: '400',
  //   color: '#212121',
  //   paddingBottom: 2
  // },
  // containersubText:{
  //   fontFamily: "System",
  //   fontSize: 12,
  //   color: '#7b7b7b'
  // },
  // containerDistanceView:{
  //   flex:2,
  //   justifyContent:'center',
  //   alignItems: 'center',
  //
  // },
  // containerDistanceText:{
  //   fontFamily: "System",
  //   fontSize: 12
  // },
  // modalNav: {
  //   padding: 15,
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor: '#484b89',
  //   maxHeight: 60
  // },
  centerpartheader:{
    fontFamily: "System",
    color:'#9c23fe',
    fontSize:16,
    paddingBottom:7,
    paddingTop:10
  },
  // centerparthead:{
  //   fontFamily: "System",
  //   color:'black',
  //   fontSize:15,
  //   paddingBottom:7,
  //   paddingTop:10
  // },
  centerparttext:{
    fontFamily: "System",
    fontSize:13.5
  },

  // sendrequest:{
  //   paddingTop:10
  // },
  centerpart:{
    backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
});
