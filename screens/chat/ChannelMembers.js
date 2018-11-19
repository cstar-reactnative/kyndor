import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  StatusBar,
  ToolbarAndroid,
  ScrollView,
  TouchableHighlight,
  Switch
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IsIphoneX from '@theme/IsIphoneX';

class ParticipantView extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return(
      <View style={{paddingLeft: 15, flexDirection: 'row', marginTop: 12}} >
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 15}} >
          <Image
            source={require('../../images/null_avatar.png')}
            style={StyleSheet.absolutefill}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 15}} >
            <View style={{paddingLeft: 15, justifyContent: 'center'}} >
              <Text style={{fontFamily: 'System',fontSize: 16, color: '#212121'}} >Bernadatte</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}} >
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#9513fe'}} >Moderator</Text>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      </View>
    )
  }
}

export default class AboutChannel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      falseSwitchIsOn: false
    };
  }

  static navigationOptions = {
    title: 'Chat group info',
    header: null
  };

  render(){
    return(
      <View>
        <View style={styles.modalNav}>
          <TouchableOpacity
            onPress={() => {

            }}>
            <MaterialIcons
              name="close"
              size={22}
              style={{color:'white'}}
            />
          </TouchableOpacity>
          <Text style={{fontFamily: 'System',marginLeft: 10, color: 'white', fontSize: 20}}>Group Members</Text>
        </View>

        <View style={{margin:20}}>
          <MemberViewScreen mainState={this}/>
        </View>

        <TouchableHighlight
          style={styles.modalFab} underlayColor={'transparent'}
          onPress={() => }>
          <MaterialIcons
            name="check"
            size={Platform.OS === "ios" ? 30 : 22}
            color={Platform.OS === "ios" ? "#9513fe":"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalNav: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX()?50:30:15,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    //maxHeight: 60
  },
  modalFab: {
      justifyContent: "center",
      alignContent: "center",
      ...Platform.select({
        ios: {
          backgroundColor: "#ecd9fc",
          height: 50,
          width: 70,
          borderRadius: 10,
        },
        android: {
          backgroundColor: "#9513fe",
          height: 60,
          width: 60,
          borderRadius: 30,
          padding: 14,
        }
      }),
      position: "absolute",
      bottom: 20,
      right: 20,
      elevation: 3,
      zIndex: 5,
      overflow: "hidden"
  },
});
