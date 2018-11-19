import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ImageBackground,
  ToolbarAndroid,
  AsyncStorage,
  Button,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput
} from 'react-native';
const api =  require('../../api/index');

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Change Password',
    headerTintColor: (Platform.OS === 'ios') ? "#9513fe" : '#ffffff',
    headerStyle: {
      backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    },
    headerTitleStyle: {
      color: (Platform.OS === 'ios') ? "#000000" : '#ffffff',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  }

  componentDidMount() {

  }

  onPress = () => {
    var thisCompo = this;
    // alert(this.state.oldPassword);
    if((this.state.oldPassword != '') && (this.state.newPassword != '') && (this.state.confirmNewPassword != '')) {
      if(this.state.newPassword == this.state.confirmNewPassword){
        // api call
        AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
          if(err){
            alert(err)
          }
          else{
            api.changePassword({old: this.state.oldPassword, new: this.state.newPassword, token: item}, (e, r) => {
              if(e){
                alert("Error: "+e)
              }
              else{
                if(r.result.user.length > 0){
                  // alert('Password changed successfully.')
                  Alert.alert(
                    'Profile',
                    'Password changed successfully.',
                    [
                      //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => thisCompo.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                  )
                }
                else {
                  alert('Failed! Please try again.')
                }
              }
            })
          }
        });
      }
      else{
        alert('New password and confirm password mismatch.')
      }
    }
    else{
      alert('Please fill all the fields.')
    }
  }

  render(){

    const { navigate } = this.props.navigation;
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
          <View style={styles.textFieldContainer}>
            {(Platform.OS==='android')?
              <View style={{paddingHorizontal: 15}}>
                <TextField
                  secureTextEntry
                  lineWidth={1}
                  style={styles.textFieldstyle}
                  label='Old password'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  returnKeyType='next'
                  value={this.state.oldPassword}
                  onChangeText={ (oldPassword) => this.setState({ oldPassword }) }
                />
                <TextField
                  secureTextEntry
                  lineWidth={1}
                  style={styles.textFieldstyle}
                  label='New password'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  returnKeyType='next'
                  value={this.state.newPassword}
                  onChangeText={ (newPassword) => this.setState({ newPassword }) }
                />
                <TextField
                  secureTextEntry
                  lineWidth={1}
                  style={styles.textFieldstyle}
                  label='Confirm new password'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  returnKeyType='done'
                  value={this.state.confirmNewPassword}
                  onChangeText={ (confirmNewPassword) => this.setState({ confirmNewPassword }) }
                />
              </View>
            :
            <View>
              <View style={{backgroundColor: "#fff", paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderTopColor: "#bcbbc1",borderBottomWidth: .5,borderBottomColor: "#bcbbc1"}}>
                <Text style={{flex: .4, fontFamily: "System", fontSize: 16,color: "black"}}>Old password</Text>
                <TextInput
                  style={{flex: .6,fontFamily: 'System',fontSize: 16,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Enter old password"
                  placeholderTextColor = "#c7c7cd"
                  secureTextEntry
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  value={this.state.oldPassword}
                  onChangeText={ (oldPassword) => this.setState({ oldPassword }) }
                />
              </View>

              <View style={{backgroundColor: "#fff", paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#bcbbc1"}}>
                <Text style={{flex: .4, fontFamily: "System", fontSize: 16,color: "black"}}>New password</Text>
                <TextInput
                  style={{flex: .6,fontFamily: 'System',fontSize: 16,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Enter new password"
                  placeholderTextColor = "#c7c7cd"
                  secureTextEntry
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  value={this.state.newPassword}
                  onChangeText={ (newPassword) => this.setState({ newPassword }) }
                />
              </View>

              <View style={{backgroundColor: "#fff", paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: "#bcbbc1"}}>
                <Text style={{flex: .4, fontFamily: "System", fontSize: 16,color: "black"}}>Confirm password</Text>
                <TextInput
                  style={{flex: .6,fontFamily: 'System',fontSize: 16,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Enter password again"
                  placeholderTextColor = "#c7c7cd"
                  secureTextEntry
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  value={this.state.confirmNewPassword}
                  onChangeText={ (confirmNewPassword) => this.setState({ confirmNewPassword }) }
                />
              </View>
            </View>
            }
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity onPress={this.onPress} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  saveText:{
    fontFamily: "System",
    color: (Platform.OS==='ios')?'#9513fe':'#fff',
  },
  saveButton:{
    alignItems: 'center',
    backgroundColor: (Platform.OS==='ios') ? 'rgba(149, 19, 254, 0.15)' : '#32345f',
    padding: 12,
    elevation: 2,
    marginTop: 40,
    width: "100%",
    borderRadius: 3,
  },
  textFieldstyle:{
    fontFamily: "System",
    fontWeight:"600"
  },
  textFieldContainer: {
    flex: 1,
    //paddingLeft:15,
    //paddingRight: 15
  },
  container: {
    flex:1,
    alignContent: 'flex-start',
    backgroundColor:(Platform.OS==='ios')?'#f4f4f7':'#fff',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  }
});
