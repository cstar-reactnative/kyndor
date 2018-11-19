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
  ImageBackground
} from 'react-native';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import Stores from '../../stores/';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const api =  require('../../api/index');

class PointCard extends React.Component{
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
                <Text style={{fontSize:14,color:'black'}}>You are now on 14th place by activity in Sugar Land,Texas</Text>
                <Text style={{fontSize:12,paddingTop:3}}>Keep Going and Earn Badges</Text>
              </View>

            </View>
          </View>
          <View style={{flexDirection:'row',flex:0.2,justifyContent:'flex-end',paddingTop:15,paddingRight:20,alignItems:'center'}}>
            <View>
              <TouchableOpacity>
                <Text style={{color:'#9513fe',fontSize:13,fontWeight:'500'}}>SEE THE CHART</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft:20}}>
              <TouchableOpacity>
                <Text style={{color:'#9513fe',fontSize:13,fontWeight:'500'}}>CLOSE</Text>
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
            <Text style={{fontSize: 16, fontWeight: '400', color: '#212121', paddingLeft: 10}} >{this.props.name}</Text>
          </View>
        </View>
        <CheckBox
          iconType='material'
          checkedIcon='star'
          uncheckedIcon='star-border'
          checked={this.state.checked}
          checkedColor='#9513fe'
          containerStyle={styles.checkboxcontainer}
          onPress={() => {this.starClick()}}
        />
      </View>
    )
  }
}

export default class SchoolsChannels extends React.Component {
  static navigationOptions = {
    title: '',
    header: null
  };

  constructor(props){
    super(props);
    this.state={
      groupChannels: [],
      publicChannel: [],
      defaultChannel: [],
      groupId: null,
      myToken: null
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
    // let groupData = Stores.groupStore.getData()
    // let groupId = groupData.group_id
    // let groupId = this.props.meraStates.state.groupId
    let thisComp = this
    let myUid = 0
    AsyncStorage.getItem('@KyndorStore:myId', (err, myId) => {
      myUid = myId
    });

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log('Token Error: '+err)
      }
      else{
        console.log('Saved Token: '+tokenItem)

        api.myOwnGroup(tokenItem, (e, r) => {
          console.log('myProfile API:')
          console.log('e: '+e)
          console.log('r: '+JSON.stringify(r))
          if(e){
            return null
          }
          else{
            if(r.success){
              let groupId = r.result[0].group_id
              thisComp.setState({groupId:groupId})
              console.log('GroupId in Channel: '+ groupId)

              api.getGroupChannels({group_id: groupId, token: tokenItem}, (e, r) => {
                if(e){
                  console.log("Error: "+e);
                }
                else{
                  console.log('r: '+JSON.stringify(r))
                  if(r.success == true){
                    let channelArray = r.result.details
                    let defaultChannel = []
                    let publicChannel = []

                    channelArray.forEach((item,index) => {
                      item.subscribe = true

                      if(item.access_type == 'default'){
                        defaultChannel.push(item)
                      }
                      else if(item.access_type == 'public'){
                        publicChannel.push(item)
                      }
                      else if((item.access_type == 'private') && (item.created_by == myUid)){
                        publicChannel.push(item)
                      }
                    })

                    thisComp.setState({groupChannels: channelArray})
                    thisComp.setState({defaultChannel: defaultChannel})
                    thisComp.setState({publicChannel: publicChannel})
                  }
                  else {
                    alert('Connection Failed in Chat Groups!');
                  }
                }
              })

            }
            else {
              console.log('success - false')
            }
          }
        })
      }
    });

    Stores.searchStore.on('SEARCH_FOR',(term)=>{
      this.searchChannel(term)
    });
  }

  navToChat(a){
    this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});
  }

  render(){
    return(
      <ScrollView style={{backgroundColor: '#fff', marginBottom: 20}} >

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

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1
  },
  checkboxcontainer:{
    margin: 0,
    marginTop: 12,
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
    color: '#484B89',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 15,
  },
  numberstyle:{
    color:'#fff',
    alignSelf:'center',
    fontSize:12,
    fontWeight:'500'
  },
});
