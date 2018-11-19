import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
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
  Modal,
  Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
const api =  require('../../api/index');
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
import Contacts from "react-native-contacts";
import Communications from "react-native-communications";

let { width, height } = Dimensions.get('window');

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}

export default class ChatInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      contacts: [],
      contactPerm: "",
      smsPerm: "",
      mailScreen: true
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){

  }

  componentDidMount() {
    if (Platform.OS == "android") {
      this.requestReadSMSPermision();
    }
    this.checkPermissions();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  sendInvite(emailArray){
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        console.log('calling send invite')
        let g_data = Stores.groupStore.getData()
        for (x in emailArray){

          api.invitePeople({
            token:tokenItem,
            email:emailArray[x],
            groupId: g_data.group_id,
            groupName: g_data.group_name
          },
          (e, r) => {
            if(e){
              console.log(JSON.stringify(e))
            }
            else{
              console.log(JSON.stringify(r))
            }
          })
        }
        //alert('Invite(s) sent.')
        Alert.alert(
          'Invite email(s)',
          'Invitation sent successfully',
          [
            {text: 'Close', onPress: () => this.props.navigation.goBack()},
            {text: 'Invite more', onPress: () => this.textInput.clear()},
          ],
          { cancelable: false }
        )
      }
    });
  }

  getAllEmails(){
    var allEmails = this.state.email.trim()
    var pos = allEmails.indexOf(',')
    var lpos = allEmails.lastIndexOf(',')
    var emailArray = []
    var strLength = allEmails.length;
    let wrongEmail = false;

    if(pos == -1){
      console.log('s1')
      if(this.validateEmail(allEmails)){
        emailArray.push(allEmails)
      }
      else{
        alert('Invalid one or more email id(s).')
        wrongEmail=true;
      }
    }

    else if((pos == lpos) && (lpos == strLength - 1)){
      console.log('s2')
      var newEmail = allEmails.substr(0, pos)
      newEmail = newEmail.trim()
      console.log(newEmail)
      if(this.validateEmail(newEmail)){
        emailArray.push(newEmail)
      }
      else{
        alert('Invalid one or more email id(s).')
        wrongEmail=true;
      }
    }

    else{
      console.log('s3')
      if(allEmails[strLength - 1] != ','){
        allEmails = allEmails.concat("", ',');
      }

      while (pos != -1){
        var newEmail = allEmails.substr(0, pos)
        newEmail = newEmail.trim()
        console.log(newEmail)
        if(this.validateEmail(newEmail)){
          emailArray.push(newEmail)
        }
        else{
          alert('Invalid one or more email id(s).')
          wrongEmail=true;
          break;
        }
        allEmails = allEmails.substr(pos+1, strLength)
        pos = allEmails.indexOf(',')
      }
    }

    console.log(emailArray)
    if(emailArray.length > 5){
      alert('Max limit of email ids exceeded.')
    }
    else{
      if (!wrongEmail) {
        this.sendInvite(emailArray)
      }
    }
  }

  checkPermissions() {
    Contacts.checkPermission((err, permission) => {
      if (err) throw err;
      this.setState({ contactPerm: permission });
      if (permission === "undefined") {
        Contacts.requestPermission((err, permission) => {
          console.log("error", err, "permission", permission);
          if (permission === "authorized") {
            console.log("permission to access contacts", permission);
            this.getContacts();
          }
        });
      }
      if (permission === "authorized") {
        console.log("permission to access contacts", permission);
        this.getContacts();
      }
      if (permission === "denied") {
        alert("Permission to access contacts: ", permission);
        console.log("permission to access contacts", permission);
      }
    });
  }

  requestReadSMSPermision() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
      .then(permission => {
        console.log("permission to send sms ", permission);
        this.setState({ smsPerm: permission });
      })
      .catch(err => {
        console.log("PermissionsAndroid", err);
      });
  }

  getContacts = () => {
    Contacts.getAll((err, contacts) => {
      const data = contacts.filter(item => item.phoneNumbers.length > 0);
      const sortData = data.sort((a, b) =>
        a.givenName.localeCompare(b.givenName)
      );
      this.setState({
        contacts: sortData || []
      });
    });
  };

  sendSMS = item => {
    const nums = [];
    item.phoneNumbers.map(val => {
      const str = val.number.replace(/\s+/g, "");
      nums.push(str);
    });

    Communications.text(
      nums[0],
      `Please connect with me on Kyndor.
      Download iOS: https://itunes.apple.com/us/app/kyndor/id1380104261?ls=1&mt=8
      Download Android: https://play.google.com/store/apps/details?id=com.kyndor
      `
    );
  };

  renderContact = ({ item, index }) => {
    const nums = [];
    item.phoneNumbers.map(val => {
      const str = val.number.replace(/\s+/g, "");
      nums.push(str);
    });
    return (
      <View key={`${index}`} style={styles.row}>
        <View style={styles.rowItem}>
          <View>
            <Text style={styles.nameText}>{item.givenName}</Text>
            <Text style={styles.phoneNumber}>{nums[0]}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.sendSMS(item)}
            style={{
              backgroundColor: "#42e2f4",
              margin: 10,
              justifyContent: "center"
            }}
          >
            <Text style={styles.nameText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render(){
    const { navigate, goBack, replace } = this.props.navigation;
    if(this.state.mailScreen){
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          <View style={styles.businessNav}>
            <View style={styles.navButtonback}>
              <TouchableHighlight underlayColor={'transparent'} onPress = {() => goBack()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                    size={Platform.OS==="ios"?40:25}
                    color={Platform.OS==='ios'?"#9513fe":"#fff"}
                  />
                  {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.textinputView}>
              <Text style={{fontFamily: 'System',color:(Platform.OS==='ios')? "black" :'white',fontSize:18}}>Invite people</Text>
            </View>
            <View style={{flex: 0.2}}>
              <Text></Text>
            </View>
          </View>

          <View style={styles.centerpart}>
            <Text style={styles.centerparthead}>
              Enter up to 5 email addresses. Separate email addresses using a comma (,).
            </Text>
            {(Platform.OS==='android')?
              <View style={{width: '80%'}}>
                <TextField
                  //style={{fontFamily: 'System',}}
                  ref={input => { this.textInput = input }}
                  label='E-mail'
                  textColor='#000000'
                  tintColor='#000000'
                  baseColor='#000000'
                  fontSize={16}
                  titleFontSize={12}
                  labelFontSize={12}
                  lineWidth={1.3}

                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                />
              </View>
            :
            <View style={{backgroundColor: "#fff", paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderTopColor: "#bcbbc1",borderBottomWidth: .5,borderBottomColor: "#bcbbc1"}}>
              <Text style={{flex: .3, fontFamily: "System", fontSize: 18,color: "black"}}>E-mail</Text>
              <TextInput
                ref={input => { this.textInput = input }}
                style={{flex: .7,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                placeholder = "Please enter e-mail"
                placeholderTextColor = "#c7c7cd"

                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </View>
            }
            {/* <TextInput
              style={{height: 40, width: 200, marginTop: 15}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            /> */}
            {/* <TouchableOpacity style={{marginTop:25}} onPress={() => this.sendInvite()}>
              <View style={{borderWidth:1, borderColor:'#9c23fe', borderRadius:3, paddingVertical:10, paddingHorizontal:15 }}>
                <Text style={{fontFamily: 'System',color:'#9c23fe'}}>INVITE</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.getAllEmails()} style={styles.saveButton}>
              <Text style={styles.saveText}>INVITE</Text>
            </TouchableOpacity>

            <View style={styles.orDiv}>
              <Text style={styles.orText}>OR</Text>
            </View>

            <TouchableOpacity onPress={() => this.setState({mailScreen:false})} style={styles.saveButton}>
              <Text style={styles.saveText}>INVITE VIA CONTACTS</Text>
            </TouchableOpacity>

          </View>

        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          <Text style={styles.centerparthead}>
            Send SMS to your contacts here.
          </Text>

          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={this.state.contacts}
            renderItem={this.renderContact}
            style={{ width: "100%" }}
          />

          <TouchableOpacity onPress={() => this.setState({mailScreen:true})} style={styles.saveButton}>
            <Text style={styles.saveText}>INVITE VIA EMAIL</Text>
          </TouchableOpacity>

        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX()?40:20 : 0,
    flex:1
  },
  textinputView:{
    //flex:7,
    //marginLeft:(Platform.OS==='ios')?40:15
  },
  navButtonback:{
    //justifyContent:'center',
    //paddingLeft: 8,
    //flex:1,
  },
  businessNav: {
    //flex: 1,
    alignItems: 'center',
    //justifyContent: (Platform.OS==='ios') ? 'space-between' : 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:5,
    paddingRight:15,
    //maxHeight: 50,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    zIndex: 40,
    //position: 'absolute',
    //top: 20
  },
  centerparthead:{
    fontFamily: "System",
    color:'rgba(0,0,0,0.5)',
    fontSize:18,
    paddingBottom:20,
    paddingTop:20,
    paddingHorizontal: 10
  },
  centerpart:{
    backgroundColor: '#f4f4f7',
    flex: 1,
    //justifyContent:'center',
    alignItems:'center'
  },
  saveText:{
    fontFamily: "System",
    color: (Platform.OS==='ios')?'#9513fe':'#fff',
  },
  orText:{
    fontFamily: "System",
    color: (Platform.OS==='ios') ? 'rgba(149, 19, 254, 0.15)' : '#32345f',
  },
  saveButton:{
    alignItems: 'center',
    backgroundColor: (Platform.OS==='ios') ? 'rgba(149, 19, 254, 0.15)' : '#32345f',
    padding: 12,
    elevation: 2,
    margin: 30,
    width: "80%",
    borderRadius: 3
  },
  orDiv:{
    alignItems: 'center',
    backgroundColor:'transparent',
    padding: 10,
    margin: 10,
    width: "80%",
    borderRadius: 3
  },
  nameText: {
    fontSize: 20,
    margin: 10,
    color: "black"
  },
  phoneNumber: {
    fontSize: 14,
    marginLeft: 10
  },
  row: {
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#888888"
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  }
});
