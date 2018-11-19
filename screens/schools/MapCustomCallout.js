import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform
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
      <View style={{flex:1}}>
        <ImageBackground style={{height: 100}} source={require('../../images/school2.png')}
        >
          <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <View style={{backgroundColor:'#0000008a',marginRight:15,marginTop:15,padding:2,borderRadius:5,paddingLeft:6,paddingRight:6}}>
              <Text style={{fontFamily: 'System',fontSize:11,color:'white'}}>{this.props.distance}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={{paddingLeft:6,paddingRight:6}}>
          <Text style={{fontFamily: 'System',color:'black',fontSize:14}}>{this.props.name}</Text>
          <Text style={{fontFamily: 'System',fontSize:12}}>{this.props.address}</Text>


        </View>
      </View>
    )
  }
}
