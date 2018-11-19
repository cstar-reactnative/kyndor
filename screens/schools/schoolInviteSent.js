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
  Platform
} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import Interactable from 'react-native-interactable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IsIphoneX from '@theme/IsIphoneX';
var deviceWidth = Dimensions.get('window').width;

export default class Schools extends React.Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      group_name: 'School name loading ..'
    };
  }
  static navigationOptions = {
    title: '',
    header: null
  };
  componentWillMount(){
    const { params } = this.props.navigation.state;
    const group_name = params ? params.group_name : 'School name loading ..';
    let group_address = params ? params.group_address : 'School Address'
    this.setState({group_name: group_name});
    this.setState({group_address: group_address});
  }
  render(){
    const { navigate, goBack } = this.props.navigation;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        {/* <View>
          <ImageBackground source={require('../../images/schools-thread-bg.png')} style={{width: '100%', height: 230}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: Platform.OS==="ios"?IsIphoneX()?40:25:40, paddingLeft: Platform.OS==="ios"?0:15}} >
          <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
          name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
          size={Platform.OS==="ios"?40:25}
          color="#fff"
          />
          {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "white", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
          </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} >
          <MaterialIcons
          name='info-outline'
          size={25}
          color='#fff'
          style={{paddingRight: 20}}
          />
          </View>
            </View>

            <View
          style={styles.viewPager}
          initialPage={0}>
          <View style={styles.pageStyle} key="0">
          <Text style={{fontFamily: "System",fontSize: 22, color: '#fff',alignItems:'center'}} >{this.state.group_name}</Text>
          <Text style={{fontFamily: "System",fontSize: 14, color: '#d2d2d2',alignItems:'center'}} >{this.state.group_address}</Text>
          </View>
            </View>

          </ImageBackground>
        </View> */}

        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',width:'100%',paddingTop: Platform.OS==="ios"?IsIphoneX()?40:25:15,paddingBottom: 10}}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
              <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => goBack()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                    size={Platform.OS==="ios"?40:25}
                    color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  />
                  {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                </View>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} >
                <MaterialIcons
                  name='info-outline'
                  size={25}
                  color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  style={{paddingRight: 20}}
                />
              </View> */}
              <View style={styles.viewPager} initialPage={0}>
                <View style={styles.pageStyle} key="0">
                  <Text style={{fontFamily: "System",fontSize: 14, color: (Platform.OS === 'ios') ? '#000000' : '#fff',fontWeight: 'bold',fontStyle: "normal",}} >{this.state.group_name}</Text>
                  <Text style={{fontFamily: "System",fontSize: 12, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_address}</Text>
                </View>
              </View>
              <View style={{justifyContent: 'flex-end'}}></View>
            </View>
            {/* <View style={styles.viewPager} initialPage={0}>
              <View style={styles.pageStyle} key="0">
                <Text style={{fontFamily: "System",fontSize: 22, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_name}</Text>
                <Text style={{fontFamily: "System",fontSize: 14, color: (Platform.OS === 'ios') ? '#000000' : '#fff'}} >{this.state.group_address}</Text>
              </View>
            </View> */}
          </View>
        </View>

        <View style={styles.centerpart}>
          <Image source={require('../../images/Group.png')}/>
          <Text style={styles.centerparthead}>Your request has been sent.</Text>
          <Text style={styles.centerparttext}>A peer moderator will be reviewing</Text>
          <Text style={styles.centerparttext}> your request shortly.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS==='ios'?'#f4f4f7':'#fff',
  },
  centerparthead:{
    fontFamily: "System",
    color:'#1d1c1c',
    fontSize:15,
    paddingBottom:7,
    paddingTop:10
  },
  centerparttext:{
    fontFamily: "System",
    fontSize:13.5
  },

  sendrequest:{
    paddingTop:10
  },
  centerpart:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  // pageStyle: {
  //   flex:1,
  //   justifyContent:'center',
  //   alignItems:'center'
  // },
  // viewPager: {
  //   top: 130,
  //   height: 50,
  //   marginLeft: 15,
  //   marginRight: 15
  // }
  pageStyle: {
    //flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  viewPager: {
    justifyContent: 'center'
    //top: -35,
    //height: 50,
    //marginLeft: 20,
  }
});
