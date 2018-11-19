import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
const api =  require('../api/index');
import Styles from '@theme/Styles';
import Colors from '@theme/Colors';
import Stores from '../stores/';
import { CheckBox } from 'react-native-elements';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class Register extends React.Component {
  static navigationOptions = {
    title: 'Register',
    header: null
  };

  constructor(props){
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitReferalEmail = this.onSubmitReferalEmail.bind(this);

    this.nameRef = this.updateRef.bind(this, 'name')
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.referalEmailRef = this.updateRef.bind(this, 'referalEmail');

    this.state= {
      checked1: false,
      loading: false,
      name:'',
      email:'',
      password:'',
      referalEmail:''
    };
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    ['name', 'email', 'password', 'referalEmail']
    .map((name) => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
        this.setState({ [name]: text });
      }
    });
  }

  onSubmitName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmitReferalEmail() {
    this.referalEmail.focus();
  }

  onSubmit() {
    let errors = {};
    // let a = 0;
    // let b = 0;
    // let c = 0;
    // let d = 0;
    // let e = 0;
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    // let namreg=/^[A-Za-z]{2}/;
    //
    //
    // ['name' ,'email', 'password', 'referalEmail']
    // .forEach((name) => {
    //   let value = this[name].value();
    //   if (!value) {
    //     errors[name] = 'Should not be empty';
    //     a=0;
    //     b=0;
    //     c=0;
    //     d=0;
    //     e=1;
    //   } else {
    //
    //     if ('name' === name &&  namreg.test(value) === false) {
    //       errors[name] = 'Please write proper name';
    //       a=0;
    //       b=0;
    //       c=0;
    //       d=0;
    //       e=1;
    //     }else{
    //       a = 1;
    //     }
    //
    //     if ('password' === name && value.length < 6 ) {
    //       errors[name] = 'Too short';
    //       a=0;
    //       b=0;
    //       c=0;
    //       d=0;
    //       e=1;
    //     }else{
    //       b = 1;
    //     }
    //
    //     if ('email' === name && reg.test(value) === false){
    //       errors[name] = 'Email is Not Correct';
    //       a=0;
    //       b=0;
    //       c=0;
    //       d=0;
    //       e=1;
    //     }else{
    //       c = 1;
    //     }
    //
    //     if ('referalEmail' === name && reg.test(value) === false){
    //       errors[name] = 'This should be a valid email';
    //       a=0;
    //       b=0;
    //       c=0;
    //       d=0;
    //       e=1;
    //     }else{
    //       c = 1;
    //     }
    //   }
    // });
    // if (a === 1 && b===1 && c===1 && e === 0) {
    if (this.state.checked1) {
      this.fetchAPI();
    } else {
      alert("Please accept Terms & Conditions")
    }

    // }
    // a = 0;
    // b = 0;
    // c = 0;
    // e = 0;
    this.setState({ errors });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  fetchAPI = () => {
    this.setState({loading:true});
    api.createUser({name: this.state.name, email: this.state.email, password: this.state.password, facebook: 'NO', refferId: this.state.referalEmail}, (e, r) => {
      this.setState({loading:false});
      if(e){
        alert("Error: "+e);
      }
      else{
        if(r.success == true){
          try {
            AsyncStorage.setItem('@KyndorStore:token', r.result.token);
            AsyncStorage.setItem('@KyndorStore:myName', r.result.user.name);
            AsyncStorage.setItem('@KyndorStore:myEmail', (r.result.user.email) ? r.result.user.email : r.result.user.phone);
            AsyncStorage.setItem('@KyndorStore:myData', JSON.stringify(r.result.user));

            if(r.result.user.profile_pic == null){
              AsyncStorage.setItem('@KyndorStore:myImage', 'no-image.png');
            }
            else{
              AsyncStorage.setItem('@KyndorStore:myImage', r.result.user.profile_pic);
            }
            AsyncStorage.setItem('@KyndorStore:myId', r.result.user.user_id.toString());

            // this.props.navigation.replace('HomeRouter');
            // Stores.rootNavStore.setData('HomeNavRouter')
            Stores.rootNavStore.setData('Verify')
          }
          catch (error) {
            alert('Please try again. Internal Error: ',error);
          }
        }
        else {
          Alert.alert('Registration Failed. ',r.error);
        }
      }
    });
  }

  handleFacebookLogin () {
    let thisFunc = this
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken;
              const responseInfoCallback = (err, res) => {
                if (err) {
                  alert('Error fetching data: ' + err.toString());
                } else {
                  // let fbData_json = JSON.stringify(res);
                  // alert('data = '+fbData_json);
                  let fb_id = res.id;
                  let name = res.name;
                  let emailId = res.email;

                  thisFunc.setState({
                    name:res.name,
                    email:res.email,
                  })
                  thisFunc.setState({loading:true});
                  api.createUser({name: res.name, email: res.email, password: res.id, facebook: 'YES', refferId: 'FACEBOOK'}, (e, r) => {
                    thisFunc.setState({loading:false});
                    if(e){
                      alert("Error: "+e);
                    }
                    else{

                      if(r.success == true){
                        try {
                          AsyncStorage.setItem('@KyndorStore:token', r.result.token);
                          AsyncStorage.setItem('@KyndorStore:myName', r.result.user.name);
                          AsyncStorage.setItem('@KyndorStore:myEmail', r.result.user.email);
                          AsyncStorage.setItem('@KyndorStore:myData', JSON.stringify(r.result.user));
                          if(r.result.user.profile_pic == null){
                            AsyncStorage.setItem('@KyndorStore:myImage', 'no-image.png');
                          }
                          else{
                            AsyncStorage.setItem('@KyndorStore:myImage', r.result.user.profile_pic);
                          }
                          AsyncStorage.setItem('@KyndorStore:myId', r.result.user.user_id.toString());

                          // navigate('HomeRouter');
                          // Stores.rootNavStore.setData('HomeNavRouter')
                          Stores.rootNavStore.setData('Verify')
                        }
                        catch (error) {
                          alert('Please try again. Internal Error: ',error);
                        }
                      }
                      else {
                        Alert.alert('Registration Failed. ',r.error);
                      }
                    }
                  });
                }
              }

              const infoRequest = new GraphRequest('/me', {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              }, responseInfoCallback);

              // Start the graph request.
              new GraphRequestManager()
              .addRequest(infoRequest)
              .start()
            }
          )
          //this.props.navigation.navigate('HomeRouter');
        }
      },
      function (error) {
        //console.log('Login fail with error: ' + error)
        alert('Login failed with error: ' + error);
      }
    )
  }
    handleNameChange = (evt) => {
      this.setState({ name: evt.target.value });
    }

    handleEmailChange = (evt) => {
      this.setState({ email: evt.target.value });
    }
    handlePasswordChange = (evt) => {
      this.setState({ password: evt.target.value });
    }
    handleReferalEmailChange = (evt) => {
      this.setState({ referalEmail: evt.target.value });
    }

  render() {
    // const { navigate, replace } = this.props.navigation;
    let { errors = {}, ...data } = this.state;
    const { name, email, password } = this.state;

    // const enabled =
    //       name.length>2 &&
    //       email.length > 3 &&
    //       password.length > 3;

    const enabled = true

    return(
      <ImageBackground style={[Styles.loginImageBackgroundStyle, {opacity:(!this.state.loading?1:.7)}]} source={require('../images/background.png')}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={Styles.loginContainer} >
            <StatusBar backgroundColor={Colors.statusBarBackground} translucent={false} barStyle="light-content" />
            <View style={{flex: 0.20, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}} >
              <View style={{width: 300,
                height: 120,            //used in login,register and forgotPasswprd
              marginTop: 20}} >
                <Image source={require('../images/kyndorlogo.png')} style={{width: 300, height: 95}}/>
              </View>
            </View>
            <View style={{flex: 0.80}} >

              <View style={{marginTop: 10, flex:0.15}}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.nameRef}
                  label='Name'
                  value={this.state.name}
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize = {16}
                  titleFontSize = {12}
                  labelFontSize = {12}
                  autoCapitalize = 'words'
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onChange={this.handleNameChange}
                  onSubmitEditing={this.onSubmitName}
                  error={errors.name}
                /> */}
                <View style={{padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.nameRef}
                    value={this.state.name}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Name"
                    placeholderTextColor='#a3a5c4'
                    autoCapitalize = 'words'
                    autoCorrect = {false}
                    returnKeyType = 'next'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onChange={this.handleNameChange}
                    onSubmitEditing={this.onSubmitName}
                  />
                </View>
              </View>
              <View style={{flex:0.15}}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.emailRef}
                  label='Email'
                  value={this.state.email}
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize = {16}
                  titleFontSize = {12}
                  labelFontSize = {12}
                  keyboardType = 'email-address'
                  autoCapitalize = 'none'
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onChange={this.handleEmailChange}
                  onSubmitEditing={this.onSubmitEmail}
                  error={errors.email}
                /> */}
                <View style={{padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.emailRef}
                    value={this.state.email}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder='Email or Phone number'
                    placeholderTextColor='#a3a5c4'
                    // keyboardType = 'email-address'
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    returnKeyType = 'next'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onChange={this.handleEmailChange}
                    onSubmitEditing={this.onSubmitEmail}
                  />
                </View>
              </View>
              <View style={{flex:0.15}}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.passwordRef}
                  label='Password'
                  value={this.state.password}
                  secureTextEntry = {true}
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize = {16}
                  titleFontSize = {12}
                  labelFontSize = {12}
                  autoCapitalize = 'none'
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onChange={this.handlePasswordChange}
                  onSubmitEditing={this.onSubmitPassword}
                  error={errors.password}
                /> */}
                <View style={{padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.passwordRef}
                    value={this.state.password}
                    secureTextEntry = {true}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Password"
                    placeholderTextColor='#a3a5c4'
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    returnKeyType = 'next'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onChange={this.handlePasswordChange}
                    onSubmitEditing={this.onSubmitPassword}
                  />
                </View>
              </View>

              <View style={{flex:0.15}}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.referalEmailRef}
                  label='Referal Email id'
                  value={this.state.referalEmail}
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize = {16}
                  titleFontSize = {12}
                  labelFontSize = {12}
                  keyboardType = 'email-address'
                  autoCapitalize = 'none'
                  autoCorrect = {false}
                  returnKeyType = 'next'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onChange={this.handleReferalEmailChange}
                  onSubmitEditing={this.onSubmitReferalEmail}
                  error={errors.referalEmail}
                /> */}
                <View style={{padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.referalEmailRef}
                    value={this.state.referalEmail}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder='Referral Email or Phone number'
                    placeholderTextColor='#a3a5c4'
                    // keyboardType = 'email-address'
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    returnKeyType = 'done'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onChange={this.handleReferalEmailChange}
                    onSubmitEditing={this.onSubmitReferalEmail}
                  />
                </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
                <CheckBox
                  iconType='material'
                  checkedIcon='check-box'
                  uncheckedIcon='check-box-outline-blank'
                  checked={this.state.checked1}
                  checkedColor='#fff'
                  containerStyle={Styles.checkboxcontainer}
                  onPress={() => this.setState({ checked1: !this.state.checked1 })}
                />
                <Text style={{color: "#a3a5c4"}} >I agree to Kyndor</Text>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() =>{
                    Stores.webPageData.setData('http://kyndor.com/term-of-service.html');
                    Stores.rootNavStore.setData('WebPage');
                  }
                  }>
                  <Text style={{color: "#fff"}} > Terms of Service</Text>
                </TouchableHighlight>
              </View>

              <View style={{flex: 0.25, alignContent: 'center'}}>
                <TouchableOpacity
                  disabled={!enabled}
                  style={{alignItems: 'center',
                    padding: 12,
                    elevation: 2,
                    borderRadius: 9,
                    marginBottom: 20,marginTop: 20, backgroundColor:(!enabled?'#60678a7a':'#dad4d4')}}

                  onPress={this.onSubmit} >
                  <Text style={{fontFamily: "System", color: '#474a82', fontSize: 15,fontWeight:'500'}}> CREATE ACCOUNT </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row',
                  backgroundColor: '#4b75a3',
                  alignItems: 'center',
                  padding: 12,
                  elevation: 2,
                  borderRadius: 9,
                marginBottom: 10}} onPress={() => this.handleFacebookLogin()} >
                  <View style={{justifyContent: 'flex-start'}}>
                    <Image source={require('../images/fb_icon.png')} />
                  </View>
                  <Text style={{fontFamily: "System", marginLeft: 15, color: '#fff', fontSize: 14,fontWeight:'500'}}> SIGN UP WITH FACEBOOK</Text>
                </TouchableOpacity>

                <TouchableHighlight
                  style={{alignItems: 'center',marginTop:10}} underlayColor={'transparent'}
                  // onPress={() => this.props.navigation.goBack()} >
                  onPress={() => Stores.rootNavStore.setData('Login')}>
                  <Text style={{fontFamily: "System", color: '#FFFFFF', fontSize: 15,fontWeight:'500'}}> - I ALREADY HAVE AN ACCOUNT </Text>
                </TouchableHighlight>
              </View>
              {/* <View style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontFamily: "System", color: "#a3a5c4"}} >By signing up, I agree</Text>
                <View style={{flexDirection: 'row'}} >
                  <Text style={{fontFamily: "System", color: "#a3a5c4"}} >to Kyndor</Text>

                  <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() =>{
                Stores.webPageData.setData('http://kyndor.com/term-of-service.html');
                Stores.rootNavStore.setData('WebPage');
                }
                }>
                <Text style={{fontFamily: "System", color: "#fff"}} > Terms of Service</Text>
                  </TouchableHighlight>
                </View>
              </View> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
  );
}
}

// const styles = StyleSheet.create({
//   logoHolder: {
//     marginTop: 30
//   },
//   imageBackgroundStyle: {
//     flex: 1,
//     paddingTop: (Platform.OS === 'ios') ? 20 : 0
//   },
//   container: {
//     backgroundColor: 'transparent',
//     flex: 1,
//     paddingLeft: 50,
//     paddingRight: 50
//   },
//   loginFacebook: {
//     flexDirection: 'row',
//     backgroundColor: '#4b75a3',
//     alignItems: 'center',
//     padding: 12,
//     elevation: 2,
//     borderRadius: 3
//   },
//   registerButton: {
//     alignItems: 'center',
//
//     padding: 12,
//     elevation: 2,
//     marginTop: 30,
//     borderRadius: 3
//   },
//   alreadyButton: {
//     alignItems: 'center'
//   }
// });
