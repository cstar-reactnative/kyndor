import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
}from 'react-native';

export default class PrivateChannel extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={{backgroundColor: '#ecedf3', paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15}} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#212121'}} >Dl Class Ranger</Text>
                <View style={{flexDirection: 'row'}} >
                  <Text style={{fontFamily: 'System',fontSize: 15, marginRight: 10}} >Yesterday, 11:24</Text>
                  <View style={{backgroundColor: '#484b89', paddingLeft: 6, paddingRight: 6, borderRadius: 3}} >
                    <Text style={{fontFamily: 'System',fontSize: 14, color: '#fff'}} >2</Text>
                  </View>
                </View>
              </View>
              <Text style={{fontFamily: 'System',fontSize: 15}} >How can we do that? It's irrational and not possible...</Text>
            </TouchableOpacity>
        );
    }
}
