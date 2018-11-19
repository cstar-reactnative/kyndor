import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';

export default class CustomCallout extends React.Component{
  constructor(props){
    super(props);
    this.state= {
    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <ImageBackground style={{flex: 0.6, height: 100, width: 100}} source={require('../../images/background.png')}
        >
        </ImageBackground>
        <View>
          <Text style={{flex: 0.25}}>{this.props.name}</Text>
          <Text style={{flex: 0.15}}>{this.props.address}</Text>
        </View>
      </View>
    )
  }
}
