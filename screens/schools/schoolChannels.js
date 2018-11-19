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
  ImageBackground,
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

class PointCard extends React.Component{
  static navigationOptions = {
    title: 'School points',
    header: null
  };
  render(){
    return(
      <View style={{marginTop:12,marginLeft:5,marginRight:5,elevation:2,borderRadius:5,marginBottom:5}}>
        <ImageBackground
          style={styles.imageContainer}
          source={require('../../images/Card.png')}>
          <View style={{flexDirection:'row',flex:0.6}}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center',marginTop:12}}>
              <ImageBackground
                style={styles.innerimageContainer}
                source={require('../../images/points-star.png')}>

                <Text style={styles.numberstyle}>345</Text>
              </ImageBackground>
            </View>
            <View style={{flex:8}}>
              <View style={{justifyContent:'center',paddingTop:10}}>
                <Text style={{fontFamily: "System",fontSize:14,color:'black'}}>You are now on 14th place by activity in Sugar Land,Texas</Text>
                <Text style={{fontFamily: "System",fontSize:12,paddingTop:3}}>Keep Going and Earn Badges</Text>
              </View>

            </View>
          </View>
          <View style={{flexDirection:'row',flex:0.2,justifyContent:'flex-end',paddingTop:15,paddingRight:20,alignItems:'center'}}>
            <View>
              <TouchableOpacity>
                <Text style={{fontFamily: "System",color:'#9513fe',fontSize:13,fontWeight:'500'}}>SEE THE CHART</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft:20}}>
              <TouchableOpacity>
                <Text style={{fontFamily: "System",color:'#9513fe',fontSize:13,fontWeight:'500'}}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

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

  starClick(){
    // subscribe / unsubscribe api call
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        if(!this.state.checked){
          // subscribe
          api.subscribeChannel({token:item, gid:this.props.groupid, cid:this.props.channelid}, (e, r) => {
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
    )
  }
}

export default class SchoolsChannels extends React.Component {
  static navigationOptions = {
    title: 'channels',
    header: null
  };

  constructor(props){
    super(props);
    this.state={
      groupChannels: [],
      publicChannel: [],
      defaultChannel: [],
      groupId: null,
      groupName: null,
      mySubscribedChannels: Stores.privateChannelStore.getData(),
      myToken: null,
      display: Stores.chartStore.getData().schools.chatrooms,
      blurbText: 'Loading ...'
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
    loaderHandler.showLoader("Loading...");
    let groupData = Stores.groupStore.getData()
    let groupId = groupData.group_id
    let helpTest = Stores.verbiageStore.getData().s_chatGroups
    this.setState({
      groupId:groupId,
      groupName: groupData.group_name,
      blurbText: helpTest
    })

    let thisComp = this
    let myUid = 0
    AsyncStorage.getItem('@KyndorStore:myId', (err, myId) => {
      myUid = myId
    });

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        thisComp.setState({myToken:tokenItem})
        api.getGroupChannels({group_id: groupId, token: tokenItem}, (e, r) => {
          loaderHandler.hideLoader();
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let channelArray = r.result.details.reverse()
              let defaultChannel = []
              let publicChannel = []

              channelArray.forEach((item,index) => {
                let subArray = item.subscribed
                if(subArray.indexOf(item.channel_id) != -1){
                  item.subscribe = true
                }
                else{
                  item.subscribe = false
                }

                if((item.access_type == 'default') || (item.access_type == 'grade')){
                  defaultChannel.push(item)
                }
                else if(item.access_type == 'public'){
                  publicChannel.push(item)
                }
                else if((item.access_type == 'private') && (item.created_by == myUid)){
                  publicChannel.push(item)
                }
              })

              this.setState({groupChannels: channelArray})
              this.setState({defaultChannel: defaultChannel})
              this.setState({publicChannel: publicChannel})
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
    // alert(a.access_type)
    if(a.access_type == 'default'){
      // this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});

      this.props.navToChat.navigate('ChatScreen',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName})
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
          // this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
          this.props.navToChat.navigate('ChatScreen',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
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
          // this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
          this.props.navToChat.navigate('ChatScreen',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.state.groupName});
        }
      }
    }
  }

  renderEmptyView(){
    if(this.state.defaultChannel.length + this.state.publicChannel.length > 4){
      return(
        <View style={{height: 70, width: '100%', backgroundColor: '#f4f4f7'}}/>
      );
    }
    else {
      return(
        <View/>
      );
    }
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.chatrooms = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.chatrooms = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    return(
      <View style={{backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff'}} >
        <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />
        <ScrollView style={{marginBottom: 250}}>

          <FlatList
            data={this.state.defaultChannel}
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
          {this.renderEmptyView()}
        </ScrollView>
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
    //marginTop: 12,
    padding: 0,
    width: 25,
    height: 35,
    borderWidth:0,
    backgroundColor:'transparent'
  },
  imageContainer:{
    height: 110,
    borderRadius:50
  },
  innerimageContainer:{
    width: 42,
    height: 42,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50
  },
  textHeader:{
    fontFamily: "System",
    color: '#484B89',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 15,
  },
  numberstyle:{
    fontFamily: "System",
    color:'#fff',
    alignSelf:'center',
    fontSize:12,
    fontWeight:'500'
  },
});
