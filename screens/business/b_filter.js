import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Image,
  Modal,
  AsyncStorage,
  CheckBox,
  Platform,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');
import Stores from '../../stores/'
import Colors2 from '@theme/ColorsTwo';

export default class BusinessFilter extends React.Component {
  state = {
    zip: '',
    name: '',
  };

  static navigationOptions = {
    title: 'Business filter',
    header: null
  };

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  componentDidMount(){
    var savedFilter = Stores.filterStore.getBusinessFilters()
    console.log(savedFilter)
    // savedFilter = JSON.parse(savedFilter)
    if(savedFilter.zip){
      this.setState({
        zip: savedFilter.zip,
        name: savedFilter.name,
      })
    }
  }

  applyFilter(gotoScreen = 'map'){
    const { navigate, replace } = this.props.navigation;
    console.log('@applyFilter')
    var allFilters = {
      zip: this.state.zip,
      name: this.state.name,
    }
    console.log(JSON.stringify(allFilters))

    if((this.state.zip == "")){
      alert('Zip is mandatory!')
    }
    // else if(this.state.zip.length < 5){
    //   alert('Invalid zip.')
    // }
    else{
      // save to Stores
      Stores.filterStore.setBusinessFilters(allFilters)

      if(gotoScreen == 'map'){
        replace('MapScreen')
      }
      else{
        replace('ListScreen')
      }
    }

  }

  render(){
    const { navigate, replace, goBack } = this.props.navigation;

    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.mainView}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          {
            Platform.OS==='ios'
              ?
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('click')
                      this.props.navigation.goBack()
                    }}>
                    <Text style={{fontSize: 17,fontWeight: "normal", fontStyle: "normal",fontFamily: 'System',color: Colors2.brandPrimary}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <Text style = {{
                    fontFamily: "System",
                    fontWeight: "600",
                    fontStyle: "normal",
                    textAlign: "center",
                    fontSize: 17,
                    lineHeight: 22,
                    letterSpacing: -0.41,
                  color: "#000"}}>
                    Find Your Business
                  </Text>
                  <Text></Text>
                </View>
              :
              <View style={styles.navbar} >
                <TouchableOpacity
                  style={{marginTop:5, marginRight: 10}}
                  onPress={() => {
                    console.log('click')
                    this.props.navigation.goBack()
                  }}>
                  <MaterialIcons
                    name="close"
                    size={22}
                    style={{color:'white'}}
                  />
                </TouchableOpacity>
                <Text style = {styles.navText}>
                  Find Your Business
                </Text>
              </View>
          }

          <View style={{flex: 1, flexDirection:'column', paddingTop:20, backgroundColor: "#f4f4f7"}}>
            {/* <View style={{paddingHorizontal: 15}}>
              <Text>
                Enter your zip code and starting 4 letters of name to access local business in your area or request an invite.
              </Text>
            </View> */}
            {(Platform.OS==='android')?
              <View style={{paddingHorizontal:15}}>
                <View>
                  <TextField
                    label='Business zip code'
                    value={this.state.zip}
                    onChangeText={ (zip) => this.setState({ zip }) }
                    textColor='black'
                    tintColor='#9e9e9e'
                    baseColor='#c7c7cd'
                    fontSize={16}
                    lineWidth={1}
                    titleFontSize={12}
                    labelFontSize={12}
                  />
                </View>

                <View>
                  <TextField
                    label='Business name'
                    value={this.state.name}
                    onChangeText={ (name) => this.setState({ name }) }
                    textColor='black'
                    tintColor='#9e9e9e'
                    baseColor='#c7c7cd'
                    fontSize={16}
                    lineWidth={1}
                    titleFontSize={12}
                    labelFontSize={12}
                  />
                </View>
              </View>
            :
            <View style={{backgroundColor: "#fff",marginTop: 15,borderTopWidth: 1,borderTopColor: "#c8c7cc",borderBottomWidth: 1,borderBottomColor: "#c8c7cc"}}>
              <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row'}}>
                <Text style={{flex: .4, fontFamily: "System", fontSize: 17,color: "#030303",letterSpacing: -0.41,fontStyle: "normal",fontWeight: "normal"}}>Business zip code</Text>
                <TextInput
                  style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#757575",letterSpacing: -0.41}}
                  placeholder = "Enter business zip code"
                  placeholderTextColor = "#c7c7cd"

                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  value={this.state.zip}
                  onChangeText={ (zip) => this.setState({ zip }) }
                />
              </View>

              <View style={{marginLeft: 10,borderBottomWidth: .5,borderBottomColor: "#c8c7cc"}}/>

              <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row'}}>
                <Text style={{flex: .4, fontFamily: "System", fontSize: 17,color: "#030303",letterSpacing: -0.41,fontStyle: "normal",fontWeight: "normal"}}>Business name</Text>
                <TextInput
                  style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#757575",letterSpacing: -0.41}}
                  placeholder = "Enter business name"
                  placeholderTextColor = "#c7c7cd"

                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  value={this.state.name}
                  onChangeText={ (name) => this.setState({ name }) }
                />
              </View>
            </View>
            }
            <View style={styles.buttonHolder}>
              <View style={{
                backgroundColor:Colors2.brandPrimary,
                alignItems: 'center',
                padding: 12,
                elevation: 2,
                marginTop: 30,
                width: "100%",
                borderRadius: (Platform.OS==='ios')?14:3
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.applyFilter('list')
                  }}>
                  <Text style={{color:'#ffffff',fontSize: 17,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    lineHeight: 22,
                    letterSpacing: -0.41,
                  textAlign: "center"}}>
                    {(Platform.OS==='ios')?'Find your business':'FIND YOUR BUSINESS'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{
                alignItems: 'center',
                padding: 12,
                //elevation: 2,
                marginTop: 30,
                width: "100%",
                //borderRadius: 3
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.applyFilter()
                  }}>
                  <Text style={{color:Colors2.brandPrimary,fontSize: 17,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 22,
                    letterSpacing: -0.41,
                  textAlign: "center"}}>
                    {(Platform.OS==='ios')?'Or look for a nearby businesses':'OR LOOK FOR A NEARBY BUSINESSES'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonHolder: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#ffffff',
  },
  navText: {
    fontFamily: "System",
    color: '#ffffff',
    fontSize: 17,
    paddingTop:5,
    height: 40,
    flex: 2,
  },
  navbar: {
    backgroundColor: '#484b89',
    height: 55,
    padding: 15,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
});
