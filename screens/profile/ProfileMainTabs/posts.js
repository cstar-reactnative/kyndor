import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

class PostView extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flexDirection: 'row', marginBottom: 20, padding: 20}} >
        <View>
          <Image
            source={require('../../../images/Avatar15x.png')}
            style={{height: 42, width: 42}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 20}} >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
            <Text style={{fontFamily: "System",fontSize: 14}} >Byram Hills High School / 1st grade</Text>
            <Text style={{fontFamily: "System",fontSize: 14}} >9:34 AM</Text>
          </View>
          <Text style={{fontFamily: "System",fontSize: 16, color: '#212121'}} >How can we do that? It's irrational and not...</Text>
        </View>
      </View>
    )
  }
}

export default class Posts extends React.Component {
  render(){
    return (
      <View>
        <Text style={{fontFamily: "System",color:'grey', fontSize:20, fontWeight:'bold', textAlign:'center', letterSpacing:2}}>
          Work in progress
        </Text>
      </View>
    );
  }
}
