import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView,
   Switch, Platform, AppState, TextInput, Linking, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import Contacts from 'react-native-contacts';
import Contacts from 'react-native-unified-contacts';
import colors from '@theme/colorsThree';
import CardContactList from '../cards/CardContactList';
import { BACKGROUND_COLOR } from '../helper/Constant';
import { tempArray } from '../../ChatGroup';

const array = [];
let selectedContactArray = [];
let selectedContact = [];
let temp123 = ['7845124512','7891212345'];
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      toggleSwitch: true,
      onChangeSwitch: false,
      appState: AppState.currentState,
      data: [],
      tempdata: [],
      selectedData: [],
      selectedCnt: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount(){
    selectedContactArray = [];
    var temp = [];
    let temp2 = [];
        Contacts.getContacts( (error, contacts) =>  {
          if (error) {
            console.log('Contact Error:',error);
          }
          else {
            temp = contacts
            this.setState({ data: temp, tempdata: temp })
          }
        });

        for (let i = 0; i < this.state.data.length; i++) {
                array[i] = false;
            }

  }

  searchMember(text){
    const searchValue = text.toLowerCase();
    let filter = this.state.tempdata;
    filter = filter.filter((item) => item.fullName.toLowerCase().includes(searchValue)).map(({ fullName, contactType }) => ({ fullName, contactType }));
    this.setState({ data: filter });
  }

  handleSelect(index,data) {
    var toRemove = [];
    var toRemove0 = [];
    if (array[index] === true) {
      array[index] = false;
      toRemove = data;
      var index = selectedContactArray.indexOf(toRemove);
      selectedContactArray.splice(index, 1);

      toRemove0 = data.phoneNumbers[0].digits;
      var index0 = selectedContact.indexOf(toRemove0);
      selectedContact.splice(index0, 1);
    } else {
      array[index] = true;
      selectedContactArray.push(data);
      selectedContact.push(data.phoneNumbers[0].digits);
    }
    console.log('Contact', selectedContact);
    this.setState({ selectedData: selectedContactArray, selectedCnt: selectedContact});
  }

  renderContactList() {
        return this.state.data.map((item, index) =>
            <CardContactList
              key={`index-${index}`}
              items={item}
              index={index}
              array={array}
              handleSelect={this.handleSelect.bind(this)}
            />
        );
  }

  render() {
    const { flex, header, buttonText, txtText, txtTextNormal, txtText_Bold, row } = styles;
    let selectedContact = ''
    if (Platform.OS === 'ios') {
      selectedContact = `sms:${this.state.selectedCnt}`;
    } else {
      selectedContact = `sms:${this.state.selectedCnt}`;
    }
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff' }}>
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

          <View style={{ flex: 1 }} >
            <View style={{ flex:1, marginLeft: 10, marginRight: 10}}>
              <View style={{ flexDirection: 'row', height: 40, marginTop: 10, backgroundColor:'#6d3ccb', borderRadius: 20, }}>

              <View style={{ width: 40,}}>
              <View style={{ height: 40, width:40,
              alignItems: 'center', justifyContent:'center',  }}>
              <Icon
                type='EvilIcons'
                name='search'
                style={{color: '#fff'}}
              />
            </View>
              </View>

              <View style={{ flex: 1, justifyContent: 'center'}}>
                <View style={{ marginTop: 5}}>
                  <TextInput
                    underlineColorAndroid='transparent'
                    style={{ height: 40, width: '100%', marginLeft: 5, color: '#FFFFFF' }}
                    placeholder="Search Members"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#FFFFFF"
                    onChangeText={(value) => this.searchMember(value)}
                  />
                </View>
              </View>

                </View>
            </View>
          </View>

          <View>
          <Text onPress={() => Linking.openURL(selectedContact)} style={buttonText}>Done</Text>
          </View>
        </View>

        <View style={{ flex:1, marginLeft: 20, marginRight: 20}}>

        <Text style={[txtText, {marginTop: 20}]}>{'Invite members from contacts'}</Text>
        <ScrollView>
        {this.renderContactList()}
        </ScrollView>

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
    margin: 18,
    color: '#FFFFFF',
    fontSize: 16,
  },
  txtText: {
    color: '#c6c8d0',
    fontSize: 16
  },
  txtTextNormal: {
    color: '#383e53',
    fontSize: 16
  },
  txtText_Bold: {
    color: '#c6c8d0',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 18,
  },

});

export default ContactList;
