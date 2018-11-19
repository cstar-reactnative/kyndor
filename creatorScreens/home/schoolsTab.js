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
  ImageBackground
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const BusyIndicator = require('react-native-busy-indicator');
// const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import Stores from '../../stores/'

class NoSchools extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style={{flex: 1,backgroundColor:'white'}} >
        {/* <BusyIndicator style={{zIndex: 99}}/> */}
        <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20, marginTop: 50}} >
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#212121'}} >
            You don't own any school.
          </Text>
        </View>
      </View>
    )
  }
}

class SchoolName extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity onPress={() => this.props.navigat.navigate('GroupInfo',{groupId:this.props.groupId, groupName:this.props.name, groupAddress:this.props.groupAddress}) } >
        <View style={{backgroundColor: '#eaf7fd', borderRadius: 4, borderWidth: 1, borderColor: '#d6d7da', margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:10, paddingBottom:10, paddingRight:18, paddingLeft:18}} >
          <View>
            <Text style={{color: '#484b89', fontSize: 18, fontWeight: '500'}} >
              {this.props.name}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="info-outline"
              size={25}
              style={{color:'#9513fe'}}
            />
          </View>
        </View>
      </TouchableOpacity>
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

  componentDidMount(){

  }

  render(){
    return(
      <View>
        <SchoolName navigat={this.props.naviga} groupId={this.props.gid} groupAddress={this.props.address} name={this.props.schoolName}/>
      </View>
    )
  }

}

export default class SchoolsHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mySchools: [],
    }
  }

  setMySchools(itemArray){
    console.log('@setMySchools data: '+JSON.stringify(itemArray))
    var schoolArray = []
    if(itemArray){
      console.log('@itemArray')
      itemArray.forEach(function(i){
        console.log('@itemArray. i: '+JSON.stringify(i))

        if(i.group_type == 'general'){
          schoolArray.push(i)
        }
      })
    }

    if(schoolArray.length > 0){
      this.setState({mySchools: schoolArray});
    }
  }

  componentWillMount() {
    console.log('@School tabs')
    let itemArray = Stores.groupChannelStore.getData()
    console.log('groups: '+itemArray);
    this.setMySchools(itemArray);

    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      console.log('update groups: '+data);
      this.setMySchools(data);
    });
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
  }

  render(){
    // return <NoSchools/>
    if (this.state.mySchools.length > 0) {
      return (
        <View style={{backgroundColor: '#fff', flex: 1}} >
          <StatusBar backgroundColor="#32345f" translucent={false} barStyle="light-content" />

          <FlatList
            data={this.state.mySchools}
            renderItem={
              ({item}) =>
              <SchoolDataView
                schoolName={item.name}
                gid={item.group_id}
                address={item.meta_data.school_address}
                naviga={this.props.navi}
              />
            }
            keyExtractor={(item, index) => item.name}
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

    fontSize:12,
    fontWeight:'500'

  },
});
