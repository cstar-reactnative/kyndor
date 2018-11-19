import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  FlatList,
  AsyncStorage,
  Image,
  Platform
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Stores from '../../stores/';
import BlurbModel from '../common/blurbModal.js';
import Colors2 from '@theme/ColorsTwo';

class Nobusinesss extends React.Component{
  render(){
    return(
      <View style={{flex: 1,backgroundColor: (Platform.OS === 'ios') ? "#f4f4f7" : "#fff"}} >
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 20, paddingRight: '15%', marginTop: 50}} >
          <Text style={{fontFamily: "System",fontWeight: 'bold', fontSize: 17, color: '#212121'}} >
            You haven’t added any businesses yet
          </Text>
          <Text style={{fontFamily: "System",fontSize: 15, marginTop: 15, lineHeight: 23, color: '#747474'}} >
            Please click on "LOOK FOR NEARBY BUSINESSES" and enter zip code to search your favorite business.
          </Text>
        </View>

        <View style={{marginTop:25, marginLeft:'10%'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'flex-start'}} >
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection:'row'}}
              onPress={() => Stores.screenStore.setData({tab: 'business', screen: 'MapScreen'})}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/bussinessNearBy.png')}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text>
                  Just Exploring
                </Text>
                <Text style={{fontFamily: "System",color: Colors2.brandPrimary, fontSize: 14, fontWeight: '400',marginTop:5}} >LOOK FOR NEARBY BUSINESSES</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{justifyContent:'space-between', alignItems:'flex-start',marginTop:25}} >
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection:'row'}}
              onPress={() => Stores.screenStore.setData({tab: 'business', screen: 'B_filter', info:{fromHome: true}})}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/bussinessSearch.png')}
                />
              </View>
                <View style={{flexDirection:'column'}}>
                <Text>
                  Know your school zip or name?
                </Text>
                <Text style={{fontFamily: "System",color:Colors2.brandPrimary, fontSize: 14, fontWeight: '400',marginTop:5}} >SEARCH FOR BUSINESS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

class Channel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      unread: 0
    }
  }

  componentWillMount(){
    this.setState({
      unread: Stores.unreadCountStore.getUnread('c', this.props.channelId)
    })

    Stores.unreadCountStore.on('UNREAD_COUNT',(data)=>{
      this.setState({
        unread: Stores.unreadCountStore.getUnread('c', this.props.channelId)
      })
    });
  }

  componentWillUnMount(){
    Stores.unreadCountStore.removeListener('UNREAD_COUNT');
  }

  render(){
    return(
      <View style={{flexDirection: 'row', marginBottom: 0, backgroundColor: 'white',padding: (Platform.OS === 'ios') ? 5 : 8, borderBottomWidth: (Platform.OS === 'ios') ? 0.5 : 0, borderBottomColor: "#bcbbc1"}} >
        <View>
          <Image
            source={require('../../images/Avatar15x.png')}
            style={{height: 42, width: 42, marginLeft: (Platform.OS === 'ios') ? 10 : 7}}
          />
        </View>
        <View style={{flex: 1, marginLeft: 20}} >
          <View style={{flexDirection: 'row',  marginTop: 10, justifyContent: 'space-between'}} >
            <Text style={{fontSize: 16, color: '#212121'}} >{this.props.channelName}</Text>
            <Text style={{fontSize: 10, fontWeight:'bold', padding:4, borderRadius:2, backgroundColor:Colors2.brandPrimary, color:'white', marginRight:10, display: (this.state.unread == 0) ? 'none' : 'flex'}} >{this.state.unread}</Text>
          </View>
          {/* <Text style={{fontFamily: "System",fontSize: 15,color: '#8e8e93'}} >{this.props.channelDesc}</Text> */}
          {/* {(Platform.OS === 'ios') ? <View style={{marginTop: 10, height: 0.5, width: "100%", backgroundColor: "#bcbbc1"}}/> : <View/>} */}
        </View>
      </View>
    );
  }
}

class BusinessName extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 15}} >
        <TouchableOpacity onPress={() => {
          Stores.screenStore.setData({
            tab: 'school',
            screen: 'SchoolDetailsScreen',
            info: {
              group_id: this.props.groupId,
              group_name: this.props.name,
              group_address: this.props.groupAddress,
              fromHome: true
            }})

            let sendData = {
              group_id: this.props.groupId,
              group_name: this.props.name,
              group_address: this.props.groupAddress,
            }
            Stores.groupStore.setData(sendData);
            console.log('sendData: '+ JSON.stringify(sendData));
            this.props.navi.navigate('SchoolDetails',sendData);

        }} >
          <Text numberOfLines={1} ellipsizeMode='middle' style={{fontFamily: "System", color: '#484b89', fontSize: 16,}} >
            {this.props.name.toUpperCase()}{'   \u25BC'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class BussinessDataView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      myChannels: []
    }
  }

  componentDidMount(){
    let allChan = this.props.allChannels
    let subChan = this.props.myChannels
    let myChan = []

    allChan.forEach((item,index) => {
      if((subChan.indexOf(item.channel_id) != -1) || ((item.channel_name == 'General Information') && (item.access_type == 'default'))) {
        // item.subscribe = true
        myChan.push(item)
      }
      else{
        // item.subscribe = false
      }
    })
    this.setState({myChannels:myChan})
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

    navToChat(a, gid){
      // this.props.navToChat.navigate('SingleChat',{groupId:this.state.groupId, channelId:a.channel_id, isGroup:true});

      if(a.access_type == 'default'){
        this.props.goToChat.navigate('SingleChat',{groupId:gid, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.props.businessName});
      }
      else{
        let channelData = this.checkMyChannel(a.channel_id)
        if(channelData == null){
          this.props.goToChat.navigate('ChatInvite',{room:a.channel_id, channelName:a.channel_name, groupName:this.props.businessName});
        }
        else{
          if(channelData.state==0){
            this.props.goToChat.navigate('RequestSent',{room:a.channel_id, channelName:a.channel_name, groupName:this.props.businessName});
          }
          else if(channelData.state==1){
            this.props.goToChat.navigate('SingleChat',{groupId:gid, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.props.businessName});
          }
        }
      }

    }

  render(){
    return(
      <View>
        <BusinessName groupId={this.props.gid} groupAddress={this.props.address} name={this.props.businessName}/>
        {this.renderChannels()}
      </View>
    )
  }

  renderChannels(){
    if(this.state.myChannels.length > 0){
      return(
        <FlatList
          data={this.state.myChannels}
          renderItem={({item}) =>{
            return(
              <TouchableOpacity onPress={() => this.navToChat(item,this.props.gid)}>
                <Channel
                  channelName={item.channel_name}
                  channelDesc={''}
                  channelId={item.channel_id}
                />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => item.channel_id.toString()}
        />
      )
    }
    // else if(this.state.active == 'business'){
    //   return(
    //     <Text>You haven't subscribed to any channel of this business</Text>
    //   )
    // }
  }

}

export default class businesssHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mybusinesss: [],
      display: Stores.chartStore.getData().home.business,
      blurbText: "Loading ..."
    }
  }

  setMyBusiness(itemArray){
    var businessArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type != 'general'){
          businessArray.push(i)
        }
      })
    }
    // alert(businessArray.length)
    if(businessArray.length > 0){
      this.setState({mybusinesss: businessArray});
    }
  }

  componentWillMount() {
    let itemArray = Stores.groupChannelStore.getData()
    let helpTest = Stores.verbiageStore.getData().h_business
    this.setState({
      blurbText: helpTest
    })
    this.setMyBusiness(itemArray);

    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      this.setMyBusiness(data);
    });
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
  }

  closeDisplay(){
    let chartStoreData = Stores.chartStore.getData()
    chartStoreData.home.business = false
    Stores.chartStore.setData(chartStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chartStoreData = Stores.chartStore.getData()
    chartStoreData.home.business = true
    Stores.chartStore.setData(chartStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    if (this.state.mybusinesss.length > 0) {
      return (
        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#f4f4f7" : "#fff", flex: 1}} >
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
          <FlatList
            data={this.state.mybusinesss}
            renderItem={
              ({item}) =>

              <BussinessDataView
                businessName={item.name}
                allChannels={item.channels}
                myChannels={item.subscribed_channels}
                goToChat={this.props.navToChat}
                gid={item.group_id}
                address={item.meta_data.address}
              />
            }
            keyExtractor={(item, index) => item.group_id.toString()}
          />
        </View>
      )
    }
    else {
      return (
        <View style={{padding:10}}>
          <TouchableOpacity style={{
            padding:10,
            borderWidth:2,
            borderColor:'grey',
            borderRadius:5,
            marginBottom: 15
          }} onPress={ () => {
            this.props.goToChat.navigate('SingleChat',{groupId:9633, channelId:442189, isGroup:true, channelName:'test channel', groupName:'group_name'})}}>
            <Text>
              Room 101
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding:10,
              borderWidth:2,
              borderColor:'grey',
              borderRadius:5,
              marginBottom: 15
            }}
            onPress={ () => {
            this.props.goToChat.navigate('SingleChat',{groupId:1015, channelId:442462, isGroup:true, channelName:'no channel name', groupName:'group_name'})}}>
            <Text>
              Room 102
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
