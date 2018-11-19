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
  ImageBackground
} from 'react-native';
import Interactable from 'react-native-interactable';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements'
const api =  require('../../api/index');
import Stores from '../../stores/';

class PartsList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      checked1: false,
    }
  }

  render(){
    return(
      <View style={{paddingLeft: 8, flexDirection: 'row'}} >
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 15, flexDirection: 'row'}} >
          <Text style={{paddingRight: 7}} >{this.props.count}</Text>
          <Image
            source={this.props.avatar}
            style={{width: 45, height: 45}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 15}} >
            <View style={{paddingLeft: 15, justifyContent: 'center'}} >
              <Text style={{fontSize: 16, color: '#212121'}} >{this.props.name}</Text>
              <Text style={{fontSize: 16, color: this.props.color}} >{this.props.role}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}} >
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <ImageBackground source={require('../../images/points1x.png')} style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}} >
                  <Text style={{fontSize: 10, fontWeight: 'bold', color: '#951dfe', justifyContent: 'center'}} >{this.props.points}</Text>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      </View>
    );
  }
}

export default class SchoolsParticipants extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allParticipants: [],
      checked1: false,
      topCount: 1,
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){
    let channelData = Stores.groupStore.getData()
    let channelId = channelData.group_id

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        api.getGroupParticipants({group_id: channelId, token: tokenItem}, (e, r) => {
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

  navToChat(a){
    this.props.navToChat.navigate('SingleChat',{userId:a, isGroup:false});
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#fff'}} >
          <View style={{marginTop: 12, marginBottom: 25}} >
            {/* <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true} barStyle="light-content" /> */}

            <FlatList
            data={this.state.allParticipants}
            renderItem={
              ({item}) => {
                return(
                  <TouchableOpacity onPress={() => {this.navToChat(item.user_id)}}>
                    <PartsList count={this.state.topCount++} avatar={require('../../images/no-image.png')} name={item.name} role={item.user_type} color={(item.user_type == 'member' ? '#757575' : '#951dfe')} points={item.points}  />
                  </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.user_id.toString()}
            />

          </View>

          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text style={{paddingBottom: 15, fontSize: 16}} >Can't find your fellow parents?</Text>
            <Text style={{color: '#484b89', fontSize: 16, fontWeight: 'bold'}} >INVITE USERS</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1.5,
    marginLeft: 15,
    justifyContent: 'flex-end'
  },
  checkboxcontainer:{
    margin: 0,
    marginTop: 12,
    padding: 0,
    width: 45,
    height: 35,
    borderWidth:0,
    backgroundColor:'transparent'
  }
});
