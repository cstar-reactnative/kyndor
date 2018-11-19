import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView,
   Switch, Platform, AppState, TextInput, Modal, TouchableOpacity,
   PermissionsAndroid, Alert, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import colors from '@theme/colorsThree';
import CardChatGroupList from '../cards/CardChatGroupList';
import CardCustomChatGroupList from '../cards/CardCustomChatGroupList';
import { SEND_INVITATION_URL, chatGroup, API_TOKEN } from '../helper/Constant';
import { tempFavGroupArray, tempCustomeGroupArray } from '../../ChatGroup';

const array = [];
let selectedArray = [];

const array_Custom = [];
let selectedArray_Custom = [];
class InviteMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      toggleSwitch: true,
      onChangeSwitch: false,
      appState: AppState.currentState,
      data: [],
      data_custom: [],
      tempdata: [],
      tempdata_custom: [],
      selectedData: [],
      selectedData_custom: [],
      email: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCustomSelect = this.handleCustomSelect.bind(this);
  }

  componentWillMount(){
    selectedArray = [];
    let temp = tempFavGroupArray;
    this.setState({ data: temp, tempdata: temp })
    for (let i = 0; i < temp.length; i++) {
            array[i] = false;
        }

    selectedArray_Custom = [];
    let temp1 = tempCustomeGroupArray;
    this.setState({ data_custom: temp1, tempdata_custom: temp1 })
    for (let i = 0; i < temp1.length; i++) {
            array_Custom[i] = false;
        }

      if (Platform.OS === 'ios') {
        } else {
            PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS]).then((result) => {
            })
          }
  }

  searchMember(text){
    const searchValue = text.toLowerCase();
    let filter = this.state.tempdata;
    filter = filter.filter((item) => item.name.toLowerCase().includes(searchValue)).map(({ id, name, avatar, description }) => ({ id, name, avatar, description }));
    this.setState({ data: filter });
  }

  handleSelect(index,data) {
    var toRemove = [];
    if (array[index] === true) {
      array[index] = false;
      toRemove = data;
      var index = selectedArray.indexOf(toRemove);
      selectedArray.splice(index, 1);
    } else {
      array[index] = true;
      selectedArray.push(data);
    }
    this.setState({ selectedData: selectedArray});
  }

  renderChatGroupList() {
        return this.state.data.map((item, index) =>
            <CardChatGroupList
              key={`index-${index}`}
              items={item}
              index={index}
              array={array}
              handleSelect={this.handleSelect.bind(this)}
            />
        );
  }

  handleCustomSelect(index,data) {
    var toRemove = [];
    if (array_Custom[index] === true) {
      array_Custom[index] = false;
      toRemove = data;
      var index = selectedArray_Custom.indexOf(toRemove);
      selectedArray_Custom.splice(index, 1);
    } else {
      array_Custom[index] = true;
      selectedArray_Custom.push(data);
    }
    this.setState({ selectedData_custom: selectedArray_Custom});
  }

  renderCustomChatGroupList() {
        return this.state.data.map((item, index) =>
            <CardCustomChatGroupList
              key={`index-${index}`}
              items={item}
              index={index}
              array_Custom={array_Custom}
              handleCustomSelect={this.handleCustomSelect.bind(this)}
            />
        );
  }

  navigation(){
    Actions.contactlist();
  }

  sendInvitation(){
    const configure = { headers: { 'Content-Type': 'application/json', 'x-access-token': API_TOKEN } };
    const data = JSON.stringify({
      email: this.state.email,
      groupId: 1730,
      groupName: 'my new group'
    });
    console.log('PARMA-->>>', data);
    console.log('URL-->>>', SEND_INVITATION_URL);
    axios.post(SEND_INVITATION_URL, data, configure)
    .then((response) => {
      if (response.data.success === true) {
        Alert.alert(response.data.result.message)
      } else {
        Alert.alert('Alert',response.data.result.error)
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.response.data}`);
      this.setState({ message: `${error}`, loading: false });
    });
  }

  render() {
    const { flex, header, buttonText, txtText, txtTextNormal, txtText_Bold, txtText_Black_Bold, txt_Bold, row, txtView } = styles;
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f7' }}>
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
        <View style={[header, Platform.OS === 'ios' ?
          { marginTop: 20, } : { marginTop: 0 }]}
        >
          <View>
            <View style={{ height: 50, width:50,
            alignItems: 'center', justifyContent:'center' }}>
              <Icon
                type='Feather'
                name='arrow-left'
                style={{color: '#fff'}}
                onPress={() => Actions.pop()}
              />
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 'bold',
            margin: 18, }}>Invite Members</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent:'center', marginRight: 18, width: 20}}>

          </View>
        </View>

        <View style={{ flex:1, marginLeft: 20, marginRight: 20}}>

          <TouchableOpacity onPress={() => this.navigation()}>
        <View style={[txtView, {marginTop: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30, borderRadius: 25}]}>
        <Text style={buttonText}>
          Invite From Contact
        </Text>
        </View>
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style={txtText}>
          Or
        </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <Text style={txtText_Black_Bold}>
          Invite via Email
        </Text>
        <Text style={{ color: '#c6c8d0', fontSize: 14 }}>Click '+' to invite upto 5 Members</Text>
        </View>

        <View>
        <View style={{ flexDirection: 'row', height: 50, marginLeft: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center'}}>
              <View style={{ borderBottomWidth: 1.5, marginTop: 5, borderColor: '#c6c8d0', marginTop: 40 }}>
                <TextInput
                  style={{ height: 40, width: '100%', marginLeft: 5, }}
                  placeholder="Enter Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  value={this.state.groupName}
                  onChangeText={(value) => this.setState({ email: value })}
                />
              </View>
            </View>

            <View style={{ width: 60, marginTop: 30 }}>
                <View style={{
                alignItems: 'center', justifyContent:'center', borderRadius: 25, }}>
                <Icon
                  type='EvilIcons'
                  name='plus'
                  style={{color: '#6d3ccb'}}
                />
              </View>
            </View>
          </View>

          <View style={[txtView, {marginTop: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30, borderRadius: 25}]}>
          <Text  onPress={() => this.sendInvitation()} style={buttonText}>
            Invite
          </Text>
          </View>

          </View>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#511fb2'
  },
  row: {
    flexDirection: 'row'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtText: {
    color: '#000000',
    fontSize: 16
  },
  txtText_Black_Bold: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtTextNormal: {
    color: '#383e53',
    fontSize: 16
  },
  txtText_Bold: {
    color: '#511fb2',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 18,
  },
  txt_Bold: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtView: {
    backgroundColor: '#511fb2',
  },


});

export default InviteMember;
