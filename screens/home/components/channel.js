import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
}from 'react-native';

export default class Channel extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 20}} >
              <View>
                <Image
                  source={require('../../../images/Avatar15x.png')}
                  style={{height: 42, width: 42}}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 20}} >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                  <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#212121'}} >{this.props.channelName}</Text>
                  <Text style={{fontFamily: 'System',fontSize: 15}} >{this.props.time}</Text>
                </View>
                <Text style={{fontFamily: 'System',fontSize: 15}} >{this.props.channelDesc}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
