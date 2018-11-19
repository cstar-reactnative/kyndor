import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Platform,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');
import colors from '@theme/colorsThree';

export default class schoolSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchoolZip: '',
      newSchoolName: '',
      newSchoolDesc: '',
      newSchoolAddress: '',
      searchschool: [],
      searchZip: '',
    }
  }

  componentWillUnmount(){

  }

  createRequest(schoolName, schoolDescription, schoolAddress){
    var thisCompo = this;
    if((schoolName == '') || (schoolDescription == '') || (schoolAddress == '')){
      alert('Please fill up all fields.')
    }
    else{
      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          alert(err)
        }
        else{
          api.addRequest({
            name: schoolName,
            description: schoolDescription,
            address: schoolAddress,
            type: 'school',
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
    title: 'Add School',
    header: null
  };

  componentWillMount(){

  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    //const { region } = this.props;
    //console.log(region);

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
              <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />

              <View style={styles.modalNav}>
                <TouchableOpacity
                  onPress={() => {
                    goBack()
                  }}>
                  <Text style={{fontFamily: "System", fontSize: 17, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: colors.white, }}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{marginLeft: 5,fontFamily: "System", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: colors.white, fontSize: 18}} >Add New School</Text>

                <TouchableOpacity
                  onPress={() => {this.createRequest(this.state.newSchoolZip, this.state.newSchoolName, this.state.newSchoolDesc, this.state.newSchoolAddress)}}>
                  <Text style={{fontFamily: "System", fontSize: 17, fontWeight: "500", fontStyle: "normal", letterSpacing: 0, textAlign: "right", color: colors.white, paddingRight: 15}}>Save</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{paddingHorizontal: 30, paddingVertical: 10, paddingBottom: 300}}>
                <TextField
                  //titleTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,}}
                  labelTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34, color: "#91939b"}}
                  label='School Zip Code'
                  textColor='#000000'
                  tintColor='#91939b'
                  baseColor='#91939b'
                  fontSize={17}
                  titleFontSize={11}
                  labelFontSize={16}
                  lineWidth={1}
                  returnKeyType="next"
                  onChangeText={ (newSchoolZip) => this.setState({ newSchoolZip }) }
                  value={this.state.newSchoolZip}
                />

                <TextField
                  //titleTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,}}
                  labelTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34, color: "#91939b"}}
                  label='School name'
                  textColor='#000000'
                  tintColor='#91939b'
                  baseColor='#91939b'
                  fontSize={17}
                  titleFontSize={11}
                  labelFontSize={16}
                  lineWidth={1}
                  returnKeyType="next"
                  onChangeText={ (newSchoolName) => this.setState({ newSchoolName }) }
                  value={this.state.newSchoolName}
                />

                <View style={{marginTop: 15}}>
                  <Text style={{fontFamily: 'System', fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,color: "#91939b"}}>Description</Text>
                  <TextInput
                    style={{padding: 5, marginTop: 5, height: 130, borderWidth: 1, borderColor: "#91939b",  borderRadius: 6, fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                    //placeholder = "Input"
                    multiline={true}
                    numberOfLines = {10}
                    placeholderTextColor = "#91939b"
                    onChangeText={ (newSchoolDesc) => this.setState({ newSchoolDesc }) }
                    value={this.state.newSchoolDesc}
                  />
                </View>

                <View style={{marginTop: 15}}>
                  <Text style={{fontFamily: 'System', fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,color: "#91939b"}}>Address</Text>
                  <TextInput
                    style={{padding: 5, marginTop: 5, height: 130, borderWidth: 1, borderColor: "#91939b", borderRadius: 6, fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                    //placeholder = "Input"
                    multiline={true}
                    numberOfLines = {6}
                    placeholderTextColor = "#91939b"
                    onChangeText={ (newSchoolAddress) => this.setState({ newSchoolAddress }) }
                    value={this.state.newSchoolAddress}
                  />
                </View>

                {/* <TextField
                  titleTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34, color: "#91939b"}}
                  labelTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,}}
                  id="outlined-multiline-static"
                  prefix="Description"
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={16}
                  titleFontSize={11}
                  labelFontSize={11}
                  lineWidth={1.3}
                  multiline
                  rows="4"
                  //defaultValue="Default Value"
                  //className={classes.textField}
                  //margin="normal"
                  variant="outlined"
                  onChangeText={ (newSchoolDesc) => this.setState({ newSchoolDesc }) }
                  value={this.state.newSchoolDesc}
                  />

                  <TextField
                  //titleTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,}}
                  labelTextStyle={{fontFamily: 'System',fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.34,}}
                  id="outlined-multiline-static"
                  suffix="Address"
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={16}
                  titleFontSize={11}
                  labelFontSize={11}
                  lineWidth={1.3}
                  multiline
                  rows="4"
                  //defaultValue="Default Value"
                  //className={classes.textField}
                  //margin="normal"
                  variant="outlined"
                  onChangeText={ (newSchoolAddress) => this.setState({ newSchoolAddress }) }
                  value={this.state.newSchoolAddress}
                /> */}

              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.paleGrey,
    //paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    flex:1
  },
  // input:{
  //   fontFamily: 'System',
  //   fontSize:15,
  //   color:'#fff'
  // },
  modalNav: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 15,
    paddingLeft: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: colors.indigoBlue,
    //maxHeight: 60
  },
  // fab: {
  //   justifyContent: "center",
  //   alignContent: "center",
  //   ...Platform.select({
  //     ios: {
  //       backgroundColor: "#ecd9fc",
  //       height: 50,
  //       width: 70,
  //       borderRadius: 10,
  //     },
  //     android: {
  //       backgroundColor: "#9513fe",
  //       height: 60,
  //       width: 60,
  //       borderRadius: 30,
  //       padding: 14,
  //     }
  //   }),
  //   position: "absolute",
  //   bottom: 20,
  //   right: 20,
  //   elevation: 3,
  //   zIndex: 5,
  //   overflow: "hidden"
  // },
});
