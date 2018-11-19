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
  ScrollView,
  ImageBackground,
  Platform
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BlurbModel from '../common/blurbModal.js';
// const BusyIndicator = require('react-native-busy-indicator');
// const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import Stores from '../../stores/'
import Colors2 from '@theme/ColorsTwo';

class NoSchools extends React.Component{
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'School',
    header: null
  };

  render(){
    return(
      <View style={{flex: 1,backgroundColor: (Platform.OS === 'ios') ? "#f4f4f7" : "#fff"}} >
        {/* <BusyIndicator style={{zIndex: 99}}/> */}
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 20, paddingRight: '15%', marginTop: 50}} >
          <Text style={{fontFamily: "System", fontWeight: 'bold', fontSize: 17, color: '#212121'}} >You havn't added any schools yet</Text>
          <Text style={{fontFamily: "System", fontSize: 15, marginTop: 15, lineHeight: 23, color: '#747474'}} >
            Click on "LOOK FOR NEARBY SCHOOLS" and enter the school's zip code to find your favorite schools.
          </Text>
        </View>

        <View style={{marginTop:25, marginLeft:'10%'}} >

          <View style={{justifyContent: 'space-between', alignItems: 'flex-start'}} >
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection:'row'}}
              onPress={() => Stores.screenStore.setData({tab: 'school', screen: 'default'})}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/schoolsNearBy.png')}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text>
                  Just exploring?
                </Text>
                <Text style={{fontFamily: "System", color: Colors2.brandPrimary, fontSize: 14, fontWeight: '400',marginTop:5}} >LOOK FOR NEARBY SCHOOLS</Text>
              </View>

            </TouchableOpacity>
          </View>

          <View style={{justifyContent:'space-between', alignItems:'flex-start',marginTop:25}} >
            <TouchableOpacity
              style={{alignItems: 'flex-start', flexDirection:'row'}}
              onPress={() => Stores.screenStore.setData({tab: 'school', screen: 'SchoolFilter', info: {fromHome: true}})}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/schoolSearch.png')}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text>
                  Know your school zip or name?
                </Text>
                <Text style={{fontFamily: "System", color: Colors2.brandPrimary, fontSize: 14, fontWeight: '400',marginTop:5}} >FIND YOUR SCHOOL</Text>
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

  static navigationOptions = {
    title: 'School',
    header: null
  };

  componentDidMount(){
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
            style={{height: 42, width: 42,marginLeft: (Platform.OS === 'ios') ? 10 : 7}}
          />
        </View>
        <View style={{flex: 1, marginLeft: 20}} >
          <View style={{flexDirection: 'row',  marginTop: 10, justifyContent: 'space-between'}} >
            <Text style={{fontSize: 16, color: '#212121'}} >{this.props.channelName}</Text>

            <Text style={{fontSize: 10, fontWeight:'bold', padding:4, borderRadius:2, backgroundColor:Colors2.brandPrimary, color:'white', marginRight:10, display: (this.state.unread == 0) ? 'none' : 'flex'}} >{this.state.unread}</Text>
          </View>
          {/* <Text style={{fontFamily: "System", fontSize: 15, color: '#8e8e93'}} >{this.props.channelDesc}</Text> */}
          {/* {(Platform.OS === 'ios') ? <View style={{marginTop: 10, height: 0.5, width: "100%", backgroundColor: "#bcbbc1"}}/> : <View/>} */}
        </View>
      </View>
    );
  }
}

class PrivateChannel extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'School',
    header: null
  };
  render(){
    return(
      <View style={{backgroundColor: '#ecedf3', paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15}} >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text style={{fontFamily: "System", fontSize: 16, fontWeight: 'bold', color: '#212121'}} >Dl Class Ranger</Text>
          <View style={{flexDirection: 'row'}} >
            <Text style={{fontFamily: "System", fontSize: 15, marginRight: 10}} >Yesterday, 11:24</Text>
            <View style={{backgroundColor: '#484b89', paddingLeft: 6, paddingRight: 6, borderRadius: 3}} >
              <Text style={{fontFamily: "System", fontSize: 14, color: '#fff'}} >2</Text>
            </View>
          </View>
        </View>
        <Text style={{fontFamily: "System", fontSize: 15}} >How can we do that? It's irrational and not possible...</Text>
      </View>
    );
  }
}

class PointsCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: Stores.chartStore.getData().home.schools,
    }
  }
  static navigationOptions = {
    title: 'School',
    header: null
  };
  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.home.schools = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }
  render(){
    if(this.state.display){
      return(
        <View style={{marginTop:12,marginLeft:5,marginRight:5,elevation:2,borderRadius: (Platform.OS === 'ios') ? 14 : 5,marginBottom:5, overflow: 'hidden'}}>
          <ImageBackground
            style={styles.imageContainer}
            source={require('../../images/blurb-card.png')}>
            <View style={{flexDirection:'row',flex:0.6}}>
              <View style={{flex:2,justifyContent:'center',alignItems:'center',marginTop:12}}>
                <ImageBackground
                  style={styles.innerimageContainer}
                  source={require('../../images/points-star.png')}>

                  <Text style={styles.numberstyle}>{this.props.points}</Text>
                </ImageBackground>
              </View>
              <View style={{flex:8}}>
                <View style={{justifyContent:'center',paddingTop:10}}>
                  <Text style={{fontFamily: "System", fontSize:14,color:'black'}}>
                    {this.props.text}
                  </Text>
                  <Text style={{fontFamily: "System", fontSize:12,paddingTop:3}}>Keep Going and Earn Badges</Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row',flex:0.2,justifyContent:'flex-end',paddingTop:15,paddingRight:20,alignItems:'center'}}>
              <View>
                <TouchableOpacity>
                  <Text style={{fontFamily: "System", color:'#9513fe',fontSize:13,fontWeight:'500'}}>SEE THE CHART</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft:20}}>
                <TouchableOpacity onPress={() => {this.closeDisplay()}}>
                  <Text style={{fontFamily: "System", color:'#9513fe',fontSize:13,fontWeight:'500'}}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )
    }
    else{
      return null;
    }
  }
}

class SchoolName extends React.Component{
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'School',
    header: null
  };
  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',margin: 15}} >
        <TouchableOpacity onPress={() => {
          Stores.screenStore.setData({
            tab: 'school',
            screen: 'SchoolDetailsScreen',
            info: {
              group_id: this.props.groupId,
              group_name: this.props.name,
              group_address: this.props.groupAddress,
              fromHome: false,
            }
          });
          // this.props.navi.navigate('SchoolRoute');
          let sendData = {
            group_id: this.props.groupId,
            group_name: this.props.name,
            group_address: this.props.groupAddress,
          }
          Stores.groupStore.setData(sendData);
          console.log('sendData: '+ JSON.stringify(sendData));
          this.props.navi.navigate('SchoolDetails',sendData);
        }}
        >
          <Text numberOfLines={1} ellipsizeMode='middle' style={{fontFamily: "System", color: '#484b89', fontSize: 16,}} >
            {this.props.name.toUpperCase()}{'    \u25BC'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class SchoolDataView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      myChannels: []
    }
  }

  static navigationOptions = {
    title: 'School',
    header: null
  };

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
      this.props.goToChat.navigate('SingleChat',{groupId:gid, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.props.schoolName});
    }
    else{
      let channelData = this.checkMyChannel(a.channel_id)
      if(channelData == null){
        this.props.goToChat.navigate('ChatInvite',{room:a.channel_id, channelName:a.channel_name, groupName:this.props.schoolName});
      }
      else{
        if(channelData.state==0){
          this.props.goToChat.navigate('RequestSent',{room:a.channel_id, channelName:a.channel_name, groupName:this.props.schoolName});
        }
        else if(channelData.state==1){
          this.props.goToChat.navigate('SingleChat',{groupId:gid, channelId:a.channel_id, isGroup:true, channelName:a.channel_name, groupName:this.props.schoolName});
        }
      }
    }

  }

  render(){
    return(
      <View>
        <SchoolName navi={this.props.goToChat} groupId={this.props.gid} groupAddress={this.props.address} name={this.props.schoolName}/>
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
        //{(Platform.OS === 'ios') ? <View style={{marginTop: 5, height: 0.5, width: "100%", backgroundColor: "#bcbbc1"}}/> : <View/>}
      )
    }
    else if(this.state.active == 'business'){
      return(
        <Text style={{fontFamily: "System",}}>You haven't subscribed to any chat group of this school</Text>
      )
    }
  }
}

export default class SchoolsHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mySchools: [],
      display: Stores.chartStore.getData().home.schools,
      blurbText: 'Loading ...'
    }
  }

  static navigationOptions = {
    title: 'School members',
    header: null
  };

  setMySchools(itemArray){
    var schoolArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'general' && i.state == 1){
          schoolArray.push(i)
        }
      })
    }
    // alert(schoolArray.length)
    // loaderHandler.hideLoader();
    if(schoolArray.length > 0){
      this.setState({mySchools: schoolArray});
    }
  }

  componentWillMount() {
    let helpTest = Stores.verbiageStore.getData().h_school
    this.setState({
      blurbText: helpTest
    })

    Stores.verbiageStore.on('VERBIAGE_DATA',(data)=>{
      this.setState({
        blurbText: data.h_school
      })
    });

    let itemArray = Stores.groupChannelStore.getData()
    // alert(itemArray);
    this.setMySchools(itemArray);

    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      this.setMySchools(data);
    });
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
    Stores.verbiageStore.removeListener('VERBIAGE_DATA');
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.home.schools = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.home.schools = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    // return <NoSchools/>
    if (this.state.mySchools.length > 0) {
      return (
        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#f4f4f7" : "#fff", flex: 1}} >
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          <BlurbModel text={this.state.blurbText} display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}} />

          <FlatList
            data={this.state.mySchools}
            renderItem={
              ({item}) =>
              <SchoolDataView
                schoolName={item.name}
                allChannels={item.channels}
                myChannels={item.subscribed_channels}
                goToChat={this.props.navToChat}
                gid={item.group_id}
                address={item.meta_data.school_address}
              />
            }
            keyExtractor={(item, index) => item.group_id.toString()}
          />
        </View>
      )
    }
    else {
      return <NoSchools changeNav={{...this.props.changeNav}} />
    }
  }
}

const styles = StyleSheet.create({

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


  numberstyle:{
    color:'#fff',
    alignSelf:'center',
    fontFamily: "System",
    fontSize:12,
    fontWeight:'500'

  },
});
