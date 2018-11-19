import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ToolbarAndroid,
  Image,
  FlatList,
  AsyncStorage,
  ScrollView,
  ImageBackground,
  Platform
} from 'react-native';
import Interactable from 'react-native-interactable';
//import Accordion from 'react-native-collapsible/Accordion';
//import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
const api =  require('../../api/index');
import Stores from '../../stores/';
import BlurbModel from '../common/blurbModal.js';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

class PartsList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      checked1: false,
    }
  }

  render(){
    return(
      <View style={{paddingLeft: 8, flexDirection: 'row', backgroundColor: "#fff"}} >
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 15, flexDirection: 'row'}} >
          <Text style={{fontFamily: "System",paddingRight: 7}} >{this.props.count}</Text>
          <Image source={this.props.avatar} style={{width: 45, height: 45}}/>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 15}} >
            <View style={{paddingLeft: 15, justifyContent: 'center'}} >
              <Text style={{fontFamily: "System",fontSize: 16, color: '#212121'}} >{this.props.name}</Text>
              <Text style={{fontFamily: "System",fontSize: 16, color: this.props.color}} >{this.props.role}</Text>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}} >
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <ImageBackground source={require('../../images/points1x.png')} style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontFamily: "System",fontSize: 10, fontWeight: 'bold', color: '#951dfe', justifyContent: 'center'}} >{this.props.points}</Text>
                </ImageBackground>
              </View>
            </View> */}
          </View>
          <View style={styles.hr}>

          </View>
        </View>
      </View>
    );
  }
}

export default class SchoolsParticipants extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isCollapsed: false,
      starred: false,
      allParticipants: [],
      topCount: 1,
      display: Stores.chartStore.getData().business.participants,
      blurbText: 'Loading..'
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){
    loaderHandler.showLoader("Loading...");
    let helpTest = Stores.verbiageStore.getData().b_members
    this.setState({
      blurbText: helpTest
    })
    let channelData = Stores.groupStore.getData()
    let channelId = channelData.group_id

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        loaderHandler.hideLoader();
        alert(err)
      }
      else{
        api.getGroupParticipants({group_id: channelId, token: tokenItem}, (e, r) => {
          loaderHandler.hideLoader();
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              this.setState({allParticipants: r.result.participants})
            }
            else {
              alert('Connection Failed!');
            }
          }
        })
      }
    });
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.participants = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.participants = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  navToChat(a){
    AsyncStorage.getItem('@KyndorStore:myId', (err, myId) => {
      if(err){
        alert(err)
      }
      else{
        if (myId == a.user_id) {
          alert("It is you.")
        } else {
          this.props.navToChat.navigate('SingleChat',{userId:a.user_id, userName:a.name, isGroup:false});
        }
      }
    });
    //this.props.navToChat.navigate('SingleChat',{userId:a.user_id, userName:a.name, isGroup:false});
  }

  render(){
    return(
      <View style={{flex: 1,backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff'}}>
        <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />
        <ScrollView style={{backgroundColor: '#fff'}} >
          <View style={{marginTop: 12}} >
            {/* <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true} barStyle="light-content" /> */}

            <FlatList
              data={this.state.allParticipants}
              renderItem={
                ({item}) => {
                  return(
                    <TouchableOpacity onPress={() => {this.navToChat(item)}}>
                      <PartsList count={this.state.topCount++} avatar={require('../../images/no-image.png')} name={item.name} role={item.user_type} color={(item.user_type == 'member' ? '#757575' : '#951dfe')} points={item.points}  />
                    </TouchableOpacity>
                  )
                }
              }
              keyExtractor={(item, index) => item.user_id.toString()}
            />

          </View>

          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text style={{fontFamily: "System",paddingBottom: 15, fontSize: 16}} >Hadn't find your fellow parents?</Text>
            <TouchableOpacity onPress={() => {this.props.navToChat.navigate('B_Invite')}}>
              <Text style={{fontFamily: "System",color: '#484b89', fontSize: 16, fontWeight: 'bold'}} >INVITE USERS</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        {/* <BusyIndicator/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#d4d4da",
    borderBottomWidth: 1.5,
    marginLeft: 15,
    justifyContent: 'flex-end'
  },
  checkboxcontainer:{
    margin: 0,
    marginTop: 12,
    padding: 0,
    width: 26,
    height: 35,
    borderWidth:0,
    backgroundColor:'transparent'
  }
});
