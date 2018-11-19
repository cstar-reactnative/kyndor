import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  FlatList,
  Platform,
  AsyncStorage,
  TouchableHighlight

} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const api =  require('../../../api/index');
import Stores from '../../../stores/';
import { Badge } from 'react-native-elements';

class PrefBadge extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Badge
        containerStyle={{ backgroundColor: '#ebebeb', marginRight: 10, marginTop: 5}}>
        <Text style={{fontFamily: "System",color: '#6b6b6b', fontSize: 16, paddingVertical: 3}}>{this.props.name}</Text>
      </Badge>
    )
  }
}

class InfoSection extends React.Component{
  render(){
    return(
      <View style={{marginTop: 20}} >
        <Text style={{color: '#474b88', fontSize: 16}} >My badges</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15}}>
          <View style={{height: 38, width: 38, padding: 5, backgroundColor: '#f4e8fe', borderRadius: 5, marginRight: 10}} >
            <MaterialIcons
              name='favorite'
              size={28}
              color='#951dfe'
              style={{justifyContent: 'center', alignContent: 'center'}}
            />
          </View>
          <View style={{height: 38, width: 38, padding: 5, backgroundColor: '#f4e8fe', borderRadius: 5, marginRight: 10}} >
            <MaterialIcons
              name='donut-small'
              size={28}
              color='#951dfe'
              style={{justifyContent: 'center', alignContent: 'center'}}
            />
          </View>
          <View style={{height: 38, width: 38, padding: 5, backgroundColor: '#f4e8fe', borderRadius: 5, marginRight: 10}} >
            <MaterialIcons
              name='star'
              size={28}
              color='#951dfe'
              style={{justifyContent: 'center', alignContent: 'center'}}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default class Posts extends React.Component {

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      allPref: Stores.preferenceStore.getData(),
      //display: Stores.chartStore.getData().profile.main,
    };
  }

  componentWillMount() {

  }

  // closeDisplay(){
  //   let chatStoreData = Stores.chartStore.getData()
  //   chatStoreData.profile.main = false
  //   Stores.chartStore.setData(chatStoreData)
  //   this.setState({
  //     display: false
  //   })
  // }
  //
  // showDisplay(){
  //   let chatStoreData = Stores.chartStore.getData()
  //   chatStoreData.profile.main = true
  //   Stores.chartStore.setData(chatStoreData)
  //   this.setState({
  //     display: true
  //   })
  // }

  render(){
    return (

      <View style={{flex:1, paddingHorizontal: 20, marginBottom: 30}} >

        <View style={{paddingBottom:20, marginTop:10}}>
          <Text style={{fontFamily: "System",color: '#474b88', fontSize: 16, paddingBottom: 5}}>About me</Text>
          <Text style={{fontFamily: "System",color: '#212121', fontSize: 16, lineHeight: 20}} >
            {this.props.profileMain.state.about}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily: "System",color: '#474b88', fontSize: 16}}>My preferences</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10,paddingBottom: 90}} >

            <FlatList
              //style={{flexDirection: 'column', flexWrap: 'wrap', paddingTop: 5, paddingBottom: 5}}
              data={this.state.allPref}
              renderItem={
                ({item}) =>
                <PrefBadge
                  // goto={navigate}
                  name={item}
                />
              }
              keyExtractor={(item, index) => item}
            />

          </View>

          {/* <InfoSection/> */}
        </View>
      </View>

    );
  }
}
