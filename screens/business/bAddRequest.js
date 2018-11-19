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
  CheckBox,
  FlatList,
  StatusBar,
  ToolbarAndroid,
  AsyncStorage,
  ScrollView,
  Platform,
  Dimensions,
  BackHandler,
  Alert,
  Modal
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');

export default class BusinessSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBusinessName: '',
      newBusinessDesc: '',
      newBusinessAddress: '',
      searchBusiness: [],
      searchZip: '',
    }
  }

  componentWillUnmount(){

  }

  createRequest(BusinessName, BusinessDescription, BusinessAddress){
    var thisCompo = this
    if((BusinessName == '') || (BusinessDescription == '') || (BusinessAddress == '')){
      alert('Please fill up all fields.')
    }
    else{
      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          alert(err)
        }
        else{
          api.addRequest({
            name: BusinessName,
            description: BusinessDescription,
            address: BusinessAddress,
            type: 'business',
            token: item
          },
          (e, r) => {
            if(e){
              alert("Error: "+e);
            }
            else{
              Alert.alert(
                'Kyndor',
                'Your request is submited.',
                [
                  {text: 'OK', onPress: () => thisCompo.props.navigation.goBack()},
                ],
                { cancelable: false }
              )
            }
          })
        }
      });
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){

  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <TouchableOpacity style={styles.fab} underlayColor={'transparent'} onPress={() => {this.createRequest(this.state.newBusinessName, this.state.newBusinessDesc, this.state.newBusinessAddress)}}>
          <MaterialIcons
            name="check"
            size={Platform.OS === "ios" ? 30 : 22}
            color={Platform.OS === "ios" ? "#9513fe":"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>

        <View style={styles.modalNav}>
          <TouchableOpacity
            //style={{flex: 2}}
            onPress={() => {
              goBack()
            }}>
            {/* <Text style={{ marginTop: 3}}> */}
            {Platform.OS === 'ios' ? <Text style={{fontSize: 17,
              fontWeight: "normal",
            fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>Cancel</Text> :
            <MaterialIcons
              name="close"
              size={25}
              style={{color:'white'}}
            />}
            {/* </Text> */}
          </TouchableOpacity>
          <Text style={{marginLeft: 5, color:(Platform.OS==='ios')?'black':'white', fontSize: 19}} >Request to add new Business</Text>
          <TouchableOpacity
            onPress={() => {this.createRequest(this.state.newBusinessName, this.state.newBusinessDesc, this.state.newBusinessAddress)}}>
            {Platform.OS === 'ios' ? <Text style={{fontSize: 17,
              fontWeight: "600",
            fontStyle: "normal",fontFamily: 'System',color: "#9513fe", paddingRight: 15}}>Done</Text> :<Text></Text>}
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: (Platform.OS==='ios')? 0 : '5%', paddingVertical: (Platform.OS==='ios')? 0 : '2%'}}>

          {(Platform.OS==='android')?
            <View>
              <TextField
                style={styles.textFieldstyle,{fontFamily: 'System',}}
                label='Business name'
                textColor='#888585'
                tintColor='#888585'
                baseColor='#afadad'
                fontSize={15}
                titleFontSize={11}
                labelFontSize={11}
                lineWidth={1.3}
                onChangeText={ (newBusinessName) => this.setState({ newBusinessName }) }
                value={this.state.newBusinessName}
              />

              <TextField
                style={styles.textFieldstyle,{fontFamily: 'System',}}
                label='Description'
                textColor='#888585'
                tintColor='#888585'
                baseColor='#afadad'
                fontSize={15}
                titleFontSize={11}
                labelFontSize={11}
                lineWidth={1.3}
                onChangeText={ (newBusinessDesc) => this.setState({ newBusinessDesc }) }
                value={this.state.newBusinessDesc}
              />

              <TextField
                style={styles.textFieldstyle,{fontFamily: 'System',}}
                label='Address'
                textColor='#888585'
                tintColor='#888585'
                baseColor='#afadad'
                fontSize={15}
                titleFontSize={11}
                labelFontSize={11}
                lineWidth={1.3}
                onChangeText={ (newBusinessAddress) => this.setState({ newBusinessAddress }) }
                value={this.state.newBusinessAddress}
              />
            </View>
          :
          <View>
            <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderTopColor: "#bcbbc1"}}>
              <Text style={{flex: .4, fontFamily: "System", fontSize: 18,color: "black"}}>Business Name</Text>
              <TextInput
                style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                placeholder = "Input"
                placeholderTextColor = "#c7c7cd"
                onChangeText={ (newBusinessName) => this.setState({ newBusinessName }) }
                value={this.state.newBusinessName}
              />
            </View>

            <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: 1,borderTopColor: "#bcbbc1"}}>
              <Text style={{flex: .4, fontFamily: "System", fontSize: 18,color: "black"}}>Description</Text>
              <TextInput
                style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                placeholder = "Input"
                placeholderTextColor = "#c7c7cd"
                onChangeText={ (newBusinessDesc) => this.setState({ newBusinessDesc }) }
                value={this.state.newBusinessDesc}
              />
            </View>

            <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderBottomWidth: 1,borderBottomColor: "#bcbbc1",borderTopColor: "#bcbbc1"}}>
              <Text style={{flex: .4, fontFamily: "System", fontSize: 18,color: "black"}}>Address</Text>
              <TextInput
                style={{flex: .6,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                placeholder = "Input"
                placeholderTextColor = "#c7c7cd"
                onChangeText={ (newBusinessAddress) => this.setState({ newBusinessAddress }) }
                value={this.state.newBusinessAddress}
              />
            </View>
          </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    flex:1
  },
  input:{
    fontFamily: 'System',
    fontSize:15,
    color:'#fff'
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: (Platform.OS==='ios') ? 'space-between' : 'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 45 : 30 : 15,
    paddingLeft: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    //maxHeight: 60
  },
  fab: {
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
