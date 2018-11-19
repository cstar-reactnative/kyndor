import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, createStackNavigator } from "react-navigation";
import ToggleSwitch from 'toggle-switch-react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  AsyncStorage,
  Switch,
  Modal,
  WebView,
  ActivityIndicator
} from 'react-native';
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');
var DeviceInfo = require('react-native-device-info');
import Colors2 from '@theme/ColorsTwo';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {falseSwitchIsOn: false,modalVisible: false,loadLink: '',};
  }
  static navigationOptions = {
    title: 'Application settings',
    headerTintColor: (Platform.OS === 'ios') ? Colors2.brandPrimary : '#ffffff',
    headerStyle: {
      backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
      elevation: 5,
    },
    headerTitleStyle: {
      color: (Platform.OS === 'ios') ? "#000000" : '#ffffff',
    }
  };

  logDeviceOut(){
    var thisComp = this
    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        alert(err)
      }
      else{
        api.removeDevice({
          token:token,
          device_id:DeviceInfo.getDeviceId()
        },
        (e, r) => {
          if(e){
            console.log("updateDeviceInfo Error: ");
            console.log(e)
          }
          else{
            if(r.success == true){
              console.log('updateDeviceInfo success')
            }
            else {
              console.log('updateDeviceInfo Error');
            }
            console.log(r)
          }
        })
      }
    });
  }

  logOut(){
    this.logDeviceOut()
    AsyncStorage.removeItem('@KyndorStore:token');
    AsyncStorage.removeItem('@KyndorStore:myName');
    AsyncStorage.removeItem('@KyndorStore:myEmail');
    AsyncStorage.removeItem('@KyndorStore:myImage');
    AsyncStorage.removeItem('@KyndorStore:myId');
    AsyncStorage.removeItem('@KyndorStore:schoolFilters');
    AsyncStorage.removeItem('@KyndorStore:businessFilter');
    Stores.filterStore.setSchoolFilters([]);
    Stores.filterStore.setBusinessFilters([]);
    Stores.groupChannelStore.setData([]);
    Stores.announcementStore.reStartDemo([])
    Stores.rootNavStore.setData('Login');
    Stores.homeTabStore.setData('school');
  }

  cancelModal(){
    this.setState({
      modalVisible: false,
      selectedMember: []
    })
  }

  ActivityIndicatorLoadingView() {

    return (

      <ActivityIndicator
        color='#009688'
        size='large'
        style={{position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
        justifyContent: 'center'}}
      />
    );
  }

  render(){

    const { navigate } = this.props.navigation;
    return(
      <ScrollView style={styles.container1}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <Modal
          animationType="slide"
          onRequestClose={() => { this.setState({modalVisible: false})}}
          visible={this.state.modalVisible}>

          <View style={{flex: 1, backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff', paddingTop: IsIphoneX() ? 15 : 0, paddingBottom: IsIphoneX() ? 35 : 0 }}>
            <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
            <View style={styles.subContainer} >
              <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.cancelModal()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                    size={Platform.OS==="ios"?40:25}
                    color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  />
                  {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                </View>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <Text style={{fontFamily: "System",color: (Platform.OS === 'ios') ? '#000000' : '#fff'}}></Text>
              </View> */}
              <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <Text style={{fontFamily: "System",color: '#fff'}}></Text>
              </View>
            </View>
              <WebView
                style={{justifyContent: 'center', alignItems: 'center', flex:1,}}
                source={{uri: this.state.loadLink}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={this.ActivityIndicatorLoadingView}
                startInLoadingState={true}
              />
            </View>
          </Modal>

        <View style={styles.section}>
          <View style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="mail"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.textemailcss}>Let others see your email</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                onValueChange={value=>
                  this.setState({falseSwitchIsOn: value})
                }
                onTintColor='#c989fe'
                style={{marginBottom: 10, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                thumbTintColor= {Colors2.brandPrimary}
                value={this.state.falseSwitchIsOn}
              />
            </View>
          </View>

          <View style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="notifications"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <TouchableOpacity onPress={() =>navigate('ProfileNotifications')}>
                <Text style={styles.subtextViewcss}  >Notifications{"\n"}
                  <Text style={{fontFamily: "System",fontSize:12, color:'#949494'}}>Turned On</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          {/* <TouchableOpacity style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
            style={styles.iconstyle}
            name="info"
            size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >About us</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="chat"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Contact us</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="event-note"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Privacy Policy</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="info"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Terms of Service</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="help"
                size={23}
              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Help</Text>
            </View>
          </TouchableOpacity> */}

        </View>
        {/* <TouchableOpacity onPress={() =>navigate('ChangePassword')} style={styles.section}>
          <View style={styles.firstrow}>
            <View style={styles.iconsView}>
              <MaterialIcons
                style={styles.iconstyle}
                name="vpn-key"
                size={23}

              />
            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Change Password</Text>
            </View>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.logOut()} style={styles.section}>
          <View style={styles.firstrow}>
            <View style={styles.iconsView}>

            </View>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextLogout} >Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex:1,
    alignContent: 'flex-start',
    backgroundColor:(Platform.OS==='ios')?'#f4f4f7':'#fff',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  section:{
    paddingLeft:15,
    paddingRight:15,
    paddingTop:13,
    paddingBottom:20,
    borderBottomColor:'#efefef',
    borderBottomWidth:1
  },
  textemailcss:{
    fontFamily: "System",
    fontSize:15,
    color:'#2e2e2e',
    paddingLeft: 5
  },

  firstrow: {
    alignContent: 'flex-start',
    flexDirection:'row',
    paddingTop:10
  },
  lastsection:{
    flexDirection:'row',
    height:100,

  },
  subtextViewcss:{
    fontFamily: "System",
    fontSize:15,
    color:'#2e2e2e'
  },
  subtextLogout:{
    fontFamily: "System",
    fontSize:15,
    color:Colors2.brandPrimary
  },
  iconsView:{
    flex:2
  },
  textViewcss:{
    flex:8
  },
  iconstyle:{
    color:'#9c9ebf'
  },
  switch:{
    flex:2
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efeff9',
    //maxHeight: 60
  },
  subContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios:{
        backgroundColor:"#efeff9",
        paddingTop: 25,
        paddingLeft: 0,
        paddingBottom: 0,
      },
      android:{
        backgroundColor:'#393c63',
        paddingTop:10,
        paddingLeft:15,
        paddingBottom:10,
      }
    })
  }
});
