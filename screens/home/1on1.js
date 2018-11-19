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
  Modal,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';
import { createStackNavigator, TabNavigator } from 'react-navigation';
import Stores from '../../stores/';
import BlurbModel from '../common/blurbModal.js';

class PartsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      unread: 0
    }
  }

  getUnreadCount(){
    console.log('1on1 componentDidMount')

    var privateData = Stores.unreadCountStore.getUnread('p', this.props.user_id)

    for (x in privateData) {
      // console.log(privateData[x])
      if((privateData[x].participant_one == this.props.user_id) || (privateData[x].participant_two == this.props.user_id)){
        console.log(privateData[x].unread_count)

        this.setState({
          unread:privateData[x].unread_count
        })

        break;
      }
    }

  }

  componentDidMount(){
    this.getUnreadCount()

    Stores.unreadCountStore.on('UNREAD_COUNT',(data)=>{
      this.getUnreadCount()
    });
  }

  componentWillUnMount(){
    Stores.unreadCountStore.removeListener('UNREAD_COUNT');
  }

  render(){
    return(
      <View style={{paddingLeft: 15, flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: (Platform.OS === 'ios') ? 0.5 : 0, borderBottomColor: "#bcbbc1"}}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 15}} >
          <Image
            source={require('../../images/null_avatar.png')}
            style={StyleSheet.absolutefill}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 15}} >
            <View style={{paddingLeft: 15, justifyContent: 'center'}} >
              <Text style={{fontFamily: "System",fontSize: 16, color: '#212121'}} >{this.props.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}} >
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontSize: 10, fontWeight:'bold', padding:4, borderRadius:2, backgroundColor:'#9513fe', color:'white', marginRight:10, display: (this.state.unread == 0) ? 'none' : 'flex'}} >{this.state.unread}</Text>
              </View>
            </View>
          </View>
          {(Platform.OS === 'ios') ? <View /> : <View style={styles.hr} />}
        </View>
      </View>
    );
  }
}

export default class OneOnOneChats extends React.Component {
  state = {
    modalVisible: false,
    allConnection: [],
    display: Stores.chartStore.getData().home.oneon1,
    blurbText: 'Loading..'
  };

  componentWillUnMount(){
    Stores.chatStore.removeListener('CONNECTION_DATA');
  }

  componentWillMount() {
    let connectionArray = Stores.chatStore.getData()
    let helpTest = Stores.verbiageStore.getData().h_chat
    this.setState({
      allConnection:connectionArray,
      blurbText: helpTest
    })

    Stores.chatStore.on('CONNECTION_DATA',(data)=>{
      this.setState({allConnection:data})
    });

    Stores.chatStore.updateData()
  }

  navToChat(a){
    this.props.navToChat.navigate('SingleChat',{userId:a.user_id, userName:a.name, isGroup:false});
  }

  closeDisplay(){
    let chartStoreData = Stores.chartStore.getData()
    chartStoreData.home.oneon1 = false
    Stores.chartStore.setData(chartStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chartStoreData = Stores.chartStore.getData()
    chartStoreData.home.oneon1 = true
    Stores.chartStore.setData(chartStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    if(this.state.allConnection.length > 0){
      return(
        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#f4f4f7" : "#fff", flex: 1}}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
          <ScrollView>
            <FlatList
              data={this.state.allConnection}
              renderItem={
                ({item}) => {
                  return(
                    <TouchableOpacity
                      onPress={() => {this.navToChat(item)}}>
                      <PartsList user_id={item.user_id} count={this.state.topCount++} avatar={require('../../images/no-image.png')} name={item.name} role={item.user_type} color={(item.user_type == 'member' ? '#757575' : '#951dfe')} points={item.points}  />
                    </TouchableOpacity>
                  )
                }
              }
              keyExtractor={(item, index) => item.user_id.toString()}
            />
          </ScrollView>
        </View>
      );
    }
    else{
      return(
        <View>
          <Text style={{fontFamily: "System",color:'grey', fontSize:20, fontWeight:'bold', textAlign:'center', letterSpacing:2}}>
            No chats
          </Text>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#d4d4da",
    borderBottomWidth: 1,
    marginLeft: 15,
    justifyContent: 'flex-end'
  },
});
