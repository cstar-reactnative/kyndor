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
  ScrollView,
  AsyncStorage,
  FlatList,
  Platform
} from 'react-native';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import Stores from '../../stores/';
import BlurbModel from '../common/blurbModal.js';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const api =  require('../../api/index');

class ChannelView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      checked: this.props.subscribed,
    }
  }

  starClick(){
    loaderHandler.showLoader("Loading...");
    // subscribe / unsubscribe api call
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        if(!this.state.checked){
          // subscribe
          api.subscribeChannel({token:item, gid:this.props.groupid, cid:this.props.channelid}, (e, r) => {
            loaderHandler.hideLoader();
            if(e){
              // alert("Error: "+e);
            }
            else{
              if(r.success == true){
                this.setState({checked: !this.state.checked})
                Stores.groupChannelStore.updateData();
              }
              else {
                alert('Something went wrong. Please try again.')
              }
            }
          })
        }
        else{
          // unsubscribe
          api.unSubscribeChannel({token:item, gid:this.props.groupid, cid:this.props.channelid}, (e, r) => {
            loaderHandler.hideLoader();
            if(e){
              // alert("Error: "+e);
            }
            else{
              if(r.success == true){
                this.setState({checked: !this.state.checked})
                Stores.groupChannelStore.updateData();
              }
              else {
                alert('Something went wrong. Please try again.')
              }
            }
          })
        }
      }
    });
  }

  render(){
    return(
      <View style={{backgroundColor: "#fff"}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 7, paddingRight: 10 }} >
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
            </View>
            <View style={{flex: 0.78}} >
              <Text style={{fontFamily: "System",fontSize: 16, fontWeight: '400', color: '#212121', paddingLeft: 10}} >{this.props.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={{height: 42, width: 50, marginTop: 8}} >
            <CheckBox
              iconType='material'
              checkedIcon='star'
              uncheckedIcon='star-border'
              checked={this.state.checked}
              checkedColor='#9513fe'
              containerStyle={styles.checkboxcontainer}
              onPress={() => {this.starClick()}}
            />
          </TouchableOpacity>
        </View>
        {(Platform.OS === 'ios') ? <View style={{marginLeft: 60,height: 0.7, width: "100%", backgroundColor: "#bcbbc1"}}/> : <View/>}
        {/* <BusyIndicator style={{zIndex: 99}}/> */}
      </View>
    )
  }
}

export default class SchoolsChannels extends React.Component {

  constructor(props){
    super(props);
    this.state={
      groupChannels: [],
      privateChannel: [],
      publicChannel: [],
      groupId: null,
      display: Stores.chartStore.getData().business.chatrooms,
      blurbText: 'Loading..'
    }
  }

  componentWillUnMount(){
    Stores.searchStore.removeListener('SEARCH_FOR');
  }

  searchChannel(term){
    let allChannels = this.state.groupChannels;
    let searchChannels = []

    allChannels.forEach((item,index) => {
      if ((item.channel_name).toLowerCase().indexOf(term) != -1){
        searchChannels.push(item)
        this.props.meraStates.setState({searchResult: searchChannels})
      }
    })
  }

  componentWillMount(){
    //loaderHandler.showLoader("Loading...");
    let helpTest = Stores.verbiageStore.getData().b_chatGroups
    let groupData = Stores.groupStore.getData()
    let groupId = groupData.group_id
    this.setState({
      groupId:groupId,
      groupName: groupData.group_name,
      blurbText: helpTest
    })

    let myUid = 0
        AsyncStorage.getItem('@KyndorStore:myId', (err, myId) => {
          myUid = myId
        });

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        //loaderHandler.hideLoader();
        alert(err)
      }
      else{
        api.getGroupChannels({group_id: groupId, token: tokenItem}, (e, r) => {
          //loaderHandler.hideLoader();
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let channelArray = r.result.details.reverse()
              let publicChannel = []
              let privateChannel = []

              channelArray.forEach((item,index) => {
                let subArray = item.subscribed
                if(subArray.indexOf(item.channel_id) != -1){
                  item.subscribe = true
                }
                else{
                  item.subscribe = false
                }

                if(item.access_type == 'default'){
                  publicChannel.push(item)
                }
                else if(item.access_type == 'public'){
                  privateChannel.push(item)
                }
                else if((item.access_type == 'private') && (item.created_by == myUid)){
                  privateChannel.push(item)
                }
              })

              this.setState({groupChannels: channelArray})
              this.setState({publicChannel: publicChannel})
              this.setState({privateChannel: privateChannel})
            }
            else {
              alert('Connection Failed!');
            }
          }
        })
      }
    });

    Stores.searchStore.on('SEARCH_FOR',(term)=>{
      this.searchChannel(term)
    });
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

  navToChat(a){
    // this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});

    if(a.access_type == 'default'){
      this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
    }
    else if(a.access_type == 'grade'){
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.navToChat.navigate('RequestGrade',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
      }
      else{
        if(channelData.state==0){
          this.props.navToChat.navigate('RequestGrade',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
        }
        else{
          this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
        }
      }
    }
    else{
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.navToChat.navigate('ChatInvite',{room:a.channel_id, channelName:a.channel_name, groupName:this.state.groupName});
      }
      else{
        if(channelData.state==0){
          this.props.navToChat.navigate('RequestSent',{room:a.channel_id, channelName:a.channel_name, groupName:this.state.groupName});
        }
        else if(channelData.state==1){
          this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
        }
      }
    }

  }

  renderEmptyView(){
    if(this.state.publicChannel.length + this.state.privateChannel.length > 4)
    {
      return(
        <View style={{height: 70, width: '100%', backgroundColor: '#fff'}}/>
      );
    } else {
      return(
        <View/>
      );
    }
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.chatrooms = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.chatrooms = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    return(
      <View style={{backgroundColor: '#f4f4f7'}}>
        <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />
        <ScrollView style={{marginBottom: 250}}>
          {/* <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'white', borderBottomWidth: 0.5, borderBottomColor: "#bcbbc1", borderTopWidth: 0.5, borderTopColor: "#bcbbc1"}}>
            <Text style={{fontFamily: "System", color: '#212121'}}>Click STAR(* next to chat group) to choose your favorite chat groups. You can also create your own chat group by clicking on + icon on the right down</Text>
          </View> */}
          <FlatList
            data={this.state.publicChannel}
            renderItem={
              ({item}) =>{
                return(
                  <TouchableOpacity onPress={() => {this.navToChat(item)}}>
                    <ChannelView groupid={this.state.groupId} channelid={item.channel_id} name={item.channel_name} icon={item.icon} subscribed={item.subscribe}/>
                  </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.channel_id.toString()}
          />

          <Text style={styles.textHeader}>Custom Chat Groups {'    \u25BC'}</Text>

          <FlatList
            data={this.state.privateChannel}
            renderItem={
              ({item}) =>{
                return(
                  <TouchableOpacity onPress={() => {this.navToChat(item)}}>
                    <ChannelView groupid={this.state.groupId} channelid={item.channel_id} name={item.channel_name} icon={item.icon} subscribed={item.subscribe}/>

                  </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.channel_id.toString()}
          />
          {this.renderEmptyView()}
        </ScrollView>
        {/* <BusyIndicator style={{zIndex: 99}}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1
  },
  checkboxcontainer:{
    //margin: 0,
    //marginTop: 10,
    padding: 0,
    width: 25,
    height: 35,
    borderWidth:0,
    backgroundColor:'transparent'
  },
  textHeader:{
    fontFamily: "System",
    color: '#484B89',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 15,
  },
});
