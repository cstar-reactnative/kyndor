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
  StatusBar,
  ToolbarAndroid,
  ScrollView,
  Platform
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
export default class ManagingMember extends React.Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>

        <View style={styles.businessNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="arrow-back"
                size={25}
                style={{color:'#fff'}}

              />
            </TouchableHighlight>
          </View>
          <View style={styles.textinputView}>
            <TextInput style = {styles.navText}
              underlineColorAndroid = "transparent"
              placeholder = "Enter name"
              placeholderTextColor = "#abacc8"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.navButtonHolder}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="keyboard-voice"
                size={25}
                style={{color:'#abacc8'}}
              />
            </TouchableHighlight>
          </View>
        </View>
        
        <ScrollView style={styles.body}  >
          <Text style={{color:'#5e6097',fontSize:15,fontWeight:"500"}}>Members</Text>
          <View style={{marginTop:15}}>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <View style={{flexDirection:'row',backgroundColor:'#ebebeb',borderRadius:20,marginRight:7,marginBottom:5}}>
              <Image style={{height:32,width:32}} source={require('../../images/unnamed.png')}/>
              <View style={{justifyContent:'center'}}><Text style={{paddingRight:12,paddingLeft:8,fontSize:14}}>Bernadette</Text></View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#ebebeb',borderRadius:20,marginRight:7,marginBottom:5}}>
              <Image style={{height:32,width:32}} source={require('../../images/unnamed.png')}/>
              <View style={{justifyContent:'center'}}><Text style={{paddingRight:12,paddingLeft:8,fontSize:14}}>Kavin</Text></View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#ebebeb',borderRadius:20,marginRight:7,marginBottom:5}}>
              <Image style={{height:32,width:32}} source={require('../../images/unnamed.png')}/>
              <View style={{justifyContent:'center'}}><Text style={{paddingRight:12,paddingLeft:8,fontSize:14}}>Kaveri</Text></View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#ebebeb',borderRadius:20,marginRight:7,marginBottom:5}}>
              <Image style={{height:32,width:32}} source={require('../../images/unnamed.png')}/>
              <View style={{justifyContent:'center'}}><Text style={{paddingRight:12,paddingLeft:8,fontSize:14}}>Elizabeth</Text></View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#ebebeb',borderRadius:20,marginRight:7,marginBottom:5}}>
              <Image style={{height:32,width:32}} source={require('../../images/unnamed.png')}/>
              <View style={{justifyContent:'center'}}><Text style={{paddingRight:12,paddingLeft:8,fontSize:14}}>Eliz</Text></View>
            </View>
            </View>
          </View>
          <View style={{marginTop:20}}>
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:10}}>
              <View style={{flex:2}}>
              <Image style={{height:45,width:45}} source={require('../../images/unnamed.png')}/>
              </View>
              <View style={{flexDirection:'row',flex:8,justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#e9e9e9'}}>
              <View style={{flex:3,justifyContent:'center'}}>
                <Text style={{color:'#393939',fontSize:15}}>Bernadette</Text>
              </View>
              <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:13.5}}>Moderator</Text>
              </View>
            </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:10}}>
              <View style={{flex:2}}>
              <Image style={{height:45,width:45}} source={require('../../images/unnamed.png')}/>
              </View>
              <View style={{flexDirection:'row',flex:8,justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#e9e9e9'}}>
              <View style={{flex:3,justifyContent:'center'}}>
                <Text style={{color:'#393939',fontSize:15}}>Kaveri</Text>
              </View>
              <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:13.5}}>Principal</Text>
              </View>
            </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:10}}>
              <View style={{flex:2}}>
              <Image style={{height:45,width:45}} source={require('../../images/unnamed.png')}/>
              </View>
              <View style={{flexDirection:'row',flex:8,justifyContent:'flex-start'}}>
              <View style={{flex:3,justifyContent:'center'}}>
                <Text style={{color:'#393939',fontSize:15}}>Ashwin</Text>
              </View>
              <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:13.5}}>Parent</Text>
              </View>
            </View>
            </View>
          </View>
        </ScrollView>
        <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => navigate('ForgotPassword')}>
          <MaterialIcons
            name="check"
            size={22}
            style={{color:'white'}}
          />
        </TouchableHighlight>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'white',
      flex:1,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      paddingBottom:30
    },
    textinputView:{
      flex:7
    },
    navText: {
      color: '#c1c1d6',
      fontSize: 14,
      paddingBottom: 15,
      height: 40,
      flex: 2,
      height: 40,
    },
    navButtonHolder:{
      justifyContent:'center'
    },
    navButtonback:{
      justifyContent:'center',
      flex:2
    },
    businessNav: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft:15,
      paddingRight:15,
      maxHeight: 50,
      backgroundColor: '#484b89',
      zIndex: 4
    },
    addnewschool:{
      paddingTop:30,
      paddingBottom:50,
      marginLeft:20

    },
    input:{
      fontSize:15,
      color:'#fff'
    },
    navbar: {
      backgroundColor: '#484b89',
      height: 55,
      paddingLeft: 12,
      paddingTop: 15,
      flexDirection:'row'
    },
    containerStyle: {
      marginLeft: 5,
      marginRight: 5,
      flexDirection: 'row',
      height: 75,
      alignContent: 'flex-start',
    },
    navbartextInpView:{
      flex:10,
    },
    navbarIcon:{
      paddingRight:7,
    },
    body:{
      marginTop:15,
      paddingBottom:15,
      paddingLeft:15,
      paddingRight:15
    },
    myschooltitleview:{
      paddingLeft: 15,

    },
    myschooltitle:{
      color:'#64679a',
      fontWeight:"500",
      fontSize:15
    },
    containerImage:{
      justifyContent: 'center',
      alignItems: 'center',
      flex:2,
    },
    containerView:{
      flex:6,
      justifyContent: 'center',
      paddingLeft:10
    },
    containermainText:{
      fontSize: 14,
      fontWeight: '400',
      color: '#212121',
      paddingBottom: 2
    },
    containersubText:{
      fontSize: 12,
      color: '#7b7b7b'
    },
    containerDistanceView:{
      flex:2,
      justifyContent:'center',
      alignItems: 'center',

    },
    containerDistanceText:{
      fontSize: 12
    },
    modalNav: {
      padding: 15,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#484b89',
      maxHeight: 60,
      elevation:3
    },
    fab: {
      backgroundColor: '#9513fe',
      height: 50,
      width: 50,
      borderRadius: 50,
      padding: 14,
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 5,
      elevation: 3,
      overflow:'hidden'
    },
  });
