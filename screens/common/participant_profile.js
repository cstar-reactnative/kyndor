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
  ViewPagerAndroid,
  Platform,
  ScrollView
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var deviceWidth = Dimensions.get('window').width;

export default class ProfileParticipant extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
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
        <View>
          <ImageBackground source={require('../../images/profile_bg.png')} style={{width: '100%', height: 235}}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: 50, paddingLeft: 15}} >
              <View style={{justifyContent: 'flex-start'}} >
                <MaterialIcons
                  name='arrow-back'
                  size={25}
                  color='#fff'
                />
              </View>
            </View>

            <View
              style={styles.viewPager}
              initialPage={0}>
              <View style={styles.pageStyle} key="0">
                <Text style={{fontFamily: 'System',fontSize: 22, color: '#fff'}} >Marta Steward</Text>
              </View>
            </View>

          </ImageBackground>
        </View>
        <ScrollView style={{padding:15,height:100}}>
          <Text style={{fontFamily: 'System',color:'#5b5e95',fontWeight:"500"}}>About me</Text>
          <Text style={{fontFamily: 'System',paddingTop:8,color:'#313131',paddingBottom:20,marginBottom:15,lineHeight:20}}>Good mother and talented architech.I love my sons and wants to give everything I can to them
          </Text>
        </ScrollView>
        <View style={styles.centerpart}>
          <View>
            <TouchableOpacity >
              <Text style={styles.centerpart_text}>ADD TO MY PAGE</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:25}}>
            <TouchableOpacity style={{backgroundColor:'#9513fe',paddingLeft:15,paddingRight:15,paddingTop:8,paddingBottom:8,borderRadius:3,elevation: 3}}>
              <Text style={styles.centerpart_whitetext}>START CONVERSATION</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingBottom:25
  },
  centerparthead:{
    fontFamily: 'System',
    color:'#1d1c1c',
    fontSize:15,
    paddingBottom:7,
    paddingTop:10
  },
  centerpart_text:{
    fontFamily: 'System',
    fontSize:13.5,
    color:'#9513fe',
    fontWeight:"500"
  },
  centerpart_whitetext:{
    fontFamily: 'System',
    fontSize:13.5,
    color:'white',
    fontWeight:"500"
  },

  sendrequest:{
    paddingTop:10
  },
  centerpart:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  pageStyle: {
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30
  },
  viewPager: {
    top: 150,
    height: 50,
    marginLeft: 15,
    marginRight: 15
  }
});
