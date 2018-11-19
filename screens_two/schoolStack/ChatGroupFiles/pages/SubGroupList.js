import React, { Component } from 'react';
import { View, StyleSheet, Image, Text,
  ScrollView, Switch, Platform, AppState, TextInput, TouchableOpacity, PermissionsAndroid, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

import CardChatGroupList from '../cards/CardChatGroupList';
import CardCustomChatGroupList from '../cards/CardCustomChatGroupList';
import { GET_GROUP_URL, group, API_TOKEN } from '../helper/Constant';
import { tempFavGroupArray, tempCustomeGroupArray } from '../../ChatGroup';
import colors from '@theme/colorsThree';

const array = [];
let selectedArray = [];
const array_Custom = [];
let selectedArray_Custom = [];
class SubGroupList extends Component {
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
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCustomSelect = this.handleCustomSelect.bind(this);
  }

  componentWillMount(){
    this.getGroup();
    alert(API_TOKEN);
  }

  getGroup(){
    const configure = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': API_TOKEN } };
    axios.get(GET_GROUP_URL, configure)
    .then((response) => {
      selectedArray = [];
      selectedArray_Custom = [];
      if (response.data.success === true) {
        let temp = [];
        let temp1 = [];
        console.log(response.data.result.details);
        response.data.result.details.map((item) => {
          if (item.access_type === 'private' || item.access_type === 'public') {
            temp1.push(item);
          }
          if (item.access_type !== 'public' && item.access_type !== 'private') {
            temp.push(item);
          }
          this.setState({ data: temp, tempdata: temp })
          for (let i = 0; i < temp.length; i++) {
                  array[i] = false;
              }

          this.setState({ data_custom: temp1, tempdata_custom: temp1 })
          for (let i = 0; i < temp1.length; i++) {
                  array_Custom[i] = false;
              }
        });
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
        return this.state.data_custom.map((item, index) =>
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
      Actions.invitemember();
  }

  render() {
    const { flex, header, buttonText, txtText, txtTextNormal, txtText_Bold, txt_Bold, row } = styles;
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
                // onPress={() => Actions.pop()}
                onPress={() => this.props.navigation.popToTop()}
            />
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
              margin: 18, }}>Cornerstone EI</Text>
          </View>

          <View>
          <Text style={[buttonText, {width: 20}]}></Text>
          </View>
        </View>

        <View style={{ flex:1, marginLeft: 20, marginRight: 20}}>

        <ScrollView>

        <LinearGradient
     colors={['#6d3ccb', '#6d3ccb', '#6361e1', '#6361e1', '#ff3b30', '#ff3b30']}
     start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
     style={{height: 55,
     marginTop: 20 }}
     >
        <View>
        <TouchableOpacity onPress={() => this.navigation() }>
          <View style={{ flexDirection: 'row',
          height: 51,
          margin: 2,
          justifyContent:'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'}}>

              <View style={{ width: 60 }}>
                  <View style={{ margin: 10,
                    height: 30, width:30,
                    alignItems: 'center', justifyContent:'center' }}>
                    <Image
                      source={group} style={styles.imageperson}
                      />
                </View>
              </View>

              <View style={{ flex: 1, justifyContent: 'center', marginTop: 10}}>
                <View>
                  <Text style={[txtText_Bold]}>
                    Invite New Members
                  </Text>
                </View>
                </View>

              <View style={{ width: 60}}>
                    <View style={{ height: 50, width:50,
                      alignItems: 'center', justifyContent:'center', marginTop: 10 }}>
                        <Icon
                          type='Entypo'
                          name='chevron-small-right'
                          style={{color: '#511fb2'}}
                        />
                      </View>
              </View>
          </View>
          </TouchableOpacity>

          </View>
        </LinearGradient>

        <Text style={[txt_Bold, {marginTop: 20}]}>Primary Chat Groups</Text>
        <Text style={{ color: '#c6c8d0', fontSize: 14 }}>Add your favourite chat groups</Text>
        {this.renderChatGroupList()}

        <Text style={[txt_Bold, {marginTop: 20}]}>Custom Chat Groups</Text>
        <Text style={{ color: '#c6c8d0', fontSize: 14 }}>Create new custom group & add your favourite groups</Text>
        {this.renderCustomChatGroupList()}

        </ScrollView>

        <View style={{ width: 50, height: 50, backgroundColor:'#511fb2', borderRadius: 25, position: 'absolute', right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          type='Entypo'
          name='plus'
          style={{color: '#fff'}}
          onPress={() => Actions.pop()}
        />
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
    color: '#511fb2',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 18,
  },
  txt_Bold: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageperson: {
    height: 30,
    width: 30,
  },

});

export default SubGroupList;
