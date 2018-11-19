import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  ToolbarAndroid,
  Image,
  ImageBackground,
  Dimensions,
  ViewPagerAndroid
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var deviceWidth = Dimensions.get('window').width;

export default class Schools extends React.Component {
  constructor(props) {
    super(props);

  }
  static navigationOptions = {
    title: '',
    header: null
  };
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" translucent={true} barStyle="light-content" />
            <View style={{flex:0.2,justifyContent:'center',alignItems:'center',marginTop:20}}>
              <ImageBackground
                style={styles.imageContainer}
                source={require('../../images/points-star.png')}>

                <Text style={styles.numberstyle}>345</Text>
              </ImageBackground>


            </View>
            <View style={styles.centerpart}>
              <Image source={require('../../images/pic_rewards1.png')}/>
              <Text style={styles.centerparthead}>What is reward points?</Text>
              <Text style={styles.centerparttext}>We are gonna add new wonderful</Text>
              <Text style={styles.centerparttext}>feature - search for child care</Text>
              <Text style={styles.centerparttext}>centers</Text>
              <TouchableHighlight style={styles.showchartbtn} >
                <Text style={styles.showcharttext}>SHOW CHART</Text>
              </TouchableHighlight>
            </View>

          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerparthead:{
    color:'#1d1c1c',
    fontSize:23,
    paddingBottom:7,
    paddingTop:20,

  },
  centerparttext:{
    fontSize:16
  },
  showchartbtn:{
    marginTop:30,
    backgroundColor:'#9513fe',
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:45,
    paddingRight:45,
    borderRadius:2,
    elevation:3,
  },
  showcharttext:{
    color:'white',
    fontWeight:'500'
  },
  centerpart:{
  flex: 1,
  justifyContent:'center',
  alignItems:'center'
  },
  imageContainer:{
    width: 70,
    height: 70,

    borderRadius:50
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    borderRadius:50
  },
  numberstyle:{
    color:'#fff',
    alignSelf:'center',
    top:20,
    fontSize:18,
    fontWeight:'500'

  },

});
