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
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Stores from '../../stores/'
class Nobusinesss extends React.Component{
  render(){
    return(
      <View style={{flex: 1,backgroundColor:'white'}} >
        <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20, marginTop: 50}} >
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#212121'}} >
            You don't own any business.
          </Text>
        </View>
      </View>
    )
  }
}

class BusinessName extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{backgroundColor: '#eaf7fd', borderRadius: 4, borderWidth: 1, borderColor: '#d6d7da', margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:10, paddingBottom:10, paddingRight:18, paddingLeft:18}} >
        <View>
          <Text style={{color: '#484b89', fontSize: 18, fontWeight: '500'}} >
            {this.props.name}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => Stores.screenStore.setData({tab: 'business', screen: 'B_details', info: {group_id: this.props.groupId, group_name: this.props.name, group_address: this.props.groupAddress, fromHome: true} })} >
            <MaterialIcons
              name="info-outline"
              size={25}
              style={{color:'#9513fe'}}
            />
          </TouchableOpacity>
        </View>
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

  }

  render(){
    return(
      <View>
        <BusinessName groupId={this.props.gid} groupAddress={this.props.address} name={this.props.businessName}/>
      </View>
    )
  }
}

export default class businesssHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mybusinesss: [],
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
    this.setMyBusiness(itemArray);

    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      this.setMyBusiness(data);
    });
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
  }

  render(){
    if (this.state.mybusinesss.length > 0) {
      return (
        <View style={{backgroundColor: '#fff', flex: 1}} >
          <StatusBar backgroundColor="#32345f" translucent={false} barStyle="light-content" />

          <FlatList
            data={this.state.mybusinesss}
            renderItem={
              ({item}) =>
              <BussinessDataView
                businessName={item.name}
                gid={item.group_id}
                address={item.meta_data.address}
              />
            }
            keyExtractor={(item, index) => item.name}
          />
        </View>
      )
    }
    else {
      return <Nobusinesss changeNav={{...this.props.changeNav}} />
    }
  }
}
