import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  Platform,
  AsyncStorage,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Business from './businessTab';
import Interactable from 'react-native-interactable';
import { Card } from 'react-native-elements';
import SchoolsHome from './schoolsTab';
import SingleChat from '../../screens/chat/singleChat.js';
import ChannelInfo from '../../screens/chat/ChannelInfo.js';
import ChatInvite from '../../screens/chat/chat_invite.js';
import GroupInfo from '../myGroup/myGroup.js';
const api =  require('../../api/index');
import Stores from '../../stores/';

const height = Dimensions.get('window').height;

class Home extends React.Component {
  static navigationOptions = {
    title: 'School map view',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // allData:[],
      active: Stores.homeTabStore.getData(),
      announcement_text: 'loading..',
      announcement_title: 'loading..'
    }
    this._deltaY = new Animated.Value(0);
  }

  componentWillMount(){

  }

  componentDidMount(){
    Stores.groupChannelStore.updateData('owner');
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        api.privateChannel({token: item}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              // this.setState({allData : r.result});
              Stores.privateChannelStore.setData(r.result);
            }
            else {
              //this.props.navToChat.navigate('RequestSent',{room:a.channel_id});
              // alert('Failed!');
            }
          }
        })
      }
    });

    Stores.homeTabStore.on('ActiveHomeTab',(term)=>{
      this.setState({active:term})
    });
  }

  componentWillUnMount(){
    Stores.homeTabStore.removeListener('ActiveHomeTab');
  }

  render(){
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#393c63"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <View style={{backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89', alignItems: 'center'}}>
          <Animated.View style={{
            transform: [
            {
              translateY: this._deltaY.interpolate({
                  inputRange: [-150, -150, 0, 0],
                  outputRange: [-58, -58, 0, 0]
              })
            },
            {
              scale: this._deltaY.interpolate({
                  inputRange: [-150, -150, 0, 0],
                  outputRange: [0.35, 0.35, 1, 1]
              })
            }
            ]
          }}
          >
            <Image source={(Platform.OS==='ios')?require('../../images/kyndorlogowhite.png'):require('../../images/kyndorlogo.png')} style={{width: 300 ,height:120,marginTop:30,marginBottom:5}} />

          </Animated.View>
        </View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -150}]}
          boundaries={{top: 0, bottom: 0}}
          animatedValueY={this._deltaY}>
          <View style={{left: 0, right: 0, height: height-210, backgroundColor: 'white'}}>
            <View style={{flexDirection:'row',alignItems:'stretch',backgroundColor:'#484b89',width:'100%',paddingTop:20}}>

              <TouchableOpacity onPress={()=>{ Stores.homeTabStore.setData('school') }}
                style={{flex:1,borderBottomWidth:2,padding:12,borderBottomColor:(this.state.active=='school'?'yellow':'transparent')}}>
                <Text style={{textAlign:'center',color:'white'}}>SCHOOLS</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{ Stores.homeTabStore.setData('business') }}
                style={{flex:1,borderBottomWidth:2,padding:12,borderBottomColor:(this.state.active=='business'?'yellow':'transparent')}}>
                <Text style={{textAlign:'center',color:'white'}}>BUSINESS</Text>
              </TouchableOpacity>

            </View>

            {this.renderScreen(this.props.screenProps)}

          </View>
        </Interactable.View>
      </View>
    );
  }

  renderScreen(mainTabProp){
    if(this.state.active == 'school'){
      return(
        <SchoolsHome navi={this.props.navigation} changeNav={mainTabProp}/>
      )
    }
    else if(this.state.active == 'business'){
      return(
        <Business navi={this.props.navigation} changeNav={mainTabProp}/>
      )
    }
  }
}

const HomeStack = StackNavigator({
  Home: {screen: Home},
  SingleChat: {screen: SingleChat},
  ChannelInfo: {screen: ChannelInfo},
  GroupInfo: {screen: GroupInfo}
});

export default class HomeChatNav extends React.Component {
  render(){
    return(
      <HomeStack screenProps={this.props} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484b89',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginHorizontal: 40
  }
});
