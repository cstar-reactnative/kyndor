import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Switch, Platform, AppState, TextInput, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import CardMember from '../cards/cardMember';
import CardMemberList from '../cards/cardMemberList';
import { ADD_MEMBER_GROUP_URL, API_TOKEN, GET_MEMBER_URL } from '../helper/Constant';
import { tempArray } from '../../ChatGroup';
import colors from '@theme/colorsThree';

const array = [];
let selectedArray = [];
let selectedMemberIDArray = [];

class MemberList extends Component {
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
      selectedIdData: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount(){
    this.getMember();
  }

  getMember(){
    const configure = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': API_TOKEN } };
    axios.get(GET_MEMBER_URL, configure)
    .then((response) => {
      console.log('Get Member response:-', response.data.result.participants);
      if (response.data.success === true) {
        console.log('Success Data');
        selectedArray = [];
        selectedMemberIDArray = [];
        let temp = response.data.result.participants;
        this.setState({ data: temp, tempdata: temp })
        for (let i = 0; i < temp.length; i++) {
                array[i] = false;
            }
      } else {
        console.log('Error:-', response.data.message);
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.response.data}`);
    });
  }

  searchMember(text){
    const searchValue = text.toLowerCase();
    let filter = this.state.tempdata;
    filter = filter.filter((item) => item.name.toLowerCase().includes(searchValue)).map(({ name, user_id, profile_pic, about, points, user_type }) => ({ name, user_id, profile_pic, about, points, user_type }));
    this.setState({ data: filter });
  }

  handleSelect(index,data) {
    var toRemove = [];
    var toRemove0 = [];
    if (array[index] === true) {
      array[index] = false;
      toRemove = data;
      var index = selectedArray.indexOf(toRemove);
      selectedArray.splice(index, 1);

      toRemove0 = data.user_id;
      var index0 = selectedMemberIDArray.indexOf(toRemove0);
      selectedMemberIDArray.splice(index0, 1);
    } else {
      array[index] = true;
      selectedArray.push(data);
      selectedMemberIDArray.push(data.user_id);
    }
    this.setState({ selectedData: selectedArray, selectedIdData: selectedMemberIDArray });
  }

  addGroupMember(){
    const configure = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': API_TOKEN } };
    const data = JSON.stringify({
      email: '',
      groupId: '',
      groupName: '',
    });
    axios.post(ADD_MEMBER_GROUP_URL, data, configure)
    .then((response) => {
      if (response.data.status === 1) {

      } else {
        console.log('Error:-', response.data.message);
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.response.data}`);
    });
  }

  renderSelectedMemberList() {
        return this.state.selectedData.map((item, index) =>
            <CardMember
              key={`index-${index}`}
              items={item}
              index={index}
            />
        );
  }

  renderMemberList() {
        return this.state.data.map((item, index) =>
            <CardMemberList
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
                onPress={() => Actions.pop()}
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
          <Text onPress={() => Actions.createchatgroup({ selectedMember: this.state.selectedData,
             selectedIdData: this.state.selectedIdData,
              groupName: this.props.groupName,
               description: this.props.description,
                uploadedImagePath: this.props.uploadedImagePath,
                image: this.props.image })} style={buttonText}>Done</Text>
          </View>
        </View>

        <View style={{ flex:1, marginLeft: 20, marginRight: 20}}>
        {
          this.state.selectedData.length > 0 ?
          <View>
            <View style={{ marginTop: 20 }}>
            <Text style={txtText}>{'Members added'} ({((this.state.selectedData.length))})</Text>
            </View>
              <View style={{height: 90 }} >
                <ScrollView horizontal={true}>
                {this.renderSelectedMemberList()}
                </ScrollView>
              </View>
            <View style={{ height:1.5, backgroundColor: '#c6c8d0'}}></View>
          </View>
          :
          <Text style={[txtText, {marginTop: 20}]}>{'Members'}</Text>
        }
        <ScrollView>
        {this.renderMemberList()}
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

export default MemberList;
