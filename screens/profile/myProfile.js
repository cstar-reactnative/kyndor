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
  Platform,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const api =  require('../../api/index');
import Stores from '../../stores/';
import AppConfig from '../../config.js'
const imgcdn = AppConfig.imgLoc
import Colors2 from '@theme/ColorsTwo';
//var dismissKeyboard = require('dismissKeyboard');

const { width, height } = Dimensions.get('window');

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    titleColor: '#000',
    headerTintColor: (Platform.OS === 'ios') ? Colors2.brandPrimary : '#ffffff',
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
      name: '',
      zip: '',
      about: '',
      pic: '',
      oldName: '',
      oldZip: '',
      oldAbout: '',
      oldPic: '',
      myPrefs: '',
      allPref: [],
      ImageSource: null,
      localUri: null
    };
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  componentWillUnmount() {
    this.props.navigation.state.params.ProfileMain.setState({'allPref': this.state.allPref})
  }

  callApi = (key, newValue, cb) => {
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        cb(false, err)
      }
      else{
        api.myProfileUpdate({field: key, value: newValue, token: item}, (e, r) => {
          if(e){
            cb(false, e)
          }
          else{
            if(r.success == true){
              cb(true,r)
            }
            else {
              cb(false,r)
            }
          }
        })
      }
    });
  }

  fetchAPI = () => {
    var thisCompo = this
    if((this.state.name.length > 0) && (this.state.zip.length > 0) && (this.state.about.length > 0)){
      loaderHandler.showLoader("Saving...");
      thisCompo.callApi('name', thisCompo.state.name, (status,response)=>{
        if(status){
          // saving zip code
          thisCompo.callApi('zip_code', thisCompo.state.zip, (status,response)=>{
            if(status){
              // saving about
              thisCompo.callApi('about', thisCompo.state.about, (status,response)=>{
                if(status){
                  // saving profile image
                  if(thisCompo.state.pic.length > 0){
                    thisCompo.callApi('profile_pic', thisCompo.state.pic, (status,response)=>{
                      if(status){
                        loaderHandler.hideLoader();
                        thisCompo.props.navigation.state.params.ProfileMain.setState({
                          'name': thisCompo.state.name,
                          'about': thisCompo.state.about,
                          'pic': { uri: imgcdn+thisCompo.state.pic },
                        })
                        Alert.alert(
                          'Profile',
                          'Your profile updated successfully.',
                          [
                            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                            {text: 'OK', onPress: () => thisCompo.props.navigation.goBack()},
                          ],
                          { cancelable: false }
                        )
                      }
                      else {
                        loaderHandler.hideLoader();
                        alert('Oops! Somthing went wrong. Please try again.')
                      }
                    })
                  }
                  else{
                    loaderHandler.hideLoader();
                    thisCompo.props.navigation.state.params.ProfileMain.setState({
                      'name': thisCompo.state.name,
                      'about': thisCompo.state.about,
                    })
                    Alert.alert(
                      'Profile',
                      'Your profile updated successfully.',
                      [
                        //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'OK', onPress: () => thisCompo.props.navigation.goBack()},
                      ],
                      { cancelable: false }
                    )
                  }
                }
                else {
                  loaderHandler.hideLoader();
                  alert('Oops! Somthing went wrong. Please try again.')
                }
              })
            }
            else {
              loaderHandler.hideLoader();
              alert('Oops! Somthing went wrong. Please try again.')
            }
          })
        }
        else {
          loaderHandler.hideLoader();
          alert('Oops! Somthing went wrong. Please try again.')
        }
      })
    }
    else{
      loaderHandler.hideLoader();
      alert('Please fill out all the details and upload your picture.')
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        alert(err)
      }
      else{
        api.myProfile(token, (e, r) => {
          if(e){
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let allData = r.result.subscribed_groups[0];
              console.log(JSON.stringify(allData));
              this.setState({
                name: allData.name,
                zip: (allData.zip_code == null) ? '' : allData.zip_code.toString(),
                about: (allData.about == null) ? '' : allData.about,
                pic: (allData.profile_pic == null || allData.profile_pic == 'no-image.png') ? null : allData.profile_pic,
                oldName: allData.name,
                oldZip: (allData.zip_code == null) ? '' : allData.zip_code.toString(),
                oldAbout: (allData.about == null) ? '' : allData.about,
                oldPic: (allData.profile_pic == null || allData.profile_pic == 'no-image.png') ? null : allData.profile_pic,
              })
              let thisElement = this
              if(thisElement.state.pic != null){
                thisElement.setState({
                  ImageSource: { uri: imgcdn+thisElement.state.pic },
                });
              }
              // alert('Success')
            }
            else {
              // alert('Failed!');
            }
          }
        })
      }
    });
  }

  componentDidMount() {
    let prefArray = Stores.preferenceStore.getData()
    this.setState({allPref: prefArray})
    // let max3 = (prefArray.length > 3) ? 3 : prefArray.length
    // if(max3 == 0){
    //   this.setState({myPrefs: 'none'})
    // }
    // else {
    //   let tempText = ''
    //   for (i = 0; i < max3; i++) {
    //     tempText = tempText + prefArray[i] + ', '
    //   }
    //   this.setState({myPrefs: tempText})
    // }

    let tempText = ''
    for (i = 0; i < prefArray.length; i++) {
      tempText = tempText + prefArray[i] + ', '
    }
    this.setState({myPrefs: tempText})
  }

  selectPhotoTapped() {
    let thisElement = this;
    const options = {
      mediaType: 'photo', // 'photo' or 'video'
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection

      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        let imgData = {
          image: (Platform.OS==='android') ? response.uri : response.uri.replace('file://', ''),
          filePath: response.path,
          fileName: response.fileName
        };

        AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
          if(err){
            alert(err)
          }
          else{
            loaderHandler.showLoader("Uploading...");
            api.uploadFile({fileData: imgData, token: tokenItem}, (e, res) => {
              loaderHandler.hideLoader();
              if(e){
                console.log("@app: Error: "+JSON.stringify(e));
              }
              else{
                console.log('@app: upload success: '+res)
                let r = JSON.parse(res)
                if(r.success == true){

                  // api call to update image

                  let source = { uri: response.uri };
                  thisElement.setState({
                    ImageSource: source,
                    pic: r.result.theFile[0].filename
                  });
                  console.log('image upload success')
                }
                else {
                  console.log('Connection Failed! Please try again.');
                }

              }
            })
          }
        });
      }
    });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
        <BusyIndicator style={{zIndex: 99}}/>
        <View style={styles.namezipcode}>
          <View style={{width: 120, height: 120, overflow: 'hidden'}} >
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <ImageBackground
                style={styles.imageContainer}
                //source={ this.state.ImageSource === null ? {require('../../images/unnamed.png')} : {this.state.ImageSource}}
                source={this.state.ImageSource}
              >
                <View style={styles.overlay} >
                  <View style={styles.cameraIconView} >
                    <MaterialIcons
                      name="camera-alt"
                      size={32}
                      color='#ffffff'
                    />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.textFieldContainer}>
            <TextField
              style={styles.textFieldstyle}
              label='Name'
              autoCapitalize='words'
              textColor='#888585'
              tintColor='#888585'
              baseColor='#afadad'
              lineWidth={1}
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}
              value={this.state.name}
              blurOnSubmit={ false }
              returnKeyType={ "next" }
              onSubmitEditing={() => {
                this.focusNextField('two');
              }}
              onChangeText={ (name) => this.setState({ name }) }
              ref={ input => {
                  this.inputs['one'] = input;
              }}
            />
            <TextField
              style={styles.textFieldstyle}
              label='Zip Code'
              textColor='#888585'
              tintColor='#888585'
              baseColor='#afadad'
              lineWidth={1}
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}
              value={this.state.zip}
              blurOnSubmit={ true }
              returnKeyType={ "done" }
              onChangeText={ (zip) => this.setState({ zip }) }
              ref={ input => {
                  this.inputs['two'] = input;
              }}
            />
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{height: 30, width: width}} />
        </TouchableWithoutFeedback>
        <View style={styles.about}>
          <TextField
            style={styles.textFieldstyle}
            label='Tell us about yourself'
            textColor='#888585'
            tintColor='#888585'
            baseColor='#afadad'
            lineWidth={1}
            multiline={true}
            fontSize={15}
            titleFontSize={11}
            labelFontSize={11}
            value={this.state.about}
            onChangeText={ (about) => this.setState({ about }) }
          />
        </View>


        {/* <TouchableOpacity onPress={() => navigate('Preferences', {MyProfile: this})} style={styles.containerbusiness}>
          <View style={styles.textsection}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <MaterialIcons
                  name="favorite"
                  size={24}
                  style={styles.iconstyle}
                />
              </View>
              <Text
                style={styles.textstyle}>
                My preferences
              </Text>
            </View>
            <Text style={{fontFamily: "System",marginTop: 10}}>{this.state.myPrefs}</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => this.fetchAPI()}>
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
    container: {
      flex:1,
      alignContent: 'flex-start',
      backgroundColor:(Platform.OS==='ios')?'#f4f4f7':'#fff',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    namezipcode: {
      //flex:0.3,
      flexDirection:'row',
      paddingLeft:15,
      paddingRight:15,
    },
    about: {
      //paddingTop:90,
      paddingLeft:15,
      paddingRight:15,

    },

    containerbusiness: {
      paddingLeft:15,
      paddingRight:35,
      flexDirection:'row',
      paddingTop:17,
      paddingBottom:10
    },
    containergroup: {
      paddingLeft:15,
      paddingRight:15,
      paddingBottom:20,
      flexDirection:'row',

    },
    containerappsettings: {
      paddingLeft:15,
      paddingRight:15,
      paddingTop:15,
      paddingBottom:25,
      flexDirection:'row'
    },

    textFieldContainer: {
      flex: 1,
      //paddingLeft:10
      alignContent: 'center',
      justifyContent: 'center'
    },
    textsection:{
      paddingLeft:20
    },
    cameraIconView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconstyle:{
      color:'#9c9ebf',
    },
    textstyle:{
      fontFamily: "System",
      fontSize:16,
      fontWeight:"bold",
      color:'#212121',
      paddingBottom:3,
      paddingLeft: 10
    },
    textFieldstyle:{
      fontFamily: "System",
      //fontWeight: "600",
      alignSelf: 'stretch',
      //height: 44
    },
    imageContainer:{
      width: 80,
      height: 80,
      marginTop:30,
      borderRadius:40,
      overflow: 'hidden'
    },
    toolbar: {
      backgroundColor: '#484b89',
      height: 55
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(33, 33, 39, 0.7)',
      borderRadius:50,
      overflow: 'hidden'
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
