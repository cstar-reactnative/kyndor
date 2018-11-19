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
import Stores from '../../stores/';
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
      titleLine2:'--',
      Allresult:[]
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
  sendInvite(replace){
    let channelId = this.state.channelId;
    //  let channelId = this.props.channelId
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        api.sendChatInviteRequest({channelId: channelId, token: tokenItem}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              Stores.privateChannelStore.updateData();
              replace('RequestSent',{channelId: channelId});
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
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        <View style={styles.businessNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight underlayColor={'transparent'} onPress = {() => goBack()}>
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
            <Text style={{fontFamily: 'System',color:(Platform.OS==='ios')? "black" :'white',fontSize:18}}>{this.state.titleLine1}</Text>
            <Text style={{fontFamily: 'System',color:'#abacc8',fontSize:11}}>{this.state.titleLine2}</Text>
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
          <Text style={styles.centerparthead}>This a custom created chat group.</Text>
          <Text style={styles.centerparthead}>You have not yet been invited to this chat group.</Text>
          <Text style={styles.centerparttext}> To start a conversation, you must </Text>
          <Text style={styles.centerparttext}>send an invitation request.</Text>
          <Text style={styles.centerpartsubtext}> When the admin has invited you to this </Text>
          <Text style={styles.centerparttext}>group, you can start chatting.</Text>
          <TouchableOpacity style={{marginTop:25}} onPress={() => this.sendInvite(replace)}>
            <View>
              <Text style={{fontFamily: 'System',color:'#9c23fe'}}>SEND INVITE REQUEST</Text>
            </View>
          </TouchableOpacity>
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
  centerpartheader:{
    fontFamily: "System",
    color:'#9c23fe',
    fontSize:16,
    paddingBottom:7,
    paddingTop:10
  },
  centerparttext:{
    fontFamily: "System",
    fontSize:13.5
  },
  centerpart:{
    backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
});
