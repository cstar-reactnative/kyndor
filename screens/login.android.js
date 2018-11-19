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
  ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '@theme/Styles';
import Colors from '@theme/Colors';
const api =  require('../api/index');
import Stores from '../stores/';
const FBSDK = require('react-native-fbsdk');
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
    let a = 0;
    let b = 0;
    let e = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let phonereg = /^[0-9]{10}|[0-9]{11}|[0-9]{12}|[0-9]{13}$/;
    ['email', 'password']
    .forEach((name) => {
      let value = this[name].value();
      if (!value) {
        errors[name] = 'Should not be empty';
        a=0;
        b=0;
        e=1;
      }
      else {
        if ('password' === name && value.length < 6) {
          errors[name] = 'Too short';
          a=0;
          b=0;
          e=1;
        }
        else{
          a = 1;
        }
        if ('email' === name && ((reg.test(value) === false) && (phonereg.test(value) === false))){
        // if ('email' === name && reg.test(value) === false){
          errors[name] = 'Email/Phone is Not Correct';
          a=0;
          b=0;
          e=1;
        }
        else{
          b = 1;
        }
      }
    });
    if (a === 1 && b===1 && e === 0) {
      this.fetchAPI();
    }
    a = 0;
    b = 0;
    e = 0;
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
                      console.log(JSON.stringify(r))
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
                          // navigate('HomeRouter');
                          // Stores.rootNavStore.setData('HomeNavRouter')
                          thisComp.checkAndLogin(r.result.user)
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
        <View style={Styles.loginContainer}>
          <StatusBar backgroundColor={Colors.statusBarBackground} translucent={false} barStyle="light-content" />
          <View style={{ flex: 0.22, justifyContent: 'center', alignContent: 'flex-start'}} >
            <View style={Styles.loginLogoHolder} >
              <Image source={require('../images/kyndorlogo.png')} resizeMode='center' style={{width: 300, height: 120}} />
            </View>
          </View>

          <View style={{flex: 0.78}} >
            <Text style={{fontFamily: 'System', color: '#fff', fontSize: 18, alignSelf: 'center'}}>Your online school parent village</Text>
            <View style={Styles.loginTextFieldContainer}>
              <TextField
                ref={this.emailRef}
                value={this.state.email}
                label='Email/Phone'
                textColor='#e8e9f0'
                tintColor='#a3a5c4'
                baseColor='#a3a5c4'
                fontSize={16}
                lineWidth={1}
                titleFontSize={12}
                labelFontSize={12}
                // keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType='next'
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                onChange={this.handleEmailChange}
                error={errors.email}
              />

              <TextField
                ref={this.passwordRef}
                value={this.state.password}
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
                onChange={this.handlePasswordChange}
                onSubmitEditing={this.onSubmitPassword}
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                error={errors.password}
                title=''
              />
            </View>

            <View style={{paddingTop:40, flex: 0.43, justifyContent: 'space-between', alignContent: 'center'}} >
              <TouchableOpacity
                disabled={!enabled}
                style={[Styles.loginButton, {marginTop: 10, backgroundColor:(!enabled?'#60678a7a':'#dad4d4')}]}
                onPress={this.onSubmit}>
                <Text style={{ color: '#3f4171', fontSize: 16, fontWeight: '500' }}> LOG IN </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.loginFacebook}
                onPress={() => this.handleFacebookLogin()} >
                <View style={{justifyContent: 'flex-start'}}>
                  <Image source={require('../images/fb_icon.png')} />
                </View>
                <Text style={{marginLeft: 20, color: '#fff', fontSize: 16 ,fontWeight: '500' }}> LOG IN WITH FACEBOOK</Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={Styles.registerButton}
                // onPress={() => navigate('Register')}
                // onPress={() => Stores.rootNavStore.setData('Register')}
                onPress={() => Stores.rootNavStore.setData('Register')}
                underlayColor={'transparent'}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}> - I DON'T HAVE AN ACCOUNT </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[Styles.registerButton,{marginTop: 20}]}
                // onPress={() => navigate('ForgotPassword')}
                onPress={() => Stores.rootNavStore.setData('ForgotPassword')}
                underlayColor={'transparent'}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}> FORGOT PASSWORD? </Text>
              </TouchableHighlight>
            </View>

            <View style={{ flex: 0.2, width: '100%', justifyContent: 'center', marginBottom: 15, alignItems: 'center', bottom: 0, position: 'absolute'}} >
              <Text style={{ color: "#a3a5c4" }} >By signing up, I agree</Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={{ color: "#a3a5c4" }} >to Kyndor </Text>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() =>{
                    Stores.webPageData.setData('http://kyndor.com/term-of-service.html');
                    Stores.rootNavStore.setData('WebPage');
                  }
                  }>
                  {/* onPress={() => navigate('Terms')}> */}
                  <Text style={{ color: "#fff" }} >Terms of Service</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>

        </View>
      )
    } else {
      return(
        <Text></Text>
      )
    }
  }

  render() {
    // const { navigate, replace } = this.props.navigation;
    //let { Email } = this.state;
    //let { Password } = this.state;
    // let { errors = {}, ...data } = this.state;
    //
    // const { email, password } = this.state;
    // const enabled =
    // email.length > 3 &&
    // password.length > 3;

    return (
      <ImageBackground style={[Styles.loginImageBackgroundStyle, {opacity:(!this.state.loading?1:.7)}]} source={require('../images/background.png')}
      >

        <ActivityIndicator
          color="white"
          animating={this.state.loading}
          size="large"
          style={{position: 'absolute', alignSelf: 'center'}}
        />
        {this.rendersmall()}
        {/* <View style={Styles.loginContainer}>
          <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />
          <View style={{ flex: 0.22, justifyContent: 'center', alignContent: 'flex-start'}} >
            <View style={Styles.loginLogoHolder} >
          <Image source={require('../images/kyndorlogo.png')} />
            </View>
          </View>

          <View style={{flex: 0.78}} >
            <View style={Styles.loginTextFieldContainer}>
          <TextField
          ref={this.emailRef}
          value={this.state.email}
          label='Email'
          textColor='#e8e9f0'
          tintColor='#a3a5c4'
          baseColor='#a3a5c4'
          fontSize={16}
          lineWidth={1}
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
          onChange={this.handleEmailChange}
          error={errors.email}
          />

          <TextField
          ref={this.passwordRef}
          value={this.state.password}
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
          onChange={this.handlePasswordChange}
          onSubmitEditing={this.onSubmitPassword}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
          error={errors.password}
          title=''
          />
            </View>

            <View style={{flex:0.17,paddingTop:20}}>
          <TouchableHighlight
          onPress={() => Stores.rootNavStore.setData('ForgotPassword')}
          underlayColor={'transparent'}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, marginTop: 40 }}> FORGOT PASSWORD? </Text>
          </TouchableHighlight>
            </View>
            <View style={{flex: 0.43, justifyContent: 'space-between', alignContent: 'center'}} >
          <TouchableOpacity
          disabled={!enabled}
          style={[Styles.loginButton, {backgroundColor:(!enabled?'#60678a7a':'#dad4d4')}]}
          onPress={this.onSubmit}>
          <Text style={{ color: '#3f4171', fontSize: 16, fontWeight: '500' }}> LOG IN </Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={Styles.loginFacebook}
          onPress={() => this.handleFacebookLogin()} >
          <View style={{justifyContent: 'flex-start'}}>
          <Image source={require('../images/fb_icon.png')} />
          </View>
          <Text style={{marginLeft: 20, color: '#fff', fontSize: 16 ,fontWeight: '500' }}> LOG IN WITH FACEBOOK</Text>
          </TouchableOpacity>

          <TouchableHighlight
          style={Styles.registerButton}
          onPress={() => Stores.rootNavStore.setData('Register')}
          underlayColor={'transparent'}>
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}> - I DON'T HAVE AN ACCOUNT </Text>
          </TouchableHighlight>
            </View>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', marginTop: 15 }} >
          <Text style={{ color: "#a3a5c4" }} >By signing up, I agree</Text>
          <View style={{ flexDirection: 'row' }} >
          <Text style={{ color: "#a3a5c4" }} >to Kyndor </Text>
          <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => Stores.rootNavStore.setData('Terms')}>
          <Text style={{ color: "#fff" }} >Terms of Service</Text>
          </TouchableHighlight>
          </View>
            </View>
          </View>

        </View> */}

      </ImageBackground>
    );
  }
}

// const styles = StyleSheet.create({
//   imageBackgroundStyle: {
//     flex: 1,
//     paddingTop: (Platform.OS === 'ios') ? 20 : 0,
//     justifyContent: 'center'
//   },
//   logoHolder: {
//     marginTop: 30
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     paddingLeft: 50,
//     paddingRight: 50,
//     // zIndex: 9
//   },
//   textFieldContainer: {
//     flex: 0.3,
//   },
//   loginButton: {
//     alignItems: 'center',
//
//     padding: 12,
//     elevation: 2,
//     marginTop: 10,
//     borderRadius: 3
//   },
//   registerButton: {
//     alignItems: 'center',
//   },
//   loginFacebook: {
//     flexDirection: 'row',
//     backgroundColor: '#4b75a3',
//     alignItems: 'center',
//     padding: 12,
//     elevation: 2,
//     borderRadius: 3
//   },
//   indicator: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 110,
//     left: 10,
//     right: 10,
//     bottom: 10
//   }
// });
