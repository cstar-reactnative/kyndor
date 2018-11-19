import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  Alert,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const api =  require('../api/index');
import Styles from '@theme/Styles';
import Colors from '@theme/Colors';
import Stores from '../stores/';
const FBSDK = require('react-native-fbsdk');
import IsIphoneX from '@theme/IsIphoneX';
const {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    //this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');

    //this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      loading: false,
      email:'',
      password:'',
      newemail:'',
      newpassword:'',
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
    ['email', 'password']
    .map((name) => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
        this.setState({ [name]: text });
      }
    });
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmit() {
    // this.props.navigation.navigate('HomeRouter'); // added for dev purpose
     let errors = {};
    // let a = 0;
    // let b = 0;
    // let e = 0;
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    // ['email', 'password']
    // .forEach((name) => { let value = this[name].value();
    //   if (!value) {
    //     errors[name] = 'Should not be empty';
    //     a=0;
    //     b=0;
    //     e=1;
    //   } else {
    //     if ('password' === name && value.length < 6) {
    //       errors[name] = 'Too short';
    //       a=0;
    //       b=0;
    //       e=1;
    //     }else{a = 1;}
    //     if ('email' === name && reg.test(value) === false){
    //       errors[name] = 'Email is Not Correct';
    //       a=0;
    //       b=0;
    //       e=1;
    //     }else{
    //       b = 1;
    //     }
    //   }
    // });
    // if (a === 1 && b===1 && e === 0) {
       this.fetchAPI();
    // }
    // a = 0;
    // b = 0;
    // e = 0;
    this.setState({ errors });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  checkAndLogin(userData){
    if((userData.is_email_verified) || (userData.is_phone_verified)){
      Stores.rootNavStore.setData('HomeNavRouter')
    }
    else{
      Stores.rootNavStore.setData('Verify')
    }
  }

  fetchAPI = () => {
    console.log('Calling Login API')
    this.setState({loading: true})
    let thisComp = this;
    api.login({email: this.state.email, password: this.state.password}, (e, r) => {
      this.setState({loading: false})
      if(e){
        alert("Error: "+e);
      }
      else{
        if(r.success == true){
          //  this.setState({newemail:r.result.user.email});
          //  this.setState({newpassword:r.result.user.password});
          // alert(r.result.user.user_id)
          console.log(JSON.stringify(r))
          console.log(r.result.user.user_type)

          try {
            AsyncStorage.setItem('@KyndorStore:token', r.result.token);
            AsyncStorage.setItem('@KyndorStore:myName', r.result.user.name);
            AsyncStorage.setItem('@KyndorStore:myEmail', (r.result.user.email) ? r.result.user.email : r.result.user.phone);
            AsyncStorage.setItem('@KyndorStore:userType', r.result.user.user_type);
            AsyncStorage.setItem('@KyndorStore:myId', r.result.user.user_id.toString());
            AsyncStorage.setItem('@KyndorStore:myData', JSON.stringify(r.result.user));

            if(r.result.user.profile_pic == null){
              AsyncStorage.setItem('@KyndorStore:myImage', 'no-image.png');
            }
            else{
              AsyncStorage.setItem('@KyndorStore:myImage', r.result.user.profile_pic);
            }

            if(r.result.user.user_type == 'user'){
              // Stores.rootNavStore.setData('HomeNavRouter')
              thisComp.checkAndLogin(r.result.user)
            }
            else if(r.result.user.user_type == 'group_owner'){
              Stores.rootNavStore.setData('GroupCreatorRouter')
            }

          }
          catch (error) {
            alert('Please try again. Internal Error: ',error);
          }
        }
        else {
          alert(r.error);
        }
      }
    });
  }

  handleFacebookLogin () {
    var thisComp = this
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
                  //console.log(result)
                  //alert('Success fetching data: ' + res.toString());
                  //let meow_json = JSON.stringify(res);
                  //alert('data = '+meow_json);
                  let fb_id = res.id;
                  let name = res.name;
                  let emailId = res.email;
                  thisComp.setState({loading: true})
                  api.login({email: res.email, password: res.id}, (e, r) => {
                    thisComp.setState({loading: false})
                    if(e){
                      console.log(JSON.stringify(e))
                      alert("Error: Please try again with a valid email and password.");
                    }
                    else{
                      if(r.success == true){
                        // alert(JSON.stringify(r.result.user))
                        try {
                          AsyncStorage.setItem('@KyndorStore:token', r.result.token);
                          AsyncStorage.setItem('@KyndorStore:myName', r.result.user.name);
                          AsyncStorage.setItem('@KyndorStore:myEmail', r.result.user.email);
                          AsyncStorage.setItem('@KyndorStore:userType', r.result.user.user_type);
                          AsyncStorage.setItem('@KyndorStore:myId', r.result.user.user_id.toString());
                          AsyncStorage.setItem('@KyndorStore:myData', JSON.stringify(r.result.user));
                          if(r.result.user.profile_pic == null){
                            AsyncStorage.setItem('@KyndorStore:myImage', 'no-image.png');
                          }
                          else{
                            AsyncStorage.setItem('@KyndorStore:myImage', r.result.user.profile_pic);
                          }
                          if(r.result.user.user_type == 'user'){
                            // Stores.rootNavStore.setData('HomeNavRouter')
                            thisComp.checkAndLogin(r.result.user)
                          }
                          else if(r.result.user.user_type == 'group_owner'){
                            Stores.rootNavStore.setData('GroupCreatorRouter')
                          }
                        }
                        catch (error) {
                          alert('Please try again. Internal Error.');
                        }
                      }
                      else {
                        alert("Error: Please try again with a valid email and password.");
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

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  componentWillMount(){
    let thisComp = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // alert(err)
        console.log('Token Error: '+err)
      }
      else{
        console.log('Saved Token: '+tokenItem)

        this.setState({loading: true})
        api.myProfile(tokenItem, (e, r) => {
          console.log('myProfile API:')
          console.log('e: '+e)
          console.log('r: '+r)
          this.setState({loading: false})
          if(e){
            // alert("Error: "+e)
          }
          else{
            if(r.success){
              if(r.result.subscribed_groups[0].user_type == 'user'){
                // Stores.rootNavStore.setData('HomeNavRouter')
                thisComp.checkAndLogin(r.result.subscribed_groups[0])
              }
              else if(r.result.subscribed_groups[0].user_type == 'group_owner'){
                Stores.rootNavStore.setData('GroupCreatorRouter')
              }
              // this.props.navigation.replace('HomeRouter');
              // Stores.rootNavStore.setData('HomeNavRouter')
            }
            else {
              // alert('Failed! Please try again.')
            }
          }
        })
      }
    });
  }

  rendersmall(){
    if(!this.state.loading){
      let { errors = {}, ...data } = this.state;

      const { email, password } = this.state;
      const enabled =
      email.length > 3 &&
      password.length > 3;

      return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#393c63" translucent barStyle="light-content" networkActivityIndicatorVisible = {true} />

            <View style={{ flex: 0.22, justifyContent: 'center', alignContent: 'center', alignItems: 'center',overflow: 'hidden'}} >
              <View style={styles.logoHolder} >
                <Image source={require('../images/kyndorlogo.png')} style={{width: 300, height: 95}} />
              </View>
            </View>

            <View style={{flex: 0.78}} >
              <Text style={{fontFamily: 'System', color: '#fff', fontSize: 18, alignSelf: 'center'}}>Your online school parent village</Text>
              <View style={styles.textFieldContainer}>
                {/* <TextField
                  lineWidth={1}
                  ref={this.emailRef}
                  value={data.email}
                  label='Email'
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize={16}
                  titleFontSize={12}
                  labelFontSize={12}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='next'
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitEmail}
                  error={errors.email}
                /> */}

                <View style={{marginTop: 30, padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.emailRef}
                    value={data.email}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Email/Phone"
                    placeholderTextColor='#a3a5c4'
                    // keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='next'
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEmail}
                    onChange={this.handleEmailChange}
                  />
                </View>

                <View style={{marginTop: 15, padding: 12,borderRadius: 9,
                backgroundColor: "rgba(47, 49, 89, 0.6)"}}>
                  <TextInput
                    ref={this.passwordRef}
                    value={data.password}
                    style={{fontFamily: "System",
                      fontSize: 16,
                      fontWeight: "normal",
                    fontStyle: "normal", color:"#fff",}}
                    textAlign={'center'}
                    selectionColor={'#fff'}
                    placeholder="Password"
                    placeholderTextColor='#a3a5c4'
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitPassword}
                    onChange={this.handlePasswordChange}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType='done'
                  />
                </View>

                {/* <TextField
                  lineWidth={1}
                  ref={this.passwordRef}
                  value={data.password}
                  label='Password'
                  textColor='#e8e9f0'
                  tintColor='#a3a5c4'
                  baseColor='#a3a5c4'
                  fontSize={16}
                  lineWidth={1}
                  titleFontSize={12}
                  labelFontSize={12}
                  secureTextEntry
                  autoCapitalize='none'
                  autoCorrect={false}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitPassword}
                  onChange={this.handlePasswordChange}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  error={errors.password}
                  title=''
                /> */}
              </View>

              <View style={{flex:0.1,marginTop:30, alignItems: 'center'}}>
                <TouchableHighlight
                  onPress={() => Stores.rootNavStore.setData('ForgotPassword')}
                  underlayColor={'transparent'}>
                  <Text style={{ fontFamily: "System", color: '#FFFFFF', fontSize: 16, paddingTop: 10, paddingBottom: 10}}> Forgot password? </Text>
                </TouchableHighlight>
              </View>
              <View style={{flex: 0.43, justifyContent: 'space-between', alignContent: 'center'}} >
                <TouchableOpacity
                  disabled={!enabled}
                  style={[styles.loginButton, {backgroundColor:(!enabled?'#60678a7a':'#dad4d4')}]}
                  onPress={this.onSubmit}>
                  <Text style={{ fontFamily: "System", color: '#3f4171', fontSize: 16, fontWeight: '500' }}> Log in </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginFacebook}
                  onPress={() => this.handleFacebookLogin()} >
                  <View style={{justifyContent: 'flex-start'}}>
                    <Image source={require('../images/fb_icon.png')} />
                  </View>
                  <Text style={{fontFamily: "System", marginLeft: 20, color: '#fff', fontSize: 16 ,fontWeight: '500' }}>Log in with Facebook</Text>
                </TouchableOpacity>

                <TouchableHighlight
                  style={styles.registerButton}
                  onPress={() => Stores.rootNavStore.setData('Register')}
                  underlayColor={'transparent'}>
                  <Text style={{ fontFamily: "System", color: '#FFFFFF', fontSize: 16 }}>- I don't have an account</Text>
                </TouchableHighlight>
              </View>

              <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', marginBottom: 15, alignItems: 'center', bottom: 0, position: 'absolute' }} >
                <Text style={{ fontFamily: "System", color: "#a3a5c4" }} >By signing up, I agree</Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{ fontFamily: "System", color: "#a3a5c4" }} >to Kyndor </Text>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() =>{
                      Stores.webPageData.setData('http://kyndor.com/term-of-service.html');
                      Stores.rootNavStore.setData('WebPage');
                    }
                    }>
                    <Text style={{ fontFamily: "System", color: "#fff" }} >Terms of Service</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    else {
      return(
        <Text></Text>
      );
    }
  }

  render() {
    return (
      <ImageBackground style={[styles.imageBackgroundStyle, {opacity:(!this.state.loading?1:.7)}]} source={require('../images/background.png')}
      >

        <ActivityIndicator
          color="white"
          animating={this.state.loading}
          size="large"
          style={{position: 'absolute', alignSelf: 'center'}}
        />
        {this.rendersmall()}


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
    paddingTop: IsIphoneX() ? 40 : 20,
    paddingBottom: IsIphoneX() ? 20 : 0,
    justifyContent: 'center'
  },
  logoHolder: {
    width: 300,
    height: 120,
    marginTop: 30,

  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 40,
    paddingRight: 40,
  },
  textFieldContainer: {
    flex: 0.3,
    //paddingBottom: 20
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#60678a7a',
    padding: 12,
    elevation: 2,
    marginTop: 10,
    borderRadius: 9
  },
  registerButton: {
    alignItems: 'center',
  },
  loginFacebook: {
    flexDirection: 'row',
    backgroundColor: '#4b75a3',
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
    elevation: 2,
    borderRadius: 9
  },
});
